import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios'

/*
async function loginUser(credentials) {
  return fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}
*/

export default function Login() {

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const [usernameReg, setUserNameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  const [regStatus, setRegStatus] = useState("");

  /*
  const handleLoginSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });

    setLoginStatus(JSON.stringify(token.message).replace(/"/g, ""))
    console.log(loginStatus);

    setToken(token);
  }
  */

  const register = async e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      setRegStatus(JSON.stringify(response.data.message).replace(/"/g, ""))
    });
  }

  const login = async e => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      setLoginStatus(JSON.stringify(response.data.message).replace(/"/g, ""))
    });
  }

  return(
    <div className="p-20 h-full w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gray-200">
      <div className="content text-3xl text-center md:text-left">
        <h1 className="text-5xl text-green-700 font-bold mb-5">Zeitbank</h1>
        <p>Login to use all cool Features the Site has to offer</p>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <h1 className="text-5xl text-green-700 font-bold text-center mb-4">Login</h1>
          <hr />
          <input onChange={(e) => {setUserName(e.target.value);}} type="text" placeholder="Name" className="mb-2 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <input onChange={(e) => {setPassword(e.target.value);}} type="password" placeholder="Password" className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <a className="text-red-600 text-center">{loginStatus}</a>
          <button onClick={login} className="w-full bg-green-700 text-white p-3 rounded-lg font-semibold text-lg mt-1">Login</button>
          <hr />
          <a className="text-black-400 text-center mt-3 my-2">No Account yet?</a>
          <button className="w-full bg-blue-500  mb-4 text-white p-3 rounded-lg font-semibold text-lg">Create New Account</button>
        </form>
      </div>
      <div className="container mx-auto flex flex-col items-center">
        <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
          <h1 className="text-5xl text-blue-500 font-bold text-center mb-4">Register</h1>
          <hr />
          <input onChange={(e) => {setUserNameReg(e.target.value);}} type="text" placeholder="Name" className="mb-2 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <input onChange={(e) => {setPasswordReg(e.target.value);}} type="password" placeholder="Password" className="mb-1 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500" />
          <a className="text-red-600 text-center">{regStatus}</a>
          <button onClick={register} className="w-full bg-blue-500  mb-4 text-white p-3 rounded-lg font-semibold text-lg mt-1">Create New Account</button>
        </form>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};