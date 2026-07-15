import { Router } from "express"
import { getAllJobs, createJob, findJobByID, updateJob, deleteJob } from "../controller/jobs.contoller.js"

const router = Router()
router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:id", findJobByID);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router