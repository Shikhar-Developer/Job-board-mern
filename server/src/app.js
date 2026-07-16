import express from "express"
import jobRouter from "./routes/jobs.routes.js"
import authRouter from "./routes/auth.routes.js"
import errorHandler from "./middleware/error.middleware.js"
import applicationRouter from "./routes/application.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import candidateRouter from "./routes/candidate.routes.js"
import employerRouter from "./routes/employer.routes.js"
import path from "path"
import { fileURLToPath } from "url"



const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
});

app.use("/api/jobs", jobRouter);
app.use("/api/auth", authRouter);
app.use("/api/application", applicationRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/candidate", candidateRouter);
app.use("/api/employer", employerRouter);
app.use(errorHandler);

export default app;