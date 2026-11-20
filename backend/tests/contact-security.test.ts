import assert from "node:assert/strict";
import http from "node:http";
import test from "node:test";
import { createContactApp } from "../src/app.js";
import type { BackendEnvironment } from "../src/config/environment.js";
import { buildInquiryHtml } from "../src/services/email/api.provider.js";
import { deliverContactEmail } from "../src/services/email/email.service.js";
import {
  contactPayloadSchema,
  escapeHtml
} from "../src/validators/contact.validator.js";

function makeTestEnv(overrides: Partial<BackendEnvironment> = {}): BackendEnvironment {
  return {
    port: 0,
    nodeEnv: "test",
    allowedOrigins: ["https://arslan-weblab-new.vercel.app"],
    recipientEmail: "arslansahil850@gmail.com",
    resendApiKey: "re_test_key",
    resendFromEmail: "ARSLAN WEBLAB <onboarding@resend.dev>",
    smtpHost: "",
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: "",
    smtpPass: "",
    smtpFromEmail: "",
    turnstileSecretKey: "",
    rateLimitWindowMs: 60000,
    rateLimitMax: 20,
    duplicateWindowMs: 300000,
    ...overrides
  };
}

function requestJson(
  server: http.Server,
  method: string,
  path: string,
  body?: unknown,
  headers: Record<string, string> = {}
): Promise<{ status: number; json: Record<string, unknown> }> {
  return new Promise((resolve, reject) => {
    const addr = server.address();
    if (!addr || typeof addr === "string") {
      reject(new Error("Invalid server address"));
      return;
    }
    const payload = body !== undefined ? JSON.stringify(body) : undefined;
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: addr.port,
        path,
        method,
        headers: {
          ...(payload ? { "Content-Type": "application/json" } : {}),
          ...headers
        }
      },
      (res) => {
        let raw = "";
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          resolve({
            status: res.statusCode || 500,
            json: raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
          });
        });
      }
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

test("validator rejects email header injection and escapes XSS HTML", () => {
  const injected = contactPayloadSchema.safeParse({
    name: "Attacker\r\nBcc: evil@example.com",
    email: "user@example.com",
    projectType: "customWebsite",
    budget: "250to500",
    timeline: "standard",
    message: "Valid message body that is long enough."
  });
  assert.equal(injected.success, false);

  const escaped = escapeHtml('<script>alert("xss")</script>');
  assert.equal(escaped, "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;");

  const html = buildInquiryHtml({
    name: "<b>Test</b>",
    email: "test@example.com",
    projectType: "landingPage",
    budget: "under250",
    timeline: "urgent",
    message: "<img src=x onerror=alert(1)>",
    website: ""
  });
  assert.equal(html.includes("<script>"), false);
  assert.equal(html.includes("&lt;img"), true);
});

test("dual email delivery falls back to SMTP when primary API fails", async () => {
  const env = makeTestEnv({
    resendApiKey: "re_test",
    smtpHost: "smtp.example.com",
    smtpUser: "user",
    smtpPass: "pass"
  });
  let smtpCalled = false;

  const result = await deliverContactEmail(
    env,
    {
      name: "Ali",
      email: "ali@example.com",
      projectType: "customWebsite",
      budget: "500to1000",
      timeline: "standard",
      message: "Need a clean custom business website.",
      website: ""
    },
    {
      sendApi: async () => {
        throw new Error("Primary API down");
      },
      sendSmtp: async () => {
        smtpCalled = true;
        return { provider: "smtp", id: "smtp-msg-1" };
      }
    }
  );

  assert.equal(smtpCalled, true);
  assert.equal(result.provider, "smtp");
});

test("contact endpoint validates, blocks honeypot, blocks disallowed CORS, and blocks duplicates", async () => {
  const app = createContactApp(makeTestEnv(), {
    sendApi: async () => ({ provider: "resend", id: "mock-id-1" })
  });
  const server = app.listen(0);

  try {
    const health = await requestJson(server, "GET", "/api/health");
    assert.equal(health.status, 200);
    assert.equal(health.json.ok, true);

    const badCors = await requestJson(
      server,
      "POST",
      "/api/contact",
      {},
      { Origin: "https://unauthorized-site.example" }
    );
    assert.equal(badCors.status, 403);

    const honeypot = await requestJson(server, "POST", "/api/contact", {
      name: "Bot",
      email: "bot@example.com",
      projectType: "other",
      budget: "flexible",
      timeline: "flexible",
      message: "Automated spam payload exceeding minimum length.",
      website: "https://spam.example"
    });
    assert.equal(honeypot.status, 400);

    const validBody = {
      name: "Sara Khan",
      email: "sara@example.com",
      projectType: "customWebsite",
      budget: "500to1000",
      timeline: "standard",
      message: "Looking to build a responsive portfolio website with bilingual support."
    };

    const first = await requestJson(
      server,
      "POST",
      "/api/contact",
      validBody,
      { Origin: "https://arslan-weblab-new.vercel.app" }
    );
    assert.equal(first.status, 200);
    assert.equal(first.json.ok, true);

    const duplicate = await requestJson(server, "POST", "/api/contact", validBody);
    assert.equal(duplicate.status, 429);

    const unknownApi = await requestJson(server, "GET", "/api/projects");
    assert.equal(unknownApi.status, 404);
  } finally {
    server.close();
  }
});
