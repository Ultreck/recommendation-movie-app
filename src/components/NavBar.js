import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const handleAlert = () => {
    alert("Sorry the link to this repo has been disable");
  }
  return (
    <div>
            <div className="text-red-600 flex bg-black top-0 justify-around items-center fixed py-2 z-40 w-full  font-bold">
                <h1 className="text text-3xl" title='Home'> 
                <Link to={'/'} >LightFlix</Link>
                 </h1>
                <a href="##" className="text">
                        <button title='Github Repo' className="text-white flex items-center bg-red-600  px-3 py-1 rounded animate-pulse gap-1" onClick={handleAlert}><BsGithub/>Github</button>
                </a>
            </div>
    </div>
  )
}

export default NavBar
