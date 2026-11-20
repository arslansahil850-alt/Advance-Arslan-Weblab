import "dotenv/config";
import path from "node:path";
import express from "express";
import { createServer as createViteServer } from "vite";
import { loadEnvironment } from "./backend/src/config/environment.js";
import { errorHandler } from "./backend/src/middleware/error-handler.js";
import { createSecurityHeadersMiddleware } from "./backend/src/middleware/security.js";
import { createContactRouter } from "./backend/src/routes/contact.routes.js";
import { createHealthRouter } from "./backend/src/routes/health.routes.js";

async function startServer() {
  const env = loadEnvironment();
  const app = express();
  const port = Number(process.env.PORT || 3000);
  const isProd = process.env.NODE_ENV === "production";

  app.set("trust proxy", 1);
  app.disable("x-powered-by");
  app.use(createSecurityHeadersMiddleware(isProd));
  app.use(express.json({ limit: "16kb" }));

  app.use("/api", createHealthRouter(env));
  app.use("/api", createContactRouter(env));

  app.use("/api", (_req, res) => {
    res.status(404).json({
      ok: false,
      message: "Endpoint not found. Backend handles Contact inquiries only."
    });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.use(errorHandler);

  app.listen(port, "0.0.0.0", () => {
    console.info(
      JSON.stringify({
        event: "preview_server_started",
        port,
        mode: isProd ? "production" : "development"
      })
    );
  });
}

startServer();
