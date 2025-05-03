import { use, useEffect, useState } from 'react';
import axios from "axios";

import './App.css'

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[serach,setSearch]= useState("");
  const[data,setData]= useState([]);

        const Submit = async()=>{
          // e.preventDefault();
          try{
            const response = await axios.post("/api/tasks",{
              title:title,
              description:description
            })
          
            setTitle("");
            setDescription("")
            console.log(response);

          }catch(e){
            console.log(e.error)
            alert(e.message)
          }
        }

        const response = async()=>{
            try{
               const result= await axios.get("/api/tasks");
               setData(result?.data.data);
               console.log(result?.data.data);
               console.log(data);

            }catch(e){
              console.log(e.message)
            }


        }
        useEffect(()=>{
          response()
        },[] )
 
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-start p-6 gap-6">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h1 className='text-3xl font-bold underline mb-4 text-center'>Add Task </h1>

                 <input type='text' placeholder='Write your Title' className='w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                 value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

                <input type='text' placeholder='Write your Description' className='w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
                  value={description}  onChange={(e)=>{setDescription(e.target.value)}}/>
                
                      <button className='w-full bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600 transition cursor-pointer' type='submit' onClick={Submit}> Submit</button> 

        </div>

        <div className='w-full mx-10 my-5 pr-2 '>
           <input type="text" className='bg-white w-full mb-3 px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'  placeholder='Serach Your Task'  value={serach} onChange={(e)=>{setSearch(e.target.value)}}/>
       

          {
            data.length>0? ( data.filter((item) =>
              item.title.toLowerCase().includes(serach.toLowerCase())
            ).map((item,index)=>{
            return(
              <>
               <div
                key={index}
                className="bg-white p-4 mb-4 rounded shadow-sm border border-gray-200">
              
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-700">{item.description}</p>
              </div>
              </>
            )})):(
              <p className="text-gray-600">No tasks found.</p>
            )
          }
         </div>
      </div>

    </>
  )
}

export default App
