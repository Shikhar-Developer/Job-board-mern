import { Router } from "express";
import Authenticator from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { getEmployeeDashboard } from "../controller/dashboard.controller.js";


const router = Router();

router.get("/employee", Authenticator, authorize("EMPLOYER"), getEmployeeDashboard);

export default router;