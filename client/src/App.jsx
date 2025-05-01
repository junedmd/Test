import { useState } from 'react';
import axios from "axios";

import './App.css'

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(" ");

  const Submit = async()=>{
    // e.preventDefault();
    try{
      const response = await axios.post("/api/tasks",{
        title:title,
        description:description
      })
    
      setTitle(" ");
      setDescription("")
      console.log(response);

    }catch(e){
      console.log(e.error)
      alert(e.message)
    }
  }

  return (
    <>
      <div className=' bg-amber-400 max-h-full'>
        <div className='flex justify-center'>
                <h1 className='text-3xl font-bold underline'>Add Task </h1>

                 <input type='text' placeholder='Write your Title' className='inputs' 
                 value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

                <input type='text' placeholder='Write your Title' className='inputs'
                  value={description}  onChange={(e)=>{setDescription(e.target.value)}}/>
                
                      <button className='btn' type='submit' onClick={Submit}> Submit</button> 

        </div>


      </div>

    </>
  )
}

export default App
