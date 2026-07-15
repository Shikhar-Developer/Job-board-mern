import { Router } from "express"
import { getAllJobs, createJob, findJobByID, updateJob, deleteJob, getMyJobs } from "../controller/jobs.contoller.js"
import { applyForJob, getAllJobApplicants } from "../controller/application.controller.js"
import Authenticator from "../middleware/auth.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
import authRouter from "./auth.routes.js";

const router = Router()


router.post("/", Authenticator, authorize("EMPLOYER"), createJob);
router.put("/:id", Authenticator, authorize("EMPLOYER"), updateJob);
router.delete("/:id", Authenticator, authorize("EMPLOYER"), deleteJob);
router.post("/:jobId/apply", Authenticator, authorize("CANDIDATE"), applyForJob);


router.get("/my", Authenticator, authorize("EMPLOYER"), getMyJobs);
router.get("/", getAllJobs);
router.get("/:id", findJobByID);
router.get("/:jobId/applications", Authenticator, authorize("EMPLOYER"), getAllJobApplicants);

export default router