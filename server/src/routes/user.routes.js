import { Router } from "express";
import { getProfile, updateProfile, updatePassword } from "../controller/user.controller.js";
import Authenticator from "../middleware/auth.middleware.js";

const router = Router()

router.get("/me", Authenticator, getProfile);
router.put("/me", Authenticator, updateProfile);
router.put("/change-password", Authenticator, updatePassword);

export default router;