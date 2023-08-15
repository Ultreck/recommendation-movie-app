import React, {useEffect,useState} from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

const MovieDetailView = () => {
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
      <div className="text h-screen overflow-auto justify-center bg-slate-800/90 px-10 w-full flex relative bg-blend-overlay items-center text-white bg-no-repeat bg-cover" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${currentMovieDetail?.poster_path})`}} >
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
      
    </div>
  )
}

export default MovieDetailView
