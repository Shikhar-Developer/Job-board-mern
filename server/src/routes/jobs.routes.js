import { Router } from "express"
import { getAllJobs, createJob } from "../controller/jobs.contoller.js"

const router = Router()
router.get("/", getAllJobs);
router.post("/", createJob);

export default router