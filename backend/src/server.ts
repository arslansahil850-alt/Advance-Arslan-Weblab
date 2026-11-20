import "dotenv/config";
import { createContactApp } from "./app.js";
import { loadEnvironment } from "./config/environment.js";

const env = loadEnvironment();
const app = createContactApp(env);

app.listen(env.port, "0.0.0.0", () => {
  console.info(
    JSON.stringify({
      event: "contact_service_started",
      port: env.port,
      nodeEnv: env.nodeEnv
    })
  );
});
