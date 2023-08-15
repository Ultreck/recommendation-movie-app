import React from 'react';
import { useSelector } from 'react-redux';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const SearchMovieDetail = () => {
      const genres = useSelector(state => state.allGenres);
      const [searchMovie] =  useSelector(state => state.searchMovie)
     

  return (
    <div>
              <div className="text h-screen overflow-auto justify-center bg-slate-800/90 px-10 w-full flex relative bg-blend-overlay items-center text-white bg-no-repeat bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${searchMovie?.poster_path})`}} >
            <div className={`text flex flex-wrap-reverse absolute lg:px-10 px-4  ${searchMovie? "" : "hidden"}`}>
              <div className={`text sm:w-3/5 lg:px-20 px-3`}>
                  <h1 className="text-2xl font-bold">{searchMovie?.title}</h1>
                  <p className="text my-5">{searchMovie?.overview}</p>
                  <div className="text flex items-center ">
                    <span className="text font-bold mr-3">Rating:</span>
                    {searchMovie?.vote_average}/10 <AiFillStar className='text-white mx-1'/>
                  </div>
                  <div className="text flex items-center">
                    <span className="text font-bold mr-3">Release Date:</span>
                    {searchMovie?.release_date}
                  </div>
                  <div className="text flex items-center">
                    <span className="text font-bold mr-3">Genres:</span>
                    {searchMovie?.genre_ids?.map(id => genres[id]).join(", ")}
                  </div>
                  <div className="text absolute  mt-10">
                        <Link to={`/`} className="text animate-bounce flex items-center gap-1 bg-red-600 px-6 py-1 rounded"><IoIosArrowBack/> Back To Home</Link>
                  </div>
              </div>
              <div className="text lg:w-2/5">
                <img src={`https://image.tmdb.org/t/p/w500/${searchMovie?.backdrop_path}`} alt="" className="text lg:w-4/5 h-60 mt-36 mb-5 px-2 border-2 rounded-lg shadow-md shadow-white" />
              </div>
              </div>
          </div>
    </div>
  )
}

export default SearchMovieDetail
