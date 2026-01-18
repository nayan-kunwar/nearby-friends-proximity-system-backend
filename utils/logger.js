import winston from "winston";

const { combine, timestamp, printf, errors, json } = winston.format;

const logFormat = printf(({ level, message, timestamp, requestId, stack }) => {
  return `${timestamp} [${level.toUpperCase()}] [${requestId || "no-req-id"}] ${stack || message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), errors({ stack: true }), logFormat),
  transports: [new winston.transports.Console()],
});
