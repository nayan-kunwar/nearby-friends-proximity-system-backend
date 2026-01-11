import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL, {
  tls: {},
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on("ready", () => {
  console.log("✅ Redis ready");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redis.on("reconnecting", () => {
  console.warn("🔄 Redis reconnecting...");
});

(async () => {
  try {
    const pong = await redis.ping();
    console.log("🟢 Redis ping:", pong);
  } catch (err) {
    console.error("🔴 Redis ping failed", err);
  }
})();
