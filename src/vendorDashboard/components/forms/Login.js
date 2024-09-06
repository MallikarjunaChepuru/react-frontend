import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      //console.log(data);
      if (response.ok) {
        alert("login success");
        setEmail("");
        setPassword("");

        localStorage.setItem("loginToken", data.token);
        showWelcomeHandler();
      }
      const vendorId=data.vendorId
console.log("checking for vendor Id:",vendorId)
      const vendorResponse=await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
     const vendorData=await vendorResponse.json()
      if (vendorResponse.ok){
        const vendorFirmId=vendorData.vendorFirmId
        const vendorFirmName=vendorData.vendor.firm[0].firmName
        
        localStorage.setItem("firmId",vendorFirmId)
        localStorage.setItem("firmName",vendorFirmName)
        console.log("checking for firmId",vendorFirmId)
        window.location.reload()
      }
   //   console.log(data)
    } catch (error) {
      console.error(error);
      alert("login fail");
    }
  };
  return (
    <div className="loginSection">
      <form className="authForm" onSubmit={submitHandler}>
        <h3>Vendor Login</h3>
        <label>Email</label>
        <input
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />{" "}
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <br />
        <div className="btnSubmit">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
