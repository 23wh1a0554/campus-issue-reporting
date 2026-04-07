import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = (e) => {

    e.preventDefault();

    // simple demo login
    if(email === "admin@gmail.com"){
      navigate("/admin");
    } else {
      navigate("/user");
    }

  }

  return (

    <div className="login-container">

      <h2>Campus Issue Reporting System</h2>

      <form onSubmit={loginUser} className="login-form">

        <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        />

        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        />

        <button type="submit">Login</button>

        <p>Don't have account?</p>

        <Link to="/register">Register</Link>

      </form>

    </div>
  );
}

export default Login;