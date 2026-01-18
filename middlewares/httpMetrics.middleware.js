import {
  httpRequestCounter,
  httpRequestDuration,
} from "../metrics/httpMetrics.js";

export const httpMetricsMiddleware = (req, res, next) => {
  if (req.path === "/metrics") return next();
  const start = process.hrtime();

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = seconds + nanoseconds / 1e9;

    const route = req.route?.path || req.path;

    httpRequestCounter.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
        status_code: res.statusCode,
      },
      duration,
    );
  });

  next();
};
