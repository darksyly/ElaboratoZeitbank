import React, { useEffect, useState } from "react";
import Job from './Job';
import Axios from 'axios'
import toast from 'react-hot-toast';

Axios.defaults.withCredentials = true;

const NotJobDeleted = () => toast.success("Job deleted");
const NotJobTake = () => toast.success("Job Accepted");
const NotJobDrop = () => toast.success("Job Rejected");

const Jobs = ({version, filter, infoCreate, rating}) => {

    const [allJobs, setJobs] = useState([]);
    const [filteredJobs, setfilteredJobs] = useState([]);

    const [loggedInUser, setLoggedInUser] = useState("");

    useEffect(() => {
      Axios.get("https://localhost:3001/login").then((response) => {
        if (response.data.loggedIn === true) {
          setLoggedInUser(response.data.user[0].username);
        }
      });
    }, []);

    const getJobs = () => {
      if(version === "2"){
        Axios.post("https://localhost:3001/getCreatedJobs", {
            name: loggedInUser,
          }).then((response) => {
          setJobs(response.data);
        });
      }else if (version === "3"){
        Axios.post("https://localhost:3001/getProcessedJobs", {
            name: loggedInUser,
          }).then((response) => {
          setJobs(response.data);
        });
      }else{
        Axios.get("https://localhost:3001/getAllJobs", {})
        .then((response) => {
          setJobs(response.data);
        });
      }
    };

    useEffect(() => {
        getJobs();
    }, [infoCreate, loggedInUser])

    const takeJob = (id) => {
      Axios.post("https://localhost:3001/takeJob", {
        name: loggedInUser,
        id: id
      }).then((response) => {
        console.log(response);
        NotJobTake();
        getJobs();
      });
    };
  
    const deleteJob = (id) => {
      Axios.post("https://localhost:3001/deleteJob", {
        id: id
      }).then((response) => {
        console.log(response);
        NotJobDeleted();
        getJobs();
      });
    };

    const finishJob = (id) => {
      console.log("Rating:" + rating)
      Axios.post("https://localhost:3001/finishJob", {
        id: id,
        rating: rating
      }).then((response) => {
        console.log(response);
        getJobs();
      });
    };

    const dropJob = (id) => {
      Axios.post("https://localhost:3001/dropJob", {
        id: id
      }).then((response) => {
        console.log(response);
        NotJobDrop();
        getJobs();
      });
    };

    useEffect(()=>{
          const filterJobs = ()=> {
          if(allJobs.length > 0){
            setfilteredJobs(((allJobs.filter(j => j.description.toLowerCase().includes(filter.toLowerCase())))))
          }
        }
        filterJobs();
    },[filter, allJobs])

  return(
    <div className="flex flex-col">
    <div className="flex items-center justify-center mt-3">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 align-middle w-11/12">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 table-auto w-full">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Creator
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  hours
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs && filteredJobs.map(element => <Job key={element.id}  name = {element.name} description = {element.description} creator = {element.creator} hours = {element.hours} processor= {element.processor} loggedInUser = {loggedInUser} id = {element.id} finished = {element.finished} deleteJob = {deleteJob} takeJob = {takeJob} finishJob = {finishJob} dropJob = {dropJob}></Job>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  </div>
  );
}

/*
    <div className=" bg-gray-200 flex flex-wrap overflow-hidden p-3">

        <div className="w-1/6 overflow-hidden">

        </div>
        <div className="w-1/6 overflow-hidden">

        </div>
        <div className="w-1/6 overflow-hidden">
          <input className="shadow appearance-none border rounded py-2 px-3 text-grey-darker h-full w-full"  type="text"
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
          <button onClick={createJob} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full h-full">
            Create new Job
          </button>
        </div>
    </div>
*/

export default Jobs;