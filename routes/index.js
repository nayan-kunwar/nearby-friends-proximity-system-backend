import { Router } from "express";
import locationRoutes from "../modules/location/location.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import friendRoutes from "../modules/friend/friend.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/location", locationRoutes);
router.use("/friends", friendRoutes);
router.use("/users", userRoutes);

export default router;
