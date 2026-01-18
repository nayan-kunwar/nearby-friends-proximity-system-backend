import { v4 as uuidv4 } from "uuid";

export const requestIdMiddleware = (req, res, next) => {
  const incomingId = req.headers["x-request-id"];

  req.id = incomingId || `req_${uuidv4()}`;
  res.setHeader("X-Request-Id", req.id);

  next();
};
