import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(){

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();

const registerUser = (e)=>{

e.preventDefault();

alert("Registration Successful");

navigate("/");

}

return(

<div className="login-container">

<h2>Create Account</h2>

<form onSubmit={registerUser} className="login-form">

<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

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

<button type="submit">Register</button>

<p>Already have account?</p>

<Link to="/">Login</Link>

</form>

</div>

)

}

export default Register