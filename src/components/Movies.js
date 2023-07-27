import React, {} from 'react';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Movies = ({ title, info, posterPath, genres, vote_average }) => {
    
  return (
    <>
      <div className="w-1/2 p-3  hover:scale-105 duration-200 transition-all md:w-1/3 lg:w-1/4 xl:w-1/5 ">
        <Link to={`/moviedetailview/${info}`}>
    <div className="text border-2 h-1/2 rounded-lg relative">
        <img className='w-full h-8/10 rounded-lg' src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
        <div className="absolute top-2 right-2 flex bg-red-600 px-3 py-1 rounded-lg text-white items-center gap-1">
              <span className="text font-bold">{vote_average}</span>
            <AiFillStar className=" text-white text-lg"/>
        </div>
        <div className="lg:px-5 px-2 py-1 text-xs  lg:text-sm">
          <h2 className='text-slate-700'>{title}</h2>
        </div>
          </div>
        </Link>
    </div>
    </>
  )
}

export default Movies
