import {Router} from "express"
import { isAuthenticated } from "../middlewares/Auth.middleware";
import { createRepl, getAllLanguages } from "../controllers/Repls.controller";
import { isAdmin } from "../middlewares/Admin.middleware";

const router = Router();


//@ts-ignore
router.post("/create",isAuthenticated,createRepl);

// @ts-ignore
router.get("/getTemplate",getAllLanguages);


export default router;