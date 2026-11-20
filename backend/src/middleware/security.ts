import helmet from "helmet";
import type { NextFunction, Request, Response } from "express";

export function createSecurityHeadersMiddleware(isProduction: boolean) {
  return helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    hsts: isProduction ? { maxAge: 31536000, includeSubDomains: true } : false
  });
}

export function requireHttpsInProduction(isProduction: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!isProduction) {
      next();
      return;
    }
    const proto = req.headers["x-forwarded-proto"];
    if (proto && proto !== "https") {
      res.status(403).json({
        ok: false,
        message: "HTTPS is required for contact submissions."
      });
      return;
    }
    next();
  };
}
