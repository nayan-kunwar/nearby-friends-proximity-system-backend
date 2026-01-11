import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  updateLocation,
  nearbyFriends
} from "./location.controller.js";

const router = Router();

router.post("/update", authMiddleware, updateLocation);
router.get("/nearby", authMiddleware, nearbyFriends);

export default router;
