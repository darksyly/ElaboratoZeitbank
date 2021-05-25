
import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function Main() {
  const [loginStatus, setLoginStatus] = useState("");

  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("https://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(response.data.user[0].username);
      }
    });
  }, []);

    return (
      <div>
        {loginStatus}
      </div>
    );
  
}