import rateLimit from "express-rate-limit";

export function createContactRateLimiter(windowMs: number, max: number) {
  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      ok: false,
      message: "Too many contact requests. Please wait a few minutes before trying again."
    }
  });
}
