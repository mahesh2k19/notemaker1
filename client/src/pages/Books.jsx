import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () =>{
        try{
            const res = await axios.get("http://localhost:5500/books")
            setBooks(res.data);

        }catch(err){
            console.log(err)

        }
    }
     fetchAllBooks()
  },[])

  const handledelete = async (id)=>{
    try{
        await axios.delete("http://localhost:5500/books/"+id)
        window.location.reload()

    }catch(err){

    }
  }
  const [query, setQuery] = useState("");



  return (
    <div>
        <h1>My  Note Keeper...</h1>
        <input type='text'className='search' placeholder='Search....' onChange={e=> setQuery(e.target.value)}></input>
        <hr/>
        <div className="books">
            <div className="bookdiv">
            {books.filter((books)=> books.tiitle.toLowerCase().includes(query)).map(book=>(
                <div className="book" key={book.id}>
                    {book.cover && <img src={book.cover} alt="" />}
                    <h2>
                        {book.tiitle}
                    </h2>
                    <p>{book.desc}</p>
                    <button className="delete" onClick={()=>handledelete(book.id)}>Delete</button>
                    <button className="update"><Link to={`/update/${book.id}`} style={{color:"inherit", textDecoration:"none"}}>Update</Link></button>
                </div>
                
            ))}
            </div>
        </div>
        <button className='addnew'style={{textDecoration:"none",color:'inherit'}}><Link to ="/add">Add New</Link></button>
        </div>
  )
}

export default Books