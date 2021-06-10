import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import StarsRating from 'stars-rating';

export default function Profile() {

    const [ratings, setRatings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [rating, setRating] = useState();
    const [email, setEmail] = useState();

    useEffect(() => {
        Axios.get("https://localhost:3001/login").then((response) => {
          if (response.data.loggedIn === true) {
            setLoggedInUser(response.data.user[0].username);
          }
        });
    }, []);

    useEffect(() => {
      if(loggedInUser){
        getRatings();
        getEmail();
      }
    }, [loggedInUser]);

    useEffect(() => {
      if(ratings != []){
      calculateRating()
      }
    }, [ratings])

    const getRatings = () => {
      console.log("logged in User: " + loggedInUser)
        Axios.post("https://localhost:3001/getUserRatings", {
          name: loggedInUser,
        }).then((response) => {
          console.log(response);
            setRatings(response.data);
        });
    };

    const getEmail = () => {
      Axios.post("https://localhost:3001/email", {
        username: loggedInUser,
      }).then((response) => {
          setEmail(response.data[0].email);
          console.log("email:" + email)
      });
    }

    const calculateRating = () =>{
      var res = 0;
      console.log(ratings.length)
      for(var i = 0; i < ratings.length; i++){
        res += ratings[i].rating;
        console.log(ratings[i].rating)
      }
      res=res/i;
      console.log(res);
      setRating(res);
    }

  return(
        
    <div className="bg-white my-12 pb-6 w-full justify-center items-center overflow-hidden md:max-w-sm rounded-lg shadow-sm mx-auto">
    <div className="relative h-40">
      <img className="absolute h-full w-full object-cover" src="https://images.unsplash.com/photo-1448932133140-b4045783ed9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80">
        </img>
    </div>
    <div className="relative shadow mx-auto h-24 w-24 -my-12 border-white rounded-full overflow-hidden border-4">
      <img className="object-cover w-full h-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80">
        </img>
    </div>
    <div className="mt-16">
      <h1 className="text-lg text-center font-semibold">
        {loggedInUser} 
      </h1>
      <p className="text-sm text-gray-600 text-center">
        {email}
      </p>
      {ratings.length > 0 ? 
      <p className="text-sm text-gray-600 text-center">
        {ratings.length} total ratings
      </p>
      :
      <p className="text-sm text-gray-600 text-center">
        no ratings
      </p>
      }
    </div>
    {ratings.length > 0 ? 
      <div className="mt-6 pt-3 flex flex-col mx-6 border-t justify-center items-center">
      <p className="text-sm text-gray-600 text-center">
        Rating: {rating.toFixed(2)}
      </p>
      <StarsRating
          value={Math.round(rating)}
          count={Math.round(rating)}
          size={40}
          color1={'#ffffff'}
          color2={'#2E64FE'}
          half={true}
          edit={false}
      />
      </div>
      :
      <>
      </>
    }
  </div>
  )
}