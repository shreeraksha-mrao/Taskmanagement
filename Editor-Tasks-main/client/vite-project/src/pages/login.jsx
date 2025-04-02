import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../axios/axios';

const Login = () => {
    const [form, setForm] = useState({ name: '', password: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const loadertoast = toast.loading("Logging in...");

        const login = async () => {
            try {
                const res = await api.post('editors/pseudologin', form);
                console.log(res);
                toast.update(loadertoast, { render: "Login successful", isLoading: false, type: 'success', autoClose: 300 });
                setForm({ name: '', password: '' });
            } catch (err) {
                console.log(err);
                toast.update(loadertoast, { render: "Incorrect username or password", isLoading: false, type: 'error', autoClose: 300 });
            }
        };
        login();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
            <ToastContainer />
            <form onSubmit={handleSubmit} style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Name:</label>
                <input type="text" name='name' value={form.name} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

                <label style={{ fontWeight: 'bold' }}>Password:</label>
                <input type="password" name='password' value={form.password} onChange={handleChange} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

                <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
