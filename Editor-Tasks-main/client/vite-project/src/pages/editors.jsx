import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../axios/axios';
import { toast, ToastContainer } from 'react-toastify'
import './Editor.css'; // ✅ Import CSS file

const Editors = () => {
    const [Editors, setEditors] = useState([]);

    useEffect(() => {
        const fetchapi = async () => {
            try {
                const res = await api.get('/editors');
                console.log(res);
                setEditors(res.data.data);
            } catch (error) {
                toast.error("Failed to load");

            }
        };
        fetchapi();
    }, []);

    return (
        <div className="editors-container">
            <ToastContainer />
            <h1 className="title">All Editors</h1>
            <ul className="editors-list">
                {Editors.map((e) => (
                    <li key={e._id} className="editor-item">
                        <Link to={`/editors/${e._id}`} className="editor-link">
                            {e.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/addEditor">
                <button className="add-editor-btn">Add Editor</button>
            </Link>
        </div>
    );
};

export default Editors;
