import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import api from '../axios/axios';

const Updateeditor = () => {
  const { id } = useParams();
  const [Form, SetForm] = useState({ name: '', rating: '', password: '' })
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchapi = async () => {
      try {
        const res = await api.get(`/editors/${id}`)
        console.log(res.data.data)
        SetForm(res.data.data);
      } catch (error) {
        console.log(error)
        toast.error("could not get the details")
      }
    }
    fetchapi();

  }, [])
  const handleChange = (e) => {
    SetForm({ ...Form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadertoast = toast.loading("Updating the editor details")
    const posteditor = async () => {
      try {

        await api.patch(`/editors/${id}`, Form)
        toast.update(loadertoast, { render: "Editor details updated successfully", type: "success", isLoading: false, autoClose: 200 })
        navigate(`/editors/${id}`)
      }
      catch (err) {
        toast.update(loadertoast, { render: "Failed", type: "error", isLoading: false, autoClose: 200 })
      }
    }
    posteditor();

  }
  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
        <label>Name:</label>
        <input type="text" name="name" value={Form.name} onChange={handleChange} />

        <label>Password:</label>
        <input type="password" name="password" value={Form.password} onChange={handleChange} />

        <label>Rating:</label>
        <input type="text" name="rating" value={Form.rating} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>

    </div>
  )
}

export default Updateeditor