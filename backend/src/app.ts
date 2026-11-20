import express from "express";
import { createStrictCorsMiddleware } from "./config/cors.js";
import { loadEnvironment, type BackendEnvironment } from "./config/environment.js";
import { errorHandler } from "./middleware/error-handler.js";
import {
  createSecurityHeadersMiddleware,
  requireHttpsInProduction
} from "./middleware/security.js";
import { createContactRouter } from "./routes/contact.routes.js";
import { createHealthRouter } from "./routes/health.routes.js";
import type { EmailTransportDeps } from "./services/email/email.service.js";

export function createContactApp(
  env: BackendEnvironment = loadEnvironment(),
  deps: EmailTransportDeps = {}
) {
  const app = express();
  const isProd = env.nodeEnv === "production";

  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(createSecurityHeadersMiddleware(isProd));
  app.use(requireHttpsInProduction(isProd));
  app.use(createStrictCorsMiddleware(env.allowedOrigins));
  app.use(express.json({ limit: "16kb" }));

  app.use("/api", createHealthRouter(env));
  app.use("/api", createContactRouter(env, deps));

  app.use((_req, res) => {
    res.status(404).json({
      ok: false,
      message: "Endpoint not found. This service handles Contact inquiries only."
    });
  });

  app.use(errorHandler);

  return app;
}
