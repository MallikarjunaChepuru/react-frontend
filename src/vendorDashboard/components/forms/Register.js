import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
 // const [error, setError] = useState("");
 // const [loading, setLoading] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({username,email,password})
      })
      const data=await response.json()
      console.log(data)
       if (response.ok){
        alert("Vendor registered successfully")
        setUsername("")
        setPassword("")
        setEmail("")
        showLoginHandler()
       }


      
    } catch (error) {
     console.log("registarion failred",error)
     alert("Registration failed")
    }
  };
  return (
    <div className="registerSection">
      <form className="authForm" onSubmit={submitHandler}>
        <h3>Vendor Register</h3>
        <label>Username</label>
        <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Enter your name" name="username" value={username} /> <br />
        <label>Email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" value={email} placeholder="Enter your email" /> <br />
        <label>Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" value={password} placeholder="Enter your password" />
        <br />
        <div className="btnSubmit">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
