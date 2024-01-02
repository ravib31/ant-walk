import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Add-Update.css";

function SignUp() {
  const [userData, setUserData] = useState({
    userid: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/",
        userData
      );
      console.log(response.data);
      navigate("/")
      // Handle success, redirect or show a success message
    } catch (error) {
      console.error("Sign-up failed:", error);
      // Handle error, show an error message
    }
  };

  return (
    <div className="Add-form">
      <h1>Sign-up</h1>
      <form onSubmit={handleSubmit}>
        
         
          <input
            type="text"
            name="userid"
            value={userData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
        
        <br />

      
       
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
        
        <br />
        <Link to="/login" style={{ color: 'white' }}>
  OR Login
</Link>

        <button type="submit">Sign-Up</button>
      </form>
    </div>
  );
}

export default SignUp;
