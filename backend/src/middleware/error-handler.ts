import type { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isSyntaxOrLimit =
    err instanceof Error &&
    (err.message.includes("entity.too.large") ||
      err.name === "PayloadTooLargeError" ||
      err.name === "SyntaxError");

  if (isSyntaxOrLimit) {
    res.status(400).json({
      ok: false,
      message: "Invalid or oversized contact payload."
    });
    return;
  }

  console.error(
    JSON.stringify({
      event: "contact_unhandled_error",
      timestamp: new Date().toISOString()
    })
  );

  res.status(500).json({
    ok: false,
    message: "Unable to process request right now. Please try again later."
  });
}
