import express from "express"
import router from "./routes/jobs.routes.js"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
});

app.use("/api/jobs", router);

export default app