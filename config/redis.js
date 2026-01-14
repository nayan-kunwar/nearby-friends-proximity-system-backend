import Redis from "ioredis";
const isProd = process.env.NODE_ENV === "production";

export const redis = new Redis(process.env.REDIS_URL, {
  ...(isProd && {
    tls: {}, // ONLY for Upstash / prod
  }),
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on("connect", () => {
  console.log("🔌 Redis connecting...");
});

redis.on("ready", () => {
  console.log("✅ Redis ready");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});

redis.on("reconnecting", () => {
  console.warn("🔄 Redis reconnecting...");
});

(async () => {
  try {
    const pong = await redis.ping(); // avoid in production  Cold-start delay
    console.log("🟢 Redis ping:", pong);
  } catch (err) {
    console.error("🔴 Redis ping failed", err);
  }
})();
