import React, {useState, useEffect} from "react";
import Jobs from '../components/Jobs';
import Axios from 'axios';
import toast from 'react-hot-toast';
import Popup from '../components/Popup'

const NotJobCreated = () => toast.success("New Job created");
const NotNameToShort = () => toast.error("Invalid input");

const MyJobs = () => {

  const [filter, setFilter] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');

  const [jobName, setJobName] = useState();
  const [jobDescription, setJobDescription] = useState();
  const [jobHours, setJobHours] = useState();

  const [infoCreate, setInfoCreate] = useState(false);

  useEffect(() => {
    Axios.get("https://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoggedInUser(response.data.user[0].username);
      }
    });
  }, []);

  const createJob = () => {

    console.log(jobName + jobName.length)

    if(jobName.length < 5){
      NotNameToShort();
    }else{
      Axios.post("https://localhost:3001/createJob", {
        name: jobName,
        description: jobDescription,
        creator: loggedInUser,
        hours: jobHours,
      }).then((response) => {
        console.log(response);
        setInfoCreate(!infoCreate);
        NotJobCreated();
      });
    }
  };

    return (
      <div className="">

        <div className=" flex flex-wrap overflow-hidden p-3">
        <div className="w-1/6 overflow-hidden">
        <input type="text" className="h-14 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search ..." value={filter} onChange={event => setFilter(event.target.value)}></input>
        <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
        </div>
        <div className="w-1/6 overflow-hidden">
        </div>
        <div className="w-1/6 overflow-hidden">
          <input className="shadow appearance-none border rounded py-2 px-3 text-grey-darker h-full w-full"
            placeholder="hours"
            type="number"
            step={0.25}
            min={0.25}
            onChange={(e) => {
              setJobHours(e.target.value);
            }}  
          />
        </div>
        <div className="w-1/6 overflow-hidden">
          <input className="shadow appearance-none border rounded py-2 px-3 text-grey-darker h-full w-full"  type="text"
            placeholder="title"
            onChange={(e) => {
              setJobName(e.target.value);
            }}  
          />
        </div>
        <div className="w-1/6 overflow-hidden">
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-grey-darker h-full w-full"            type="text"
            placeholder="description"
            onChange={(e) => {
              setJobDescription(e.target.value);
            }}
          />
        </div>
        <div className="w-1/6 overflow-hidden">
          <button onClick={createJob} className="bg-transparent text-white hover:bg-red-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded w-full h-full">
            Create new Job
          </button>
        </div>
      </div>
        
        <div className="flex items-center justify-center">
          <h1>YOUR JOBS</h1>
        </div>
        <Jobs version="2" filter = {filter} infoCreate = {infoCreate}></Jobs>
        <div className="flex items-center justify-center mt-7">
          <h1>PROCESSING...</h1>
        </div>
        <Jobs version="3" filter = {filter} infoCreate = {infoCreate}></Jobs>
      </div>  
    );
};
  
export default MyJobs;
