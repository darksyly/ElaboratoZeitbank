import React, {useState, useEffect} from "react";
import Jobs from '../components/Jobs';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const AllJobs = () => {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    Axios.get("https://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoggedInUser(response.data.user[0].username);
      }
    });
  }, []);

  if(loggedInUser){
    return (  
      <div className="">
        <div className="ml-3 mt-3">
          <input type="text" className="h-14 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search ..." value={filter} onChange={event => setFilter(event.target.value)}></input>
          <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
        </div>
        <Jobs version = "1" filter = {filter}></Jobs>
      </div>  
    );
  }else{
    return(
      <div className="flex align-center justify-center">
        <h1>Log in to see this page</h1>
      <Link to="/login">
        <button className="bg-blue-500 hover:bg-white text-white font-semibold hover:text-blue-700 py-2 px-4 border border-blue-500 hover:border-blue-500 rounded h-full w-full flex items-center justify-center"> 
          Login
        </button>
      </Link>
      </div>
    );
  }
};
  
export default AllJobs;