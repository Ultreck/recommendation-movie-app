import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { IoIosArrowBack, IoMdSettings } from 'react-icons/io';
import { FaFastBackward, FaFastForward, FaPlay } from 'react-icons/fa';
import { HiSpeakerWave } from 'react-icons/hi2';
import { MdSubtitles } from 'react-icons/md';
import { RiFullscreenLine } from 'react-icons/ri';
import { CgMiniPlayer } from 'react-icons/cg';
// import { FaPause } from "react-icons/fa";

const MovieDetailView = () => {
      const [objectType, setobjectType] = useState("object-contain")
      const [currentMovieDetail, setcurrentMovieDetail] = useState({})
      const {id} = useParams();
      const allMovies = useSelector(state => state.allMovies);
      const genres =  useSelector(state => state.allGenres)

      useEffect(() => {
            // Filtering the actual / matched movies, making use of "Userparams 'id' "
            const [foundMovie] = allMovies.filter(value => value.id === parseInt(id));
            setcurrentMovieDetail(foundMovie);

      }, [allMovies, id])
      
  return (
    <div className='overflow-auto relative'>
      <div
                    className="text"
                  >
                    <div className="text bg-gray-950">
                      <div className="text relative w-full bg-gray-950 pt-20">
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${currentMovieDetail?.poster_path}`}
                          alt=""
                          className={`w-2/3 mx-auto h-[80vh] ${objectType}`}
                        />
                        <span className='absolute top-1/2 cursor-pointer left-1/2 text-white bg-gray-500/70 w-12 h-12 rounded-full flex justify-center items-center' > <FaPlay className='cursor-pointer' /></span>
                        <div className="absolute w-full h-1 bg-gray-500 bottom-7">
                          <span className="absolute bottom-0 h-1 bg-red-500 w-60"></span>
                          <span className="absolute bottom-0 h-1 bg-gray-300 left-60 w-80"></span>
                          <span className="absolute -bottom-1 rounded-full h-3 bg-red-500 w-3 left-60"></span>
                        </div>
                      </div>
      
                      <div className="text flex justify-between items-center px-5 mt-2">
                        <div className="text-white flex items-center text-xl gap-5">
                          <FaFastBackward className='cursor-pointer' />
                          <FaPlay className='cursor-pointer'/>
                          <FaFastForward className='cursor-pointer'/>
                          <HiSpeakerWave className='cursor-pointer'/>
                          <span>0:39/3:26</span>
                        </div>
                        <div className="text-white flex items-center text-xl gap-5">
                          <MdSubtitles className='cursor-pointer'/>
                          <IoMdSettings className='cursor-pointer'/>
                          <CgMiniPlayer className='cursor-pointer'/>
                          <RiFullscreenLine onClick={() => setobjectType(objectType === "object-contain"? "object-cover" : "object-contain")} className='cursor-pointer'/>
                        </div>
                      </div>
                      <h1 className="text-2xl text-white bg-gray-950 py-8 px-10 font-bold">
                        {currentMovieDetail?.title} | The highers rating movie
                      </h1>
                    </div>
                  </div>
      {/* <div className="text h-screen overflow-auto justify-center bg-slate-800/90 px-10 w-full flex relative bg-blend-overlay items-center text-white bg-no-repeat bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${currentMovieDetail?.poster_path})`}} >
            <div className={`text flex flex-wrap-reverse absolute lg:px-10 px-4  ${currentMovieDetail? "" : "hidden"}`}>
              <div className={`text sm:w-3/5 lg:px-20 px-3`}>
                  <h1 className="text-2xl font-bold">{currentMovieDetail?.title}</h1>
                  <p className="text my-5">{currentMovieDetail?.overview}</p>
                  <div className="text flex items-center ">
                    <span className="text font-bold mr-3">Rating:</span>
                    {currentMovieDetail?.vote_average}/10 <AiFillStar className='text-white mx-1'/>
                  </div>
                  <div className="text flex items-center">
                    <span className="text font-bold mr-3">Release Date:</span>
                    {currentMovieDetail?.release_date}
                  </div>
                  <div className="text flex items-center">
                    <span className="text font-bold mr-3">Genres:</span>
                    {currentMovieDetail?.genre_ids?.map(id => genres[id]).join(", ")}
                  </div>
                  <div className="text absolute  my-10">
                        <Link to={`/recommendation`} className="text animate-bounce flex items-center gap-1 bg-red-600 px-6 py-1 rounded"><IoIosArrowBack/> Back To The Recommendation</Link>
                  </div>
              </div>
              <div className="text lg:w-2/5 ">
                <img src={`https://image.tmdb.org/t/p/w500/${currentMovieDetail?.backdrop_path}`} alt="" className={`${currentMovieDetail?.backdrop_path? "" : "hidden"} text lg:w-4/5 h-60 mt-32 mb-4 lg:mb-0 px-2 border-2 rounded-lg shadow-md shadow-white`} />
              </div>
              </div>
          </div>
       */}
    </div>
  )
}

export default MovieDetailView
