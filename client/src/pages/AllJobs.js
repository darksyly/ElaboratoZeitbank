import React, {useState} from "react";
import Jobs from '../components/Jobs';


const AllJobs = () => {

  const [filter, setFilter] = useState('');

    return (  

      <div className="">

        <div className="ml-3 mt-3">
          <input type="text" className="h-14 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search ..." value={filter} onChange={event => setFilter(event.target.value)}></input>
          <div className="absolute top-4 right-3"> <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
        </div>
        
        <Jobs name = "" filter = {filter}></Jobs>
      </div>  
    );
};
  
export default AllJobs;