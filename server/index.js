
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app =express();
app.use(express.json());
import { postTask,getTask,getTaskId, deleteById, putById } from "./controllers/task.js";

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

app.post('/tasks',postTask);
app.get('/tasks',getTask);
app.get('/tasks/:id',getTaskId);
app.delete('/tasks/:id',deleteById);
app.put('/tasks/:id',putById)

app.listen(PORT,()=>{
    console.log("listening on the port 5000")
})