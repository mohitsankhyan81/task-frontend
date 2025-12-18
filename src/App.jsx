import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [data,setdata]=useState([]);
  const [todo,settodo]=useState('');
  const [editindex,seteditindex]=useState(null);

  useEffect(()=>{
    axios.get("http://localhost:3545/todos")
    .then(res=>setdata(res.data));
  },[])
  const HandleSubmit=(e)=>{
    e.preventDefault();
    if(todo.trim()==='');
    if(editindex){
      axios.put(`http://localhost:3545/todos/${editindex}`,{text:todo})
      .then(res=>{
        setdata(data.map(d=>d._id===editindex?res.data:d));
        settodo('');
        seteditindex(null);
      })
    }
    else{
    axios.post("http://localhost:3545/todos",{text:todo})
    .then(res=>setdata([...data,res.data]));
    settodo('');
    }

  }

  const TaskEdit=(e)=>{
    settodo(e.text);
    seteditindex(e._id);
  }

  const TaskDelete=(id)=>{
    axios.delete(`http://localhost:3545/todos/${id}`)
    .then(()=>setdata(data.filter(e=>e._id!==id)));
  }
  return (
    <div>
      <h1>Make you task list in second</h1>
      <form onSubmit={HandleSubmit}>
        <input type="text" placeholder='Enter your task' value={todo} onChange={(e)=>settodo(e.target.value)}/>
        <button>Submit</button>
      </form>

      <ul>
        {data.map((e)=>(
          <li key={e._id}>
            {e.text}
            <button onClick={()=>TaskEdit(e)}>Edit</button>
            <button onClick={()=>TaskDelete(e._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App