import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import{toast, ToastContainer} from "react-toastify"
import api from '../axios/axios'

const Detailtask = () => {
    const {id} = useParams();
    const [data, setData] = useState({})
    const navigate = useNavigate();
    
    useEffect(()=>{
        const fetchapi = async()=>{
            try{
                const res = await api.get(`/tasks/${id}`)
                console.log(res)
                setData(res.data.data)
                toast.success("The task loaded successfully")
            }
            catch(err){
                toast.error("The task cannot be viewed in detail")
            }
        }
        fetchapi();
    },[])

    const deletetask = async()=>{
        try{
            await api.delete(`/tasks/${id}`)
            toast.success("Deleted successfully")
            navigate('/tasks')
        }
        catch(err){
            toast.error(err);
        }
    }

    return (
        <div className="detail-task-container">
            <ToastContainer />
            <h3>Task Description:</h3>
            <p className="task-text">{data.taskdescription}</p>

            {data.image && <img src={data.image} alt="task" className="task-image" />}

            <h3>Assigned to:</h3>
            <p className="assigned-to">{data.assignedto ? data.assignedto.name : "None"}</p>

            <div className="button-group">
                <Link to={`/updatetaskfinal/${id}`}>
                    <button className="update-btn">Update Task</button>
                </Link>
                <button onClick={deletetask} className="delete-btn">Delete</button>
            </div>

            <style>
                {`
                .detail-task-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background: #f9f9f9;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 400px;
                    margin: 20px auto;
                }

                h3 {
                    color: #333;
                    margin-bottom: 5px;
                }

                .task-text, .assigned-to {
                    font-size: 16px;
                    color: #555;
                    text-align: center;
                    margin-bottom: 15px;
                }

                .task-image {
                    width: 100%;
                    max-width: 300px;
                    border-radius: 8px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    margin-bottom: 15px;
                }

                .button-group {
                    display: flex;
                    gap: 10px;
                    margin-top: 10px;
                }

                .update-btn, .delete-btn {
                    padding: 10px 15px;
                    border: none;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    transition: 0.3s;
                }

                .update-btn {
                    background-color: #007bff;
                    color: white;
                }

                .update-btn:hover {
                    background-color: #0056b3;
                }

                .delete-btn {
                    background-color: #dc3545;
                    color: white;
                }

                .delete-btn:hover {
                    background-color: #a71d2a;
                }
                `}
            </style>
        </div>
    )
}

export default Detailtask;
