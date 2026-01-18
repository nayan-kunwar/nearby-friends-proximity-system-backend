import { Router } from "express";
import { getAllUser } from "./user.controller.js";

const router = Router();

router.get("/", getAllUser);

export default router;
