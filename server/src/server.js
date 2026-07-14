import express from "express"

const app = express()
const PORT = 5000
app.get("/", (req, res) => { res.send("Server Started!") })
app.listen(PORT, () => console.log(`Started Server Succesfully at http://localhost: ${PORT}`))