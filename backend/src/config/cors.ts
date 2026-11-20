import type { NextFunction, Request, Response } from "express";

export function createStrictCorsMiddleware(allowedOrigins: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
      res.setHeader("Access-Control-Max-Age", "600");
    } else if (origin && req.path.startsWith("/api/")) {
      res.status(403).json({
        ok: false,
        message: "Origin not permitted by CORS policy."
      });
      return;
    }

    if (req.method === "OPTIONS" && req.path.startsWith("/api/")) {
      res.status(204).end();
      return;
    }

    next();
  };
}
