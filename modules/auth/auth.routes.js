import { Router } from "express";
import { login, register } from "./auth.controller.js";

const router = Router();

router.post("/register", register);
router.get("/login", login);

export default router;
