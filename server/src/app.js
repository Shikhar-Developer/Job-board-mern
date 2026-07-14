import express from "express"

const app = express()
app.get("/", (req, res) => res.send("Server started!"))

export default app