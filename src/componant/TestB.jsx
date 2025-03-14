import React from 'react'
import { db } from "../firebase";
import { useState, useEffect } from "react";
import { collection, addDoc,doc,deleteDoc,onSnapshot,updateDoc } from "firebase/firestore";

const TestB = () => {
// เก็บของมูลไว้ใน state
const [form,setForm]= useState({});
const [data,setData]= useState([]);
const [editId,setEditId]= useState(null);

const testBB = collection(db,'testBack');
    useEffect(()=>{

        const unsub = loadRealtime()
        return ()=>{
            unsub
        }
    },[])

const loadRealtime = () => {
    const unsub = onSnapshot(testBB,(snapshot)=> {
        const newData = snapshot.docs.map((doc)=>({
            id:doc.id,
            ...doc.data()
        }))
        setData(newData)
    })
    return ()=>{
        unsub
    };
}


    
const handleChange = (e)=> {
    console.log(e.target.name, e.target.value)
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
    };
    
const handleAddData = async() => {
    await addDoc(testBB,form)
    .then((res)=> {
      
      
    }) .catch((err)=> {
      console.log(err)
    })
    };

const handleDelete = async(id) =>{
    try{
    await deleteDoc(doc(testBB,id))
        
    }
    catch(err){
        console.log(err)
    }
}

const handleSave = async(id) =>{
    try{
        await updateDoc(doc(testBB,id),form);
        setEditId(null)
        setForm({})
            
        }
        catch(err){
            console.log(err)
        }
}
const setCancel = () =>{
    setEditId(null)
    setForm({})
}


  
console.log(editId)

  return (

    <div>
        
        <h1>Test BAcken</h1>

        <input onChange = {(e)=>handleChange(e)}
         type="text" name="name" placeholder="name" />
        <input onChange = {(e)=>handleChange(e)} 
         type="text" name="detail" placeholder="detail" />
        <input onChange = {(e)=>handleChange(e)}
         type="text" name="price" placeholder="price" />
       <button onClick={handleAddData}>Add data for TesT</button>
       <hr></hr>



       <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Detail</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>

    {data.map((item,index)=>
    <tr key={index}>
      <th scope="row">{index+1}</th>



      <td>
        {editId === item.id
        ?(<> 
        <input onChange = {(e)=>handleChange(e)}
         type="text" name="name"
         value={form.name !== undefined ? form.name : item.name} 
         placeholder="name" />
        </>)
        :(item.name)
        }      
      </td>

      <td>
        {editId === item.id
        ?(<> 
        <input onChange = {(e)=>handleChange(e)}
         type="text" name="detail"
         value={form.name !== undefined ? form.detail : item.detail} 
         placeholder="detail" />
        </>)
        :(item.detail)
        }
      </td>

      <td>
        {editId === item.id
        ?(<> 
        <input onChange = {(e)=>handleChange(e)}
         type="number" name="price"
         value={form.name !== undefined ? form.price : item.price} 
         placeholder="price" />
        </>)
        :(item.price)
        }
      </td>

       <td>
        { editId === item.id
        ?(<>
        <button onClick={()=>handleSave(item.id)}>Save</button>
        <button onClick={()=>setCancel()}>Cancel</button>
        </>)

        :(<>
        <button onClick={()=>handleDelete(item.id)}>Delete</button>
        <button onClick={()=>setEditId(item.id)}>Edit</button>
        </>)
        }
    </td>
    </tr>
    )}
    
  </tbody>
</table>



















       <br />
       <br />
       <br />
       <br />
       <br />
    </div>
  )
}

export default TestB
