import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
    const [book, setBook] = useState({
        tiitle:"",
        desc:"",
        cover:"",
    });

    const navigate = useNavigate();
    const location = useLocation()

    const bookId = location.pathname.split("/")[2]


    const handleChange = (e) => {
        setBook((prev)=>({...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async e =>{
        e.preventDefault()
        try{

            await axios.put("http://localhost:5500/books/" + bookId, book)
            navigate("/")
        }catch(err){
            console.log(err);

        }
    }


  return (
    <div className='form'>
        <h1>Update Note</h1>
        <input type='text' placeholder='tiitle' onChange={handleChange}  name="tiitle"/>
        <input type='text' placeholder='desc' onChange={handleChange}  name="desc" />
        {/*<input type="file" placeholder='cover'  onChange={handleChange} name="cover" />*/}
        <button className='formButton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update;