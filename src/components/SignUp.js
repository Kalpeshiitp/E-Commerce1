import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(()=>{    // sign up page dont open after sign up 
    let auth = localStorage.getItem('user');
    if(auth){
        navigate('/');
    }
  }
  )

  const getdata = async () => {
    console.warn(name, email, password);
    let result = await fetch('http://localhost:5000/register',{
        method:'post',
        body: JSON.stringify({name,email,password}),
        headers: {
            'Content-Type':'application/json'
        }
    })
    result = await result.json()
    console.warn(result);
    localStorage.setItem('user',JSON.stringify(result.result))
    localStorage.setItem('token',JSON.stringify(result.auth))
    if (result){
        navigate('/')
    }
  };
 
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
      />
      <button onClick={getdata} className="appBtn" type="button">
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
