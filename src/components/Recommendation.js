import React, {useState, useEffect} from 'react';
import {useSelector } from 'react-redux';
import Movies from "../components/Movies";
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';

const Recommendation = () => {
  const poster = 0;
  const [sortedMovies, setSortedMovies] = useState([])
  const movies = useSelector(state => state.allMovies);
  const genres = useSelector(state => state.allGenres);
  const selectedGenresNameLocalStorage = JSON.parse(localStorage.getItem("selectedGenresName"));
   
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
          <div className="text h-[85vh] justify-center bg-slate-800/90 px-10 w-full flex relative bg-blend-overlay items-center text-white bg-no-repeat bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${value.poster_path})`}} >
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
        
          <h1 className="l text-xs g:text-xl bg-blue-500 px-5 text-white mb-5 py-2 ">Go back to the Home page to adjust your genre by clicking <Link to="/" className="text underline font-bold">LightFlix</Link>  Brand name.</h1>
        <div className="text-center  grid items-center border-b">
          <h1 className="text-xl font-bold border-b">Selected Genre(s): </h1>
          <div className="text justify-center items-center flex flex-wrap mx-auto py-3 lg:mx-10 ">
            {selectedGenresNameLocalStorage.map((value, index)  => (
              <>
              <div className="text bg-red-600 mx-2 px-2 py-2 lg:px-5 my-2 text-white font-bold rounded">{value}</div>
              </>
            ))}
          </div>
        </div>
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
                genres={movie.genre_ids.map(id => genres[id]).join(", ")}
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
