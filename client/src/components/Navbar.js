import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const Navbar = () => {

  const [loginStatus, setLoginStatus] = useState("");
  const [hours, setHours] = useState("");
  let history = useHistory();

  useEffect(() => {
    Axios.get("https://localhost:3001/login", {withCredentials: true}).then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
        setHours(response.data.user[0].hours);
      }
    });
  }, []);

  const logout = () => {
    console.log("logout")
    document.cookie = 'userId=; Max-Age=-99999999;'; 
    localStorage.clear()
    history.push("/login");
  };

return(
<header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">

  <div className="flex items-center justify-between mb-4 md:mb-0">
    <h1 className="leading-none text-2xl text-grey-darkest">
      <Link className="no-underline text-grey-darkest hover:text-black" to="/">
        Zeitbank
      </Link>
    </h1>
  </div>
  <nav>
    <ul className="list-reset md:flex md:items-center">
      <li className="md:ml-4">
        <Link className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" to="/jobs">
          Search Work
        </Link>
      </li>
      <li className="md:ml-4">
        <Link className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" to="/myjobs">
          My Jobs
        </Link>
      </li>
      {loginStatus ? 
      <>
        <li className="md:ml-4">
          <Link className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" to="/profile">
            {loginStatus}
          </Link>
        </li>
        <li>
          <button onClick = {logout} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-full w-min-full flex items-center"> 
              logout
          </button>
        </li>
      </>
      :
      <>
      <li>
         <Link to="/reg">
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-full w-full flex items-center justify-center"> 
              Register
            </button>
        </Link>
      </li>
      <li>
        <Link to="/login">
            <button className="bg-blue-500 hover:bg-white text-white font-semibold hover:text-blue-700 py-2 px-4 border border-blue-500 hover:border-blue-500 rounded h-full w-full flex items-center justify-center"> 
              Login
            </button>
        </Link>
      </li>
      </>
      }
    </ul>
  </nav>

</header>

)}



export default Navbar;