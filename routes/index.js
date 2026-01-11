import { Router } from "express";
import locationRoutes from "../modules/location/location.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/location", locationRoutes);

export default router;
