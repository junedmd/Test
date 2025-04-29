import { Schema,model } from "mongoose";

const taskSchema = new Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    }},{
        timestamps:true
    }
);

const Task =model("Task",taskSchema)
export default Task;