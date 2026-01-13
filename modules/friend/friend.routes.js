import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import {
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
} from "./friend.controller.js";

const router = Router();

router.post("/request/:friendId", authMiddleware, sendFriendRequest);
router.post("/accept/:friendId", authMiddleware, acceptFriendRequest);
router.get("/", authMiddleware, getFriends);

export default router;
