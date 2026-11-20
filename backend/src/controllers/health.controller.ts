import type { Request, Response } from "express";
import type { BackendEnvironment } from "../config/environment.js";

export function createHealthController(env: BackendEnvironment) {
  return (_req: Request, res: Response): void => {
    res.status(200).json({
      ok: true,
      service: "arslan-weblab-contact-only",
      uptimeSeconds: Math.floor(process.uptime()),
      providersConfigured: {
        resend: Boolean(env.resendApiKey),
        smtpFallback: Boolean(env.smtpHost && env.smtpUser && env.smtpPass),
        turnstile: Boolean(env.turnstileSecretKey)
      },
      timestamp: new Date().toISOString()
    });
  };
}
