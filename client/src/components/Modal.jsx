import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Modal = ({ setPopModal , mode, getItems, item , itemProgress , id }) => {
    const isEdit = mode === 'edit'? true: false;
    const [title, setTitle] = useState(isEdit? item : "");
    const [progress, setProgress] = useState(isEdit? itemProgress : 0);
    const [cookies, setCookie, removeCookie] = useCookies(null);
    
    const submitHandle = async(e) => {
        e.preventDefault();
        setPopModal(false);
        const data = {
            user: cookies.email,
            title: title,
            progress: progress,
            date: new Date()
        }
        if(isEdit){
            const response = await axios.patch(`http://localhost:5000/submit/${id}`,{data});
        }else{
        await axios.post("http://localhost:5000/submit",{data});
        }
        getItems();
    }
    
    return (
        <div className='modal-background'>
            <div className='modal'>
                <div className="modal-close">
                    <p onClick={() => setPopModal(false)}>X</p>
                </div>
                <div className='form'>
                <form onSubmit={submitHandle} className='modal-form'>
            <label htmlFor="title">Text</label>
            <input 
                type="text" 
                name="title" 
                id="title" 
                value={title} 
                placeholder='To-Do'
                onChange={(e) => setTitle(e.target.value)}
            /><br />
            
            <label id='progress-label'>drag the slider to set current progress</label>
            <input 
                type="range" 
                name="progress" 
                id="progress" 
                value={progress} 
                onChange={(e) => setProgress(e.target.value)}
            />
            
            <input 
                type="submit" 
                name="submit" 
                id="submit" 
                value="Submit"
            />
        </form>
                </div>
            </div>
        </div>
    )
}

export default Modal