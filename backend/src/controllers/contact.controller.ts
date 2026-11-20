import type { Request, Response } from "express";
import type { BackendEnvironment } from "../config/environment.js";
import {
  deliverContactEmail,
  type EmailTransportDeps
} from "../services/email/email.service.js";
import {
  computeSubmissionDigest,
  contactPayloadSchema,
  normalizeContactInput
} from "../validators/contact.validator.js";

async function verifyTurnstile(secret: string, token: string | undefined, remoteIp?: string): Promise<boolean> {
  if (!secret) return true;
  if (!token) return false;

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return Boolean(result.success);
}

export function createContactController(
  env: BackendEnvironment,
  deps: EmailTransportDeps = {}
) {
  const recentDigests = new Map<string, number>();

  const pruneDigests = (now: number) => {
    for (const [key, expiresAt] of recentDigests.entries()) {
      if (expiresAt <= now) {
        recentDigests.delete(key);
      }
    }
  };

  return async (req: Request, res: Response): Promise<void> => {
    const parsed = contactPayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        ok: false,
        message: "Please complete all required contact fields with valid values."
      });
      return;
    }

    if (parsed.data.website && parsed.data.website.trim().length > 0) {
      res.status(400).json({
        ok: false,
        message: "Submission rejected."
      });
      return;
    }

    const turnstileOk = await verifyTurnstile(
      env.turnstileSecretKey,
      parsed.data.turnstileToken,
      req.ip
    ).catch(() => false);

    if (!turnstileOk) {
      res.status(403).json({
        ok: false,
        message: "Bot verification failed. Please retry."
      });
      return;
    }

    const normalized = normalizeContactInput(parsed.data);
    const digest = computeSubmissionDigest(normalized);
    const now = Date.now();
    pruneDigests(now);

    const existingExpiry = recentDigests.get(digest);
    if (existingExpiry && existingExpiry > now) {
      res.status(429).json({
        ok: false,
        message: "This inquiry was already received recently. Please wait before resending."
      });
      return;
    }

    try {
      const result = await deliverContactEmail(env, normalized, deps);
      recentDigests.set(digest, now + env.duplicateWindowMs);

      console.info(
        JSON.stringify({
          event: "contact_delivered",
          provider: result.provider,
          digestPrefix: digest.slice(0, 8),
          timestamp: new Date().toISOString()
        })
      );

      res.status(200).json({
        ok: true,
        message: "Your inquiry has been delivered successfully.",
        deliveryMode: result.provider
      });
    } catch (error) {
      const isUnconfigured =
        error instanceof Error && error.message === "UNCONFIGURED_EMAIL_PROVIDER";

      console.warn(
        JSON.stringify({
          event: isUnconfigured ? "contact_provider_unconfigured" : "contact_delivery_failed",
          digestPrefix: digest.slice(0, 8),
          timestamp: new Date().toISOString()
        })
      );

      res.status(isUnconfigured ? 503 : 502).json({
        ok: false,
        message: isUnconfigured
          ? "Email delivery is not configured yet on the contact server. Please reach out directly via arslansahil850@gmail.com or WhatsApp."
          : "Unable to deliver inquiry right now. Please contact arslansahil850@gmail.com directly."
      });
    }
  };
}
