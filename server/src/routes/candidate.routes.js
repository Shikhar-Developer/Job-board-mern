import { Router } from "express";
import Authenticator from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import { getCandidateProfile, updateCandidateProfile } from "../controller/candidate.controller.js";


const router = Router();

router.get("/me", Authenticator, authorize("CANDIDATE"), getCandidateProfile);
router.put("/me", Authenticator, authorize("CANDIDATE"), updateCandidateProfile);

export default router;