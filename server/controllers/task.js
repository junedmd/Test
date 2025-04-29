import Task from "../module/task.js"
// Post API to create a task
const PostTask = async (req,res)=>{
    const{title,description}=req.body;
    if (!title || !description ) {
        return res.status(400).send({
          success: false,
          message: " Please fill all the details",
        });
      }
    try{
        const newTask = new Task({
            title:title,
            description:description
        });

        const savedTask = await newTask.save();
        res.status(201).send({
            success: true,
            data: savedTask,
            message: "A new Task add successfully!",
          });

    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message,
        })
    }
};

// Get API for Retrieve a list of all tasks. 
const GetTask= async(req,res)=>{

    try{
        const loadData = await Task.find();

        res.send({
            success:true,
            data:loadData,
            message:"successfully fetch all Tasks"
        })

    }catch(e){
        res.status(500).send(
            {
               success:false,
               message:e.message 
            }
        )
    }

};

 export { PostTask,GetTask} ;