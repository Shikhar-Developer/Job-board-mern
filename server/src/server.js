import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./config/db.js"; // ./ -> current Directory / ../ -> Parent Directory 


dotenv.config()


const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => console.log(`Started Server Succesfully at http://localhost:${PORT}`));