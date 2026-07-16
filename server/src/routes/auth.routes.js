import { Router } from "express"
import { register, login, updatePassword } from "../controller/auth.controller.js";
import Authenticator from "../middleware/auth.middleware.js";

const authRouter = Router();
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/change-password", Authenticator, updatePassword);


export default authRouter;