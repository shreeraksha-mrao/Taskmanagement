import React, { useEffect, useState } from 'react'
import api from '../axios/axios';
import { Link } from 'react-router-dom';
import{toast, ToastContainer} from "react-toastify"
import './tasks.css';


const Tasks = () => {
  const [task, setTask] = useState([]);
  useEffect(() => {
    const fetchapi = async () => {
      try {
        console.log("aayo")
        const res = await api.get('/tasks/')
        console.log(res);
        setTask(res.data.data)
        toast.success("The tasks loaded successfully")
      }
      catch (err) {
        console.log(err)
        toast.error("Failed to retrieve all the tasks")
      }

    }
    fetchapi()
  }, [])

  return (
    <>
      <ToastContainer />
      <div className="tasks-container">
        <h1>Tasks</h1>
        <ol className="tasks-list">
          {task.map((e) => (
            <Link to={`/tasks/${e._id}`} key={e._id}>
              <li>{e._id}</li>
            </Link>
          ))}
        </ol>
        <br /><br />
        <Link to={'/addTask'}>
          <button className="add-task-btn">Add Task</button>
        </Link>
      </div>
    </>
  );
  
}

export default Tasks