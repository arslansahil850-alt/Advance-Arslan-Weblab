import nodemailer from "nodemailer";
import type { BackendEnvironment } from "../../config/environment.js";
import type { ValidatedContactInput } from "../../validators/contact.validator.js";
import { buildInquiryHtml, type EmailSendResult } from "./api.provider.js";

export async function sendViaSmtpFallback(
  env: BackendEnvironment,
  data: ValidatedContactInput
): Promise<EmailSendResult> {
  if (!env.smtpHost || !env.smtpUser || !env.smtpPass) {
    throw new Error("SMTP fallback credentials are not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass
    }
  });

  const info = await transporter.sendMail({
    from: env.smtpFromEmail || env.smtpUser,
    to: env.recipientEmail,
    replyTo: data.email,
    subject: `New Project Inquiry (${data.projectType}) — ${data.name}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.projectType}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\n${data.message}`,
    html: buildInquiryHtml(data)
  });

  return {
    provider: "smtp",
    id: info.messageId || "sent"
  };
}
