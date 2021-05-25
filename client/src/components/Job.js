import React from "react";


const Job = ({name, description, creator, hours, processor, loggedInUser, id, finished, deleteJob, takeJob, finishJob, updateJob, dropJob}) => {

          return(
              <tr className="w-full">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {name}
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4 break-all">
                  <div className="text-sm text-gray-500">{description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  {(finished === 1)?
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
                  finished
                  </span>
                  :processor?
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-300 text-yellow-900">
                  processed by {processor}
                  </span>
                  :
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Available
                  </span>
                  }
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {creator}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {hours}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {
                  finished === 1 ?
                  <button className="disabled:opacity-50 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded w-full h-full" disabled>
                  FINISHED
                  </button>
                  : (loggedInUser === creator) && (processor) ?
                    <div className="flex">
                      <button onClick={() => finishJob(id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-full w-full flex items-center justify-center mr-1"> 
                      <svg xmlns="http://www.w3.org/2000/svg"fill="currentColor" className="bi bi-check2-circle w-6 h-6" viewBox="0 0 16 16">
                        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                      </svg>
                      </button>
                      <button onClick={() => dropJob(id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-full w-full flex items-center justify-center mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      </button>
                    </div>
                  : loggedInUser === creator ?
                  <div className="flex">
                    <button onClick={() => updateJob(id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-full mr-1 w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    </button>
                    <button onClick={() => deleteJob(id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-full w-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash h-6 w-6" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                    </button>
                  </div>
                  : processor ?
                  <button className="disabled:opacity-50 bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded w-full h-full" disabled>
                  Start
                  </button>
                  :
                  <button onClick={() => takeJob(id)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full h-full">
                    Start
                  </button>
                  }
                </td>
            </tr>
          );
  };
  
export default Job;
  