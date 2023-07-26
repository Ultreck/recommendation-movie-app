import React from 'react';
import { BsGithub } from 'react-icons/bs';

const NavBar = () => {
  return (
    <div>
            <div className="text-red-600 flex  justify-around items-center fixed mt-2 w-full  font-bold">
                <h1 className="text text-3xl">  LightFlix</h1>
                <a href="##" className="text">
                        <button className="text-white flex items-center bg-red-600  px-3 py-1 rounded animate-pulse gap-1"><BsGithub/>Github</button>
                </a>
            </div>
    </div>
  )
}

export default NavBar
