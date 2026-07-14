import express from "express"
import router from "./routes/jobs.routes.js"
import errorHandler from "../middleware/error.middleware.js"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
});

app.use("/api/jobs", router);
app.use(errorHandler);

export default app