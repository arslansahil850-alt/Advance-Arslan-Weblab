import type { BackendEnvironment } from "../../config/environment.js";
import { escapeHtml, type ValidatedContactInput } from "../../validators/contact.validator.js";

export interface EmailSendResult {
  provider: "resend" | "smtp";
  id: string;
}

export function buildInquiryHtml(data: ValidatedContactInput): string {
  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h2 style="margin-bottom: 12px;">New Inquiry — ARSLAN WEBLAB</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 6px 0; font-weight: bold;">Name:</td><td>${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td>${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Project Type:</td><td>${escapeHtml(data.projectType)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Budget:</td><td>${escapeHtml(data.budget)}</td></tr>
        <tr><td style="padding: 6px 0; font-weight: bold;">Timeline:</td><td>${escapeHtml(data.timeline)}</td></tr>
      </table>
      <h3 style="margin-top: 18px;">Requirements</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
    </div>
  `.trim();
}

export async function sendViaResendApi(
  env: BackendEnvironment,
  data: ValidatedContactInput
): Promise<EmailSendResult> {
  if (!env.resendApiKey) {
    throw new Error("Resend API key is not configured.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: env.resendFromEmail,
      to: [env.recipientEmail],
      reply_to: data.email,
      subject: `New Project Inquiry (${data.projectType}) — ${data.name}`,
      html: buildInquiryHtml(data)
    })
  });

  if (!response.ok) {
    throw new Error(`Resend API rejected request with status ${response.status}`);
  }

  const json = (await response.json()) as { id?: string };
  return {
    provider: "resend",
    id: json.id || "sent"
  };
}
