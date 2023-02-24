import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../App.css';


const Navbar =(props)=>{
  const {state:{cartItem:{data}}} = props
  const {id} = useParams();
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([])
  const [total, setTotal]= useState(0)
  let sum =0;
useEffect(()=>{
  grandTotal();
},[data])

// calculate grand total

  const grandTotal =()=>{
    data.map((e, i)=>{
    sum = sum + Number(e.book_price)*Number(e.book_quantity) 
  })
    setTotal(sum)
  }

 
//   const compareId = ()=>{

//   let compareData = data.filter((e)=>{
//     return e.id == id 
//   });
//   setFilterData(compareData);
// }

// remove item

 const removeItem = (id)=>{
  props.removeToCartHandler(id);
  navigate('/')

 }
//  deacrease item
 const decreaseItem = (id)=>{
  props.decreaseItemHandler(id);
 }
 
// useEffect(()=>{
//   compareId()
// },[id])


const auth = localStorage.getItem('cust');

// lougout
const logout =()=>{
 localStorage.clear();
  navigate('/login')
}

// place order

const placeOrder =async(id)=>{
  const auth = localStorage.getItem('cust')
  if(auth){
    let result =await fetch('http://localhost:5000/myorder',{
    method:"post",
    body:JSON.stringify({
      book_title:data[0].book_title,
      total_price:total,
      cust_id:auth
      }),
    headers:{
      'Content-Type' : 'application/json'
    }
  })
    result =await result.json();
    console.log(result)
   
    if(result.affectedRows===1){
      alert('order placed successfully');
    }
  
  }else{
    navigate('/login')
  }

}

    return(
      
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
           <div className="container-fluid">
         <div className="brand"> <span className="brand1">BOOK</span><span className="brand2">APP</span></div>
   
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {/* <li className="nav-item">
          <Link to='/books' className="nav-link">All Books</Link>
        </li> */}
        <li className="nav-item">
        <Link to='/' className="nav-link">Home</Link>
        </li>
        {
          auth ? 
          <li className="nav-item">
          <Link to='/logout' className="nav-link" onClick={logout}>Log Out</Link>
          </li>  :<li className="nav-item">
        <Link to='/login' className="nav-link"><i class="bi bi-lock-fill"></i>Login</Link>
        </li> 
        }
        {
          auth ? <li className="nav-item">
          <Link to='/myorder' className="nav-link">My Orders</Link>
          </li> :""
        }
       
              
      </ul>
      
      
 
  <i id="dropdown-toggle" className="bi bi-bag-fill"
   data-bs-toggle="dropdown" aria-expanded="false">
   <span className="cart_count">{data.length}</span>
  </i>{
    data.length ? 
    <div className="dropdown-menu"> 
      <table class="table table-bordered">
  <thead>
    <tr>
    <td colSpan={4}>Cart Details</td>
    </tr>
  </thead>
  <tbody>
    {
      data.map((item, index)=>(
        <tr>
          <td>{index+1}</td>
          <td><img src={item.book_cover} alt="..." className="cartimg"/></td>
          <td style={{width:'150px', textAlign:'center', verticalAlign:'middle'}}>
            <span className="decr" onClick={item.book_quantity <=1 ? ()=>removeItem(item.book_id) : ()=>decreaseItem(item)}>-</span>
            <span className="tvalue">{item.book_quantity}</span>
            <span className="incr" onClick={()=>props.addToCartHandler(item)}>+</span>
          </td>
          <td>
            <p><b style={{color:"Deeppink"}}>Book Title :</b> {item.book_title}</p> 
            <p><b style={{color:"Deeppink"}}>Price : </b>Rs.  {item.book_quantity * item.book_price}</p> 
            <p onClick={()=>removeItem(item.book_id)} style={{textAlign:'center', width:'40px', color:'deeppink', fontSize:'10px', cursor:'pointer', border:'1px solid deeppink', padding:'2px'}}>Delete</p></td>
       </tr>
      ))
    }
    
    <tr>
    <td colSpan={3} style={{color:"Deeppink", textAlign:'center'}}><p><b >TOTAL</b> </p></td>
      <td colSpan={2} style={{color:"dodgerblue", textAlign:'center'}}><b>{total}</b></td>
    </tr>
    <tr style={{textAlign:"center"}}>
    <td colSpan={4}>
      <button type="button" onClick={placeOrder} 
      style={{width:'300px', color:'white', backgroundColor:'deeppink', 
      border:'none', height:'30px', fontWeight:"600"}}>Place Order</button>
    </td>
     
    </tr>
  </tbody>
</table>
    </div> :
    <div className="dropdown-menu">
    <p>cart is Empty</p>
  </div>
  }
  

   
    </div>
  </div>
</nav>
    )
}

export default Navbar;