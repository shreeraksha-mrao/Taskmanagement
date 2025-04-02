import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../axios/axios';
import { toast, ToastContainer } from 'react-toastify';

const Updatetaskfinal = () => {
  const { id } = useParams();
  const [Form, SetForm] = useState({ taskdescription: '', assignedto: '', image: null });
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getallusers = async () => {
      try {
        const res = await api.get('/editors/');
        setUsers(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getallusers();
  }, []);

  useEffect(() => {
    const gettask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        SetForm({
          taskdescription: res.data.data.taskdescription,
          assignedto: res.data.data.assignedto || '',
          image: res.data.data.image,
        });
      } catch (err) {
        console.error(err);
      }
    };
    gettask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'assignedto') {
      if (value === "") {
        SetForm({ ...Form, assignedto: null });
      } else {
        const selectedUser = users.find((user) => user._id === value);
        SetForm({ ...Form, assignedto: selectedUser || '' });
      }
    } else {
      SetForm({ ...Form, [name]: value });
    }
  };

  const handleImage = (e) => {
    if (e.target.files.length > 0) {
      SetForm({ ...Form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadertoast = toast.loading('Updating task...');
  
    try {
      const formData = new FormData();
      formData.append('taskdescription', Form.taskdescription);
      if (Form.assignedto) formData.append('assignedto', Form.assignedto._id);

      let imageFile = Form.image;
      if (typeof Form.image === 'string') {
        const response = await fetch(Form.image);
        const blob = await response.blob();
        imageFile = new File([blob], 'existing-image.jpg', { type: blob.type });
      }

      formData.append('image', imageFile);

      await api.patch(`/tasks/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.update(loadertoast, { render: 'Updated successfully', isLoading: false, type: 'success', autoClose: 300 });
      navigate(`/tasks/${id}`);
    } catch (err) {
      toast.update(loadertoast, { render: err.message, isLoading: false, type: 'error', autoClose: 300 });
      console.error(err);
    }
  };

  return (
    <div className="update-task-container">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="update-task-form">
        <label>Task Description:</label>
        <input type="text" name="taskdescription" value={Form.taskdescription} onChange={handleChange} required />

        <label>Assign it to:</label>
        <select name="assignedto" value={Form.assignedto?._id || ''} onChange={handleChange}>
          <option value="">No Editor</option>
          {users.map((e) => (
            <option key={e._id} value={e._id}>
              {e.name}
            </option>
          ))}
        </select>

        {Form.image && (
          <>
            <label>Image Preview:</label>
            <img src={typeof Form.image === 'string' ? Form.image : URL.createObjectURL(Form.image)} alt="task" className="image-preview" />
          </>
        )}

        <label>Upload New Image:</label>
        <input type="file" accept="image/*" name="image" onChange={handleImage} />

        <button type="submit">Update</button>
      </form>

      <style>
        {`
        .update-task-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f9f9f9;
        }

        .update-task-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 320px;
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        .update-task-form label {
          font-weight: bold;
          color: #333;
        }

        .update-task-form input, .update-task-form select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
        }

        .update-task-form button {
          padding: 10px;
          border: none;
          border-radius: 6px;
          background-color: #007bff;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: 0.3s;
        }

        .update-task-form button:hover {
          background-color: #0056b3;
        }

        .image-preview {
          width: 100px;
          border-radius: 6px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        `}
      </style>
    </div>
  );
};

export default Updatetaskfinal;
