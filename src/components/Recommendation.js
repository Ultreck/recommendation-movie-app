import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Movies from "../components/Movies";
// import { Link } from "react-router-dom";
// import { AiFillStar } from "react-icons/ai";
// import { CgMiniPlayer } from "react-icons/cg";
// import { IoMdSettings } from "react-icons/io";
// import { FaFastForward } from "react-icons/fa";
// import { FaFastBackward } from "react-icons/fa";
// import { HiSpeakerWave } from "react-icons/hi2";
// import { FaPlay } from "react-icons/fa";
// import { MdSubtitles } from "react-icons/md";
// import { RiFullscreenLine } from "react-icons/ri";

const Recommendation = () => {
  const poster = 0;
  const [sortedMovies, setSortedMovies] = useState([]);
  const movies = useSelector((state) => state.allMovies);
  const genres = useSelector((state) => state.allGenres);
  const selectedGenresNameLocalStorage = JSON.parse(
    localStorage.getItem("selectedGenresName")
  );

  useEffect(() => {
    // sorting the movie to extract the top rated movie as the poster.
    const sortedMovies = [...movies];
    sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    setSortedMovies(sortedMovies);
  }, [movies]);

  return (
    <div className="">
      {/* Making use of the sorted movie for the poster. */}
      {/* {sortedMovies.map((value, index) => (
        <>
          {index === poster ? (
            <div
              className="text"
          
            >
              <div className="text bg-gray-950">
             
                <div className="text relative w-full bg-gray-950 pt-20">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${value.poster_path}`}
                    alt=""
                    className="w-4/5 mx-auto h-[80vh] object-cover aspect-video"
                  />
                  <div className="absolute w-full h-1 bg-gray-500 bottom-7">
                    <span className="absolute bottom-0 h-1 bg-red-500 w-60"></span>
                    <span className="absolute bottom-0 h-1 bg-gray-300 left-60 w-80"></span>
                    <span className="absolute -bottom-1 rounded-full h-3 bg-red-500 w-3 left-60"></span>
                  </div>
                </div>

                <div className="text flex justify-between items-center px-5 mt-2">
                  <div className="text-white flex items-center text-xl gap-5">
                    <FaFastBackward />
                    <FaPlay />
                    <FaFastForward />
                    <HiSpeakerWave />
                    <span>0:39/3:26</span>
                  </div>
                  <div className="text-white flex items-center text-xl gap-5">
                    <MdSubtitles />
                    <IoMdSettings />
                    <CgMiniPlayer />
                    <RiFullscreenLine />
                  </div>
                </div>
                <h1 className="text-2xl text-white bg-gray-950 mt-8 px-10 font-bold">
                  {value.title} | The highers rating movie
                </h1>
              </div>
            </div>
          ) : (
            <div className="text hidden"></div>
          )}
        </>
      ))} */}

      {/* <h1 className="l text-xs g:text-xl bg-gray-800 px-5 text-white mb-5 py-2 ">
        Go back to the Home page to adjust your genre by clicking{" "}
        <Link to="/" className="text underline font-bold">
          LightFlix
        </Link>{" "}
        Brand name.
      </h1> */}
      <div className="text-center bg-gray-950 text-white pt-20 grid items-center">
        <h1 className="text-xl font-bold">Selected Genre(s): </h1>
        <div className="text justify-center items-center flex flex-wrap mx-auto py-3 lg:mx-10 ">
          {selectedGenresNameLocalStorage.map((value) => (
            <div
              key={value}
              className="text bg-red-600 mx-2 px-2 py-2 lg:px-5 my-2 text-white font-bold rounded"
            >
              <>{value}</>
            </div>
          ))}
        </div>
      </div>
      {/* Section that mapped movies */}

      <div className="flex justify-center bg-gray-950  w-full">
        <div className="text">
          <h1 className="text lg:ml-10 ml-5 text-white my-3 font-bold text-xl">
            Recommended Movies
          </h1>
          <div className="text-black flex flex-wrap w-full">
            {movies.map((movie) => (
              <Movies
                key={movie.id}
                info={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
                posterPath={movie.poster_path}
                genres={movie.genre_ids.slice(0, 4).map((id) => (
                  <span
                    key={id}
                    className="text-xs mx-1 py-1 px-2 mt-3 bg-gray-800 text-white rounded-lg"
                  >
                    {genres[id]}
                  </span>
                ))}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
