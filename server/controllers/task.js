import Task from "../module/task.js"
import useparams from 'express';
// Post API to create a task
const postTask = async (req,res)=>{
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
const getTask= async(req,res)=>{

    try{
        const loadData = await Task.find();

        res.status(200).send({
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


// Get api for  Retrieve a specific task by ID. 

const getTaskId=async(req,res)=>{
    try{

        const {id}=req.params;
        const findTask = await Task.findOne({_id : id});
            if(!findTask){
                return res.status(404).send({
                    success:false,
                    message:`task is not available for this ${id}`
                })
            }
            res.status(200).send({
                success:true,
                data:findTask,
                message:`task is Available for this task id  ${id}`
            })
        
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
};

// Delete a task by ID. 

const deleteById = async(req,res)=>{
    try{
        const {id}= req.params;
        const deletId= await Task.deleteOne({_id:id});
        if (deletId.deletedCount === 0) {
            return res.status(404).send({
              success: false,
              message: `task is not available for this id ${id} `,
            });
          }
       
        res.status(200).send({
            success:true,
            message:` Task is deleted for this id ${id} `
        })
    }catch(e){
        res.status(500).send({
            success:false,
            message:e.message
        })
    }
};

// Put api for updating task

const putById = async (req, res) => {
    const { id } = req.params;
  
    const { title,description } = req.body;
    if (!title || !description) {
        return res.status(400).send({ message: 'Title and Description are missing' });
      }
     const answer= await Task.updateOne({ _id: id }, {
      $set: {
       title:title,
       description:description
      }
    })

    if (answer.matchedCount === 0) {
        return res.status(404).send({
          success: false,
          message: `No task found with this id ${id}`,
        });
      }

    try {
      const updateTask = await Task.findOne({ _id: id });

      
      res.status(200).send({
        success: true,
        data: updateTask,
        message: 'Update Successfully'
      })
    }
    catch (err) {
      res.status(500).send({
        success: false,
        err: err.message
      })
    }
  
  }
 export { postTask,getTask ,getTaskId,deleteById,putById} ;