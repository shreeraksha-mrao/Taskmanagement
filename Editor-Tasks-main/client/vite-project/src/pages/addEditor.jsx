import React, { useState } from 'react'
import api from '../axios/axios'
import { toast, ToastContainer } from 'react-toastify'

const AddEditor = () => {
    const [Form, SetForm] = useState({ name: '', rating: '', password: '' })
    const handleChange = (e) => {
        SetForm({ ...Form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadertoast = toast.loading("Adding the editor details")
        const posteditor = async () => {
            try {

                await api.post('/editors', Form)
                toast.update(loadertoast, { render: "Editor details added successfully", type: "success", isLoading: false, autoClose: 200 })
                SetForm({ name: '', rating: '', password: '' })
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

                <button type="submit">Add</button>
            </form>

        </div>
    )
}

export default AddEditor