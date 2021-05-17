import React from "react";
const Navbar = () => {

return(

<header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
  
  <div className="flex items-center justify-between mb-4 md:mb-0">
    <h1 className="leading-none text-2xl text-grey-darkest">
      <a className="no-underline text-grey-darkest hover:text-black" href="http://localhost:3000">
        Zeitbank
      </a>
    </h1>
  </div>
  <nav>
    <ul className="list-reset md:flex md:items-center">
      <li className="md:ml-4">
        <a className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="http://localhost:3000/jobs">
          Search Work
        </a>
      </li>
      <li className="md:ml-4">
        <a className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="http://localhost:3000/myjobs">
          My Jobs
        </a>
      </li>
    </ul>
  </nav>

</header>

)}



export default Navbar;