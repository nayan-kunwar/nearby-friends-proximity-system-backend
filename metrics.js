import client from "prom-client";

// Enable default metrics (CPU, memory, event loop, GC, etc.)
client.collectDefaultMetrics({
  prefix: "node_app_",
  gcDurationBuckets: [0.1, 0.5, 1, 2],
});

// Registry export
export const register = client.register;
