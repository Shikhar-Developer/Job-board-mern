import { Router } from "express"
import { getAllJobs, createJob, findJobByID, updateJob, deleteJob } from "../controller/jobs.contoller.js"
import Authenticator from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const router = Router()
router.get("/", getAllJobs);
router.post("/", Authenticator, authorize("EMPLOYER"), createJob);
router.get("/:id", findJobByID);
router.put("/:id", Authenticator, authorize("EMPLOYER"), updateJob);
router.delete("/:id", Authenticator, authorize("EMPLOYER"), deleteJob);

export default router