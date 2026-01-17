import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { updateLocation, nearbyUsers } from "./location.controller.js";

const router = Router();

router.post("/update", authMiddleware, updateLocation);
router.get("/nearby", authMiddleware, nearbyUsers);

export default router;
