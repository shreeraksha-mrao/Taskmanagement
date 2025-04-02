import React, { useEffect, useRef, useState } from 'react'
import api from '../axios/axios';
import { toast, ToastContainer } from 'react-toastify'

const AddTask = () => {
  const ref = useRef(null)
  const selectref = useRef()
  const [Form, SetForm] = useState({ taskdescription: '', assignedto: "", image: null })
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getallusers = async () => {
      const res = await api.get('/editors/')
      setUsers(res.data.data);
    }
    getallusers();
  }, [])

  const handleChange = (e) => {
    SetForm({ ...Form, [e.target.name]: e.target.value })
  }

  const handleImage = (e) => {
    SetForm({ ...Form, image: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    const loadertoast = toast.loading("Adding task...")
    e.preventDefault();
    const postTask = async () => {
      try {
        const formdata = new FormData();
        formdata.append('taskdescription', Form.taskdescription)
        if (Form.assignedto !== "") formdata.append('assignedto', Form.assignedto)
        formdata.append('image', Form.image)

        await api.post('/tasks/', formdata, {
          headers: {
            "Content-Type": 'multipart/form-data'
          }
        })
        toast.update(loadertoast, { render: "Added successfully", isLoading: false, type: 'success', autoClose: 300 })
        SetForm({ taskdescription: '', assignedto: "", image: null })
        ref.current.value = null;
        selectref.current.value = "";
      }
      catch (err) {
        toast.update(loadertoast, { render: err.message, isLoading: false, type: 'error', autoClose: 300 })
        console.log(err)
      }
    }
    postTask();
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <form onSubmit={handleSubmit} className="form-container">
          <h2 className="form-title">Add New Task</h2>

          <label className="label">Task Description:</label>
          <input type="text" name="taskdescription" value={Form.taskdescription} onChange={handleChange} className="input" />

          <label className="label">Assign to:</label>
          <select name="assignedto" value={Form.assignedto} ref={selectref} onChange={handleChange} className="select">
            <option value="">No Editor</option>
            {users.map((e) => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>

          <label className="label">Image:</label>
          <input type="file" accept="image/*" name="image" ref={ref} onChange={handleImage} className="input-file" />

          <button type="submit" className="button">Add</button>
        </form>
      </div>

      {/* Separate style tag for professional styling */}
      <style>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f4f4f4;
        }

        .form-container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 300px;
        }

        .form-title {
          font-size: 20px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
          text-align: center;
        }

        .label {
          display: block;
          margin-bottom: 5px;
          color: #555;
          font-weight: 500;
        }

        .input, .select {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 14px;
          outline: none;
          transition: border 0.3s;
        }

        .input:focus, .select:focus {
          border-color: #007bff;
        }

        .input-file {
          margin-bottom: 15px;
        }

        .button {
          width: 100%;
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background 0.3s;
        }

        .button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </>
  )
}

export default AddTask
