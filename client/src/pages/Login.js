import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Registration() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const NotLoggedIn = () => toast.success("Logged in");

  Axios.defaults.withCredentials = true;

  const login = async e => {
    e.preventDefault();
    Axios.post("https://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus('');
        NotLoggedIn();
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
    <div className="p-20  min-h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
      <div className="content text-3xl text-center md:text-left">
        <h1 className="text-5xl text-blue-500 font-bold mb-5">Zeitbank</h1>
        <p>Login to use all cool Features the Site has to offer</p>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <h1 className="text-5xl text-blue-500 font-bold text-center mb-4">Login</h1>
          <hr />
          <input onChange={(e) => {
            setUsername(e.target.value);
          }} type="text" placeholder="Name" className="mb-2 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <input onChange={(e) => {
            setPassword(e.target.value);
          }} type="password" placeholder="Password" className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <a className="text-red-600 text-center">{loginStatus}</a>
          <button onClick={login} className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg mt-1">Login</button>
          <hr />
          <a className="text-black-400 text-center mt-3 my-2">No Account yet?</a>
          <Link to="/reg">
          <button className="w-full bg-blue-500  mb-4 text-white p-3 rounded-lg font-semibold text-lg">Create New Account</button>
          </Link>
        </form>
      </div>
    </div>
  )
}