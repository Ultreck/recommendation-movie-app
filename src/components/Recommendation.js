import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
import Movies from "../components/Movies";
import { AiFillStar } from 'react-icons/ai';

const Recommendation = () => {
  const poster = 0;
  const [sortedMovies, setSortedMovies] = useState([])
  const movies = useSelector(state => state.allMovies);
  const genres = useSelector(state => state.allGenres);
   
  useEffect(() => {
        // sorting the movie to extract the top rated movie as the poster.
        const sortedMovies = [...movies];
        sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
        setSortedMovies(sortedMovies);
      }, [movies]);
      

    return (
      <div className="">
        {/* Making use of the sorted movie for the poster. */}
        {sortedMovies.map((value, index) =>(
          <>
          {index === poster?
          <div className="text h-[85vh] justify-center bg-slate-800/90 px-10 w-full flex relative bg-blend-overlay items-center text-white mb-8 bg-no-repeat bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${value.poster_path})`}} >
            <div className="text flex absolute lg:px-10 px-4">
              <div className={`text sm:w-3/5 lg:px-20 px-3 ${value? "" : "hidden"}`}>
                  <h1 className="text-2xl font-bold">{value.title}</h1>
                  <p className="text my-5">{value.overview}</p>
                  <div className="text flex items-center ">
                    <span className="text font-bold mr-3">Rating:</span>
                    {value.vote_average}/10 <AiFillStar className='text-white mx-1'/>
                  </div>
                  <div className="text flex items-center">
                    <span className="text font-bold mr-3">Release Date:</span>
                    {value.release_date}
                  </div>
                  <div className="text flex items-center">
                    <span className="text font-bold mr-3">Genres:</span>
                    {value.genre_ids.map(id => genres[id]).join(", ")}
                  </div>
              </div>
              <div className="text w-2/5 hidden sm:flex">
                <img src={`https://image.tmdb.org/t/p/w500/${value.backdrop_path}`} alt="" className="text lg:w-4/5 h-60 mt-10 lg:mt-0 px-2 border-2 rounded-lg shadow-md shadow-white" />
              </div>
              </div>
          </div>:
          <div className="text hidden"></div>
          }
          </>
        ))}

        {/* Section that mapped movies */}
        <div className="flex justify-center  w-full">
        <div className="text ">
          <h1 className="text lg:ml-10 ml-5 font-bold text-xl">Recommended Movies</h1>
          <div className="text-black flex flex-wrap w-full">
            {movies.map(movie => (
              <>
                <Movies
                key={movie.id}
                info={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                posterPath={movie.poster_path}
                genres={movie.genre_ids.map(id => id)}
                />
                </>
              ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default Recommendation
