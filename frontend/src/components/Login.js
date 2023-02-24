import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";




const Login = ()=>{
  const [email, setEmail]=useState('');
  const [pass, setPass]=useState('')
  const navigate= useNavigate()
 useEffect(()=>{
  const auth = localStorage.getItem('cust');
  if(auth){
    navigate('/')
  }
 
 },[])
  
const submitHandler = async(e)=>{
  e.preventDefault();
  const custDetails ={cust_email:email, cust_pass:pass}
  console.log(custDetails);

  let result =await fetch('http://localhost:5000/login',{
    method:'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body:JSON.stringify(custDetails),
  })
  result = await result.json()
  console.log(result);
  if(result.length>0){
    alert('login successfully')
    localStorage.setItem('cust',JSON.stringify(result[0].cust_id));
    navigate('/')
    console.log(result[0].cust_name)
  }else{
    alert(result.message)
  }
}

    return (
      <div className="loginform_container">
      <form id="loginform" onSubmit={submitHandler}>
        <h4 style={{color:'dodgerblue'}}>LOGIN</h4>
        <hr/>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email"
            onChange={(e)=>setEmail(e.target.value)}
            // value={email}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e)=>setPass(e.target.value)}
            // value={pass}
            required
          />
        </div>
        <button  className="loginbtn">
          Login
        </button>
      </form>
      </div>
    );
}
export default Login;