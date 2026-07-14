import express from "express"

const app = express()

app.use((req, res, next) => {
    console.log(`${req.method}, ${req.url}`);
    next();
});

app.get("/", (req, res) => res.send("Server started!"))

export default app