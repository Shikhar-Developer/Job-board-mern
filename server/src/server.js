import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js"; // ./ -> current Directory / ../ -> Parent Directory 



const PORT = process.env.PORT || 5000;

connectDB();

// app.listen(PORT, () => console.log(`Started Server Succesfully at http://localhost:${PORT}`));
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Started Server Successfully on port ${PORT}`);
});