export interface BackendEnvironment {
  port: number;
  nodeEnv: string;
  allowedOrigins: string[];
  recipientEmail: string;
  resendApiKey: string;
  resendFromEmail: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
  smtpUser: string;
  smtpPass: string;
  smtpFromEmail: string;
  turnstileSecretKey: string;
  rateLimitWindowMs: number;
  rateLimitMax: number;
  duplicateWindowMs: number;
}

export function loadEnvironment(): BackendEnvironment {
  const rawOrigins =
    process.env.ALLOWED_ORIGINS || "http://localhost:3000,https://arslan-weblab-new.vercel.app";

  return {
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || "development",
    allowedOrigins: rawOrigins
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
    recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL || "arslansahil850@gmail.com",
    resendApiKey: process.env.RESEND_API_KEY || "",
    resendFromEmail: process.env.RESEND_FROM_EMAIL || "ARSLAN WEBLAB <onboarding@resend.dev>",
    smtpHost: process.env.SMTP_HOST || "",
    smtpPort: Number(process.env.SMTP_PORT || 587),
    smtpSecure: process.env.SMTP_SECURE === "true",
    smtpUser: process.env.SMTP_USER || "",
    smtpPass: process.env.SMTP_PASS || "",
    smtpFromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || "",
    turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "",
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX || 5),
    duplicateWindowMs: Number(process.env.DUPLICATE_WINDOW_MS || 300000)
  };
}
