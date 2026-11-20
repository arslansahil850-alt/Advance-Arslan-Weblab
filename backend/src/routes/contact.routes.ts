import { Router } from "express";
import type { BackendEnvironment } from "../config/environment.js";
import { createContactController } from "../controllers/contact.controller.js";
import { createContactRateLimiter } from "../middleware/rate-limit.js";
import type { EmailTransportDeps } from "../services/email/email.service.js";

export function createContactRouter(
  env: BackendEnvironment,
  deps: EmailTransportDeps = {}
): Router {
  const router = Router();
  const limiter = createContactRateLimiter(env.rateLimitWindowMs, env.rateLimitMax);
  const controller = createContactController(env, deps);

  router.post("/contact", limiter, controller);

  return router;
}
