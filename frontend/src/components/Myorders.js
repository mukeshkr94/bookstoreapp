import { useEffect, useState } from "react";
import '../App.css'
const Myorders =()=>{
    const id = localStorage.getItem('cust');
    const [order, setOrder] = useState([]);
    const [startDate, setStartDate]=useState([]);
    const [endDate, setEndDate]=useState([]);
   

    useEffect(()=>{
        fetchOrder()
    },[])
    // fetch customer order list
  const fetchOrder = async()=>{
    let result =await fetch(`http://localhost:5000/orderlist/${id}`);
        result = await result.json();
        setOrder(result)
        console.log(id)
    }
// search book

const searchHandle =async(event)=>{
    let key=event.target.value;
    let result = await fetch(`http://localhost:5000/myordersearch/${key}`);
            result= await result.json();
            console.log(result)
            if(key.length>1){
                setOrder(result)
            }else{
                fetchOrder();
            }
          
    }

// price filtter
const pricefilter=async(price)=>{
    let key=price.target.value;
    if(key ==='Price Range'){
        fetchOrder();
    }else{ let result =await fetch(`http://localhost:5000/pricefilter/${key}`);
    result = await result.json();
    if(key){
        setOrder(result)
    }else{
        fetchOrder();
    }
  }
   
}
// start and end date filter
const  datePickerHandler = async()=>{
   let fromdate = new Date(endDate).getTime();
   let todate = new Date(startDate).getTime();
   console.log(fromdate, 'and', todate)
   
    let result = await fetch(`http://localhost:5000/datewiseorderfillter/${startDate}.${endDate}`);
        result = await result.json();
        if(fromdate<todate){
            alert('Please select valid date range');
        }else if(result.length<=0){
            alert('Record not found between selected date range');

        }
        else{
            if(startDate && endDate){
                setOrder(result)
              }else{
                fetchOrder();
              }
        }
}

// clear all filter

const clearfilter =()=>{
    fetchOrder();
}

// purchase date wise sorting

const purchaseDatesorting =async ()=>{
    let result =await fetch('http://localhost:5000/purchasedatesorting');
    result = await result.json();
    setOrder(result)
}


//  price sorting

const pricesorting =async ()=>{
    let result =await fetch('http://localhost:5000/pricesorting');
    result = await result.json();
    setOrder(result)
}
    return(

        <div>
            <h5>My Orders</h5>
            <div className="search-menu">
            <div className="search">
                <input type='text' className="searchbox" placeholder="Search" onChange={searchHandle}/>
            </div>
            <div className="search">
               <select onChange={pricefilter}>
                <option selected="selected">Price Range</option>
                <option value='0-249'>Rs. 0-249</option>
                <option value='250-1000'>Rs. 250-1000</option>
               </select>
            </div>
            <div className="search">
              <input type='date' onChange={(e)=>setStartDate(e.target.value)}/> To 
              <input type='date' onChange={(e)=>setEndDate(e.target.value)}/> 
              <span style={{padding:'2px 10px', border:'1px solid deeppink', cursor:'pointer'}} onClick={datePickerHandler}>Search</span>
              <span style={{padding:'2px 10px', border:'1px solid deeppink', cursor:'pointer'}} onClick={clearfilter}>Reset</span>
            </div>
            
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Order_id</th>
                        <th>Purchase Date <span style={{cursor:'pointer', margin:'1px',padding:'1px 5px', border:'1px solid deeppink'}} onClick={purchaseDatesorting}>Sort</span></th>
                        <th>Book Name</th>
                        <th>Price <span style={{cursor:'pointer', margin:'1px',padding:'1px 5px', border:'1px solid deeppink'}} onClick={pricesorting}>Sort</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        order.map((order, index)=>( 
                        <tr key={index}>
                            <td>{order.order_id}</td>
                            <td>{new Date(order.purchase_date).toLocaleString()}</td>
                            <td>{order.book_title}</td>
                            <td>{order.total_price}</td>
                        </tr>))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Myorders;