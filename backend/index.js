import dotenv from "dotenv"
import connectDB from "./src/config/db.js";
import { app } from './src/app.js';

dotenv.config({
    path: './.env'
})


const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})