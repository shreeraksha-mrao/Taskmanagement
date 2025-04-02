import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../axios/axios';
import { toast } from 'react-toastify';

const EditorDetails = () => {
    const[data, setData] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchapi = async()=>{
            try{
                const res = await api.get(`/editors/${id}`)
                setData(res.data.data);
            }
            catch(err){
                toast.error("Failed to get the editor details")
            }
        }
        fetchapi();
    },[])
    const deleteEditor = async()=>{
        try{
            const res = await api.delete(`/editors/${id}`)
            if(res.status == 200) toast.success("Deleted successfully")
            navigate('/editors')
            
        }
        catch(err){
            toast.error("Could not delete")
        }
    }
  return (
    <div>
        Name:{data.name}
        <br />
        {Array.from({length:data.rating}).map(e=> <i class="fa-solid fa-star"></i>)}
        <br />
        <br />
        <Link to= {`/editors/update/${data._id}`}><button>Edit Editor</button></Link>
        <button onClick={deleteEditor}>Delete Editor</button>
    </div>
  )
}

export default EditorDetails