import React, { useEffect, useState } from "react";
// import cartItem from "../services/Reducers/Reducer";
import '../App.css'
const Home = (props)=>{
    console.log('home', props)
   const {state:{cartItem:{data}}} = props
   
   console.log(data)
const [books, setBooks] = useState([]);
// const [serchBook, setSearchBook] = useState([]);
    useEffect(()=>{
        fetchbooklist();
    },[])
    const fetchbooklist = async ()=>{
        let books = await fetch('http://localhost:5000/');
            books = await books.json();
            console.log(books)
            setBooks(books)
    }

//    search book

const searchHandle =async(event)=>{
let key=event.target.value;
let result = await fetch(`http://localhost:5000/search/${key}`);
        result= await result.json();
        console.log(result)
        if(key.length>1){
            setBooks(result)
        }else{
           fetchbooklist();
        }
      
}

    return(
        <div>
            <div className="search">
                <input type='text' className="searchbox" placeholder="Search" onChange={searchHandle}/>
            </div>
           
        
        <div className="book_container">
           {
           books.map((item, index)=>(
                <div className="card" style={{width:"18rem", margin:"5px"}} key={index}>
                        <img src={item.book_cover} className="card-img-top" alt="..."/>
                    <div class="card-body">
                         <h5 className="card-title">{item.book_title}</h5>
                        <p className="card-text">Author : {item.book_author}</p>
                        <p className="card-text">Price  : Rs. {item.book_price}</p>
                        <button className="btn btn-primary" onClick={()=>props.addToCartHandler(item)}>Add to Cart</button>
                    </div>
                </div>
                )) 
           }
        </div>
        </div>
    )
}

export default Home;