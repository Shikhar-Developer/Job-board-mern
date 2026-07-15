import { getMyApplication, acceptApplication, rejectApplication } from "../controller/application.controller.js";
import { Router } from "express"
import Authenticator from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router();

router.get("/my", Authenticator, authorize("CANDIDATE"), getMyApplication);
router.patch("/:applicationId/accept", Authenticator, authorize("EMPLOYER"), acceptApplication);
router.patch("/:applicationId/reject", Authenticator, authorize("EMPLOYER"), rejectApplication);

export default router;