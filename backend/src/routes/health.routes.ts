import { Router } from "express";
import type { BackendEnvironment } from "../config/environment.js";
import { createHealthController } from "../controllers/health.controller.js";

export function createHealthRouter(env: BackendEnvironment): Router {
  const router = Router();
  router.get("/health", createHealthController(env));
  return router;
}
