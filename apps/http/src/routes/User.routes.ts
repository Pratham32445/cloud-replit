import { Router } from "express";
import { signUp } from "../controllers/User.controller";

const router = Router();

// @ts-ignore
router.post("/signup", signUp);

export default router;
