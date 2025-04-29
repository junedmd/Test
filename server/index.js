
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app =express();
app.use(express.json());
import { PostTask,GetTask,GetTaskId } from "./controllers/task.js";

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

app.post('/tasks',PostTask);
app.get('/tasks',GetTask);
app.get('/tasks/:id',GetTaskId);

app.listen(PORT,()=>{
    console.log("listening on the port 5000")
})