import React, { useEffect, useRef, useState } from 'react'
import api from '../axios/axios'
import { useNavigate, useParams } from 'react-router-dom'
import{toast, ToastContainer} from 'react-toastify'
const Updatetask = () => {
     const ref = useRef(null)
      const selectref = useRef()
      const [Form, SetForm] = useState({taskdescription:'', assignedto:"", image:null})
      const [users, setUsers] = useState([]);
      const {id} = useParams();
      const navigate = useNavigate();

      useEffect(()=>{
        const getallusers = async()=>{
          const res = await api.get('/editors/')
          setUsers(res.data.data);
        }
        getallusers();
      },[])

      useEffect(()=>{
        const fetchdata = async()=>{
            try{
               const res =  await api.get(`/tasks/${id}`)
               SetForm(res.data.data);
               console.log(Form)
               
            }
            catch(err){
                console.log(err)
            }
        }
        fetchdata();
      },[])

      const handleChange = (e)=>{
        SetForm({...Form,[e.target.name]:e.target.value})
      }
    
      const handleImage = (e)=>{
        SetForm({...Form,image:e.target.files[0]})
      }
    
      const handleSubmit = (e)=>{
        const loadertoast = toast.loading("Updating task...")
        e.preventDefault();
        const postTask = async()=>{
          try{
            const formdata = new FormData();
            formdata.append('taskdescription',Form.taskdescription)
            if(Form.assignedto != null) formdata.append('assignedto', Form.assignedto)
            formdata.append('image', Form.image)
    
            await api.patch(`/tasks/${id}`,formdata, {
              headers: {
                "Content-Type": 'multipart/form-data'
              }
            })
            toast.update(loadertoast, {render:"Updated successfully", isLoading:false, type:'success', autoClose:300})
            navigate(`/tasks/${id}`)
          }
          catch(err){
            toast.update(loadertoast, {render:err.message, isLoading:false, type:'error', autoClose:300})
            console.log(err)
          }
    
        }
        postTask();
    
      }
    return (
        <>
            <div>
                <ToastContainer />
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
                    <label>TaskDescription:</label>
                    <input type="text" name="taskdescription" value={Form.taskdescription} onChange={handleChange} />

                    <label>Assign it to:</label>
                    <select name="assignedto" value={Form.assignedto} ref={selectref} onChange={handleChange}>
                        <option value={null}>No Editor</option>
                        {users.map((e) => (
                            <option value={e._id}>{e.name}</option>
                        ))}
                    </select>

                    <label>Image Preview:</label>
                    <img src="Form.image" alt="image" />
                    <input type="file" accept="image/*" name="image" ref={ref} onChange={handleImage} />

                    <button type="submit">Add</button>
                </form>

            </div>
        </>
    )
}

export default Updatetask;