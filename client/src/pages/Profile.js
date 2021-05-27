import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";

export default function Profile() {

    const [ratings, setRatings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');

    useEffect(() => {
        Axios.get("https://localhost:3001/login").then((response) => {
          if (response.data.loggedIn === true) {
            setLoggedInUser(response.data.user[0].username);
            getRatings();
          }
        });
    }, []);

    const getRatings = () => {
        Axios.post("https://localhost:3001/getUserRatings", {
          name: loggedInUser,
        }).then((response) => {
          console.log(response);
            setRatings(response);
        });
    };

  return(
    <div>
        {ratings[0]}
    </div>
  )
}