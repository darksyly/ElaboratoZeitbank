import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import toast from 'react-hot-toast';

export default function Registration() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const NotUserCreated = () => toast.success("User created");

  const [regStatus, setRegStatus] = useState("");

  Axios.defaults.withCredentials = true;

  const register = async e => {
    e.preventDefault();
    Axios.post("https://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response);
      if (response.data.message) {
        setRegStatus(response.data.message);
      }else{
        setRegStatus("");
        NotUserCreated();
      }
    });
  };

  useEffect(() => {
    Axios.get("https://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        //setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

  return(
    <div className="p-20 min-h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
      <div className="content text-3xl text-center md:text-left">
        <h1 className="text-5xl text-blue-500 font-bold mb-5">Zeitbank</h1>
        <p>Login to use all cool Features the Site has to offer</p>

      </div>
      <div className="container mx-auto flex flex-col items-center">
        <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <h1 className="text-5xl text-blue-500 font-bold text-center mb-4">Register</h1>
          <hr />
          <input onChange={(e) => {
            setUsernameReg(e.target.value);
          }} type="text" placeholder="Name" className="mb-2 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <input onChange={(e) => {
            setPasswordReg(e.target.value);
          }} type="password" placeholder="Password" className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <a className="text-red-600 text-center">{regStatus}</a>
          <button onClick={register} className="w-full bg-blue-500  mb-4 text-white p-3 rounded-lg font-semibold text-lg mt-1">Create New Account</button>
        </form>
      </div>
    </div>
  )
}
/*

*/