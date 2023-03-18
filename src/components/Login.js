import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const  Login = ()=> {
    const [email,setemail]=useState('');
    const [password,setpassword]=useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        let auth = localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    })

 const handleLogin= async ()=>{
console.warn(email,password)
let result = await fetch('http://localhost:5000/login',{
        method:'post',
        body: JSON.stringify({email,password}),
        headers: {
            'Content-Type':'application/json'
        }
    })
    result = await result.json();
    console.warn(result)
    if(result.auth){
        localStorage.setItem('user',JSON.stringify(result.user));
        localStorage.setItem('token',JSON.stringify(result.auth));
        navigate('/');
    }else {
        alert('Please enter the correct details')
    }
 }
    return (
        <div className="login">
            <h1>Login</h1>
            <input className="inputBox" type="text" onChange={(e)=>setemail(e.target.value)} value={email} placeholder="Enter email"></input>
            <input className="inputBox" onChange={(e)=>setpassword(e.target.value)} value={password} type="password" placeholder="Enter password"></input>
            <button  onClick={handleLogin} className="appBtn" type="button">Login</button>
            
             
        </div>
    )
}

export default Login;