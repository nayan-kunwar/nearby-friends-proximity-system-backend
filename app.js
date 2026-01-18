import express from "express";
import "dotenv/config";
import "./config/redis.js";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.js";
import { requestIdMiddleware } from "./middlewares/requestId.middleware.js";
import { requestLogger } from "./middlewares/requestLogger.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { register } from "./metrics.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nearby-friends-client.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(requestIdMiddleware);
app.use(requestLogger);
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ message: "Server is up and running." }));
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
app.use("/api", routes);

app.use(errorHandler);

export default app;
