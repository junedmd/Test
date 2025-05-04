
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app =express();
app.use(express.json());
import { postTask,getTask,getTaskId, deleteById, putById } from "./controllers/task.js";
const cors = require("cors");
app.use(cors({ origin: "https://reliable-lokum-cb2cf9.netlify.app" }));
app.use(cors());

const PORT = process.env.PORT || 5000;

const connectMongoDB = async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URI)
        if(conn){
            console.log(" DataBase connected succsessfully")
        }

    }catch(e){
        console.log(e.error)
        
    }
}

connectMongoDB();

// Apis for Task

app.post('https://your-backend-name.onrender.com/api/tasks',postTask);
app.get('https://your-backend-name.onrender.com/api/tasks',getTask);
app.get('https://your-backend-name.onrender.com/api/tasks/:id',getTaskId);
app.delete('https://your-backend-name.onrender.com/api/tasks/:id',deleteById);
app.put('https://your-backend-name.onrender.com/api/tasks/:id',putById)

app.listen(PORT,()=>{
    console.log("listening on the port 5000")
})