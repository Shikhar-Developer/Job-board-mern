import { Router } from "express";
import Authenticator from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { getEmployerProfile, updateEmployerProfile } from "../controller/employer.controller.js";

const router = Router();

router.get("/me", Authenticator, authorize("EMPLOYER"), getEmployerProfile);
router.put("/me", Authenticator, authorize("EMPLOYER"), updateEmployerProfile);

export default router;