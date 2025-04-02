import React, { useEffect, useState } from 'react'
import api from '../axios/axios';
import { toast, ToastContainer } from 'react-toastify';

const Mapping = () => {
    const [editors, setEditors] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({ taskId: '', editorId: '' });

    useEffect(() => {
        const geteditors = async () => {
            try {
                const res = await api.get('/editors/');
                setEditors(res.data.data);
                console.log(res);
            }
            catch (err) {
                console.log("could not get the users");
                console.log(err);
            }
        }
        geteditors();

        const getunassignedtasks = async () => {
            try {
                const res = await api.get('/tasks/nonAssignedTasks');
                console.log(res);
                setTasks(res.data.data);
            }
            catch (err) {
                console.log("could not get unassigned tasks");
                console.log(err);
            }
        }
        getunassignedtasks();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.taskId || !form.editorId) {
            toast.error("Please select both an Editor and a Task");
            return;
        }

        const loaderToast = toast.loading("Assigning...");

        try {
            await api.patch('/tasks/assignEditor', {
                taskId: form.taskId,
                editorId: form.editorId
            });

            toast.update(loaderToast, { render: "Assigned successfully!", isLoading: false, type: 'success', autoClose: 3000 });

            // Delay updating the tasks to allow toast to show
            setTimeout(() => {
                setTasks(tasks.filter(task => task._id !== form.taskId));
                setForm({ taskId: '', editorId: '' });
            }, 2000);  // Delay UI update by 2 seconds

        } catch (err) {
            console.error("Error assigning editor:", err);
            toast.update(loaderToast, { render: "Assignment failed!", isLoading: false, type: 'error', autoClose: 3000 });
        }
    };

    return (
        <>
            <ToastContainer />
            {tasks.length > 0 ? (
                <>
                    <div className="container">
                        <form onSubmit={handleSubmit} className="form-container">
                            <h2 className="form-title">Assign Task</h2>

                            <label className="label">Editors:</label>
                            <select name="editorId" value={form.editorId} onChange={handleChange} className="select">
                                <option value="">Select an Editor</option>
                                {editors.map((e) => (
                                    <option key={e._id} value={e._id}>{e.name}</option>
                                ))}
                            </select>

                            <label className="label">Tasks yet to be assigned:</label>
                            <select name="taskId" value={form.taskId} onChange={handleChange} className="select">
                                <option value="">Select a Task</option>
                                {tasks.map((e) => (
                                    <option key={e._id} value={e._id}>{e.taskdescription}</option>
                                ))}
                            </select>

                            <input type="submit" value="Assign" className="button" />
                        </form>
                    </div>
                </>
            ) : (
                <p className="no-tasks">No tasks available for assignment.</p>
            )}

            {/* Styling Section */}
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
                    text-align: center;
                }

                .form-title {
                    font-size: 20px;
                    font-weight: bold;
                    color: #333;
                    margin-bottom: 15px;
                }

                .label {
                    display: block;
                    margin-bottom: 5px;
                    color: #555;
                    font-weight: 500;
                    text-align: left;
                }

                .select {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 15px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 14px;
                    outline: none;
                    transition: border 0.3s;
                }

                .select:focus {
                    border-color: #007bff;
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

                .no-tasks {
                    text-align: center;
                    font-size: 16px;
                    font-weight: bold;
                    color: #888;
                    margin-top: 20px;
                }
            `}</style>
        </>
    );
}

export default Mapping;
