import { Router } from "express"
import { getAllJobs, createJob, findJobByID, updateJob } from "../controller/jobs.contoller.js"

const router = Router()
router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:id", findJobByID);
router.post("/:id", updateJob);

export default router