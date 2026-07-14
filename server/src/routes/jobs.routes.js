import { Router } from "express"
import { getAllJobs } from "../controller/jobs.contoller.js"

const router = Router()
router.get("/", getAllJobs);

export default router