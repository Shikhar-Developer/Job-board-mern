import express from "express"
import jobRouter from "./routes/jobs.routes.js"
import authRouter from "./routes/auth.routes.js"
import errorHandler from "./middleware/error.middleware.js"

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
});

app.use("/api/jobs", jobRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

export default app