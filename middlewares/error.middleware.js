import { logger } from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, {
    requestId: req.id,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errorCode: err.errorCode || "INTERNAL_ERROR",
    requestId: req.id,
  });
};
