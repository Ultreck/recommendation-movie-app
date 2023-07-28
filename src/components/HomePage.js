import React, {useState, useEffect} from 'react'
import img from '../images/poster.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdArrowForwardIos } from 'react-icons/md';
import { getSearchMovie } from '../slices/SearchMovieSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getMovies } from '../slices/AllMoviesSlice';

const HomePage = ({reload, setReload}) => {
      const [selectedGenres, setSelectedGenres] = useState([]);
      const [inputValue, setInputValue] = useState("");
      const [closeSearchTray, setCloseSearchTray] = useState(true);
      
      
      // redux 
      const genres =  useSelector(state => state.allGenres);
      const movies =  useSelector(state => state.allMovies);
      const searchM =  useSelector(state => state.searchMovie);
      const dispatch = useDispatch();
      const navigate =  useNavigate();
      // const selectedGenresLocalStorage = JSON.parse(localStorage.getItem("selectedGenres"));
      // const apiKey = 'ac8a3479c6590b82c6d9c82d62545a12';
      // let listOfIds = parseInt(selectedGenresLocalStorage?.toString());
      // const MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${listOfIds}`;

      //use Effect to fetch selected genres from localStorage.
      useEffect(() => {
            let localStorageData = JSON.parse(localStorage.getItem('selectedGenres'));
            setSelectedGenres(localStorageData);
      }, [reload]);

      //use Effect to fetch selected genres movies from The Movie Database(TMDb).
      // useEffect(() => {
      //       axios.get(MOVIE_URL).then(data => {
      //             dispatch(getMovies(data.data.results));
      //             }).catch(err => {
      //             console.log(err);
      //             });
      // }, [MOVIE_URL, dispatch, selectedGenresLocalStorage]);

            
      // Function handling on change of the search input
      const handleChanges = (e) => {
            const value = e.target.value
            setInputValue(value);
            const movieFilter =  movies.filter((movieName) => {
                 return  movieName.title.toLowerCase().includes(value.toLowerCase());
            });
            // redux to store the searched movie.
            dispatch(getSearchMovie(movieFilter));
      }

      // Function handling the submit.
      const handleSearchInput = (e) => {
            setInputValue(e.title);
            setCloseSearchTray(false);
            dispatch(getSearchMovie([e]));
            navigate(`/searchmoviedetail/${e.id}`);

      }
      // Function handling the selected genres with local Storage functionalities.
      const handleSelectedGenres = (id, genre) => {
            console.log(genre);
            if(localStorage.selectedGenres){
                  let localStorageData =  JSON.parse(localStorage.getItem('selectedGenres'));
                  localStorage.setItem('selectedGenres', JSON.stringify([...localStorageData, id])); 
                  setSelectedGenres(localStorageData);
                  setReload(localStorageData);
            }else{
                  localStorage.setItem('selectedGenres', JSON.stringify([id]));
                  let localStorageData =  JSON.parse(localStorage.getItem('selectedGenres'));
                  setSelectedGenres(localStorageData);
                  setReload(localStorageData);
            }
            
            // Condition that set the genre name into the local storage
            if(localStorage.selectedGenresName){
                  let localStorageName =  JSON.parse(localStorage.getItem('selectedGenresName'));
                  localStorage.setItem('selectedGenresName', JSON.stringify([...localStorageName, genre])); 
            
            }else{
                  localStorage.setItem('selectedGenresName', JSON.stringify([genre]));
                  // let localStorageData =  JSON.parse(localStorage.getItem('selectedGenresName'));
            }

      }
      
      // Function handling the cancle selected genres with local Storage functionality.
      const handleCancleGenres = (id, genre) => {
            let localStorageData =  JSON.parse(localStorage.getItem('selectedGenres'));
            let found =localStorageData.filter((genres) => genres !== id)
            localStorage.setItem('selectedGenres', JSON.stringify(found));
            setReload(found);

            let selectedGenresName =  JSON.parse(localStorage.getItem('selectedGenresName'));
            let genreName = selectedGenresName.filter((genres) => genres !== genre)
            localStorage.setItem('selectedGenresName', JSON.stringify(genreName));
            setReload(found);
            
      }
      
      const handleRecommendationRoute= () => {
            navigate("/recommendation");
            setReload(true);
      }

  return (
    <div className='min-h-screen bg-no-repeat w-full pt-20 bg-cover bg-black/70 bg-blend-overlay' style={{backgroundImage: `url(${img})`}}>
      <div className="text text-center relative md:mt-32  lg:w-1/2 w-2/3 mx-auto">
            <input type="search" value={inputValue} placeholder='search movies by title...' onChange={handleChanges} 
             className="text py-1 px-5 w-full" />
            <div className={`text absolute cursor-pointer  bg-white mt-1 w-full mx-auto min-h-40 ${inputValue && closeSearchTray? " " : "hidden"}`}>
                  {searchM.map((value, index) => (
                        <>
                        <div onClick={() =>handleSearchInput(value)} className="text hover:bg-slate-50 border px-5 py-1">{value.title}</div>
                        </>
                  ))}
            </div>
      </div>
      <div className="text-white w-full lg:w-4/5 mx-auto mt-10 lg:px-40  px-2 md:px-10">
            <h1 className="text-white text-center font-semibold">Get Top Movies Based On Genre</h1>
            <p className="text-center">You can add as many genre as possible.</p>
            {/* Section to display button if at least one genre has been seleceted */}
            <div className="text-center mt-3">
                        <button onClick={handleRecommendationRoute} className={`text-center justify-center bg-blue-600 px-5 w-1/2 md:w-1/3 mx-auto py-2 items-center rounded  ${selectedGenres?.length > 0? "flex" : " hidden "}`}>
                              Explore
                              <MdArrowForwardIos className={`ml-3 font-bold text-lg animate-pulse `}/>
                        </button>
            </div>

            <div className="text flex flex-wrap mx-auto">
            {Object.keys(genres).map(id => (
                  <div className=' flex justify-center  mx-auto'>
                  {/* Section that includes whether genre has been selected or not */}
                  {selectedGenres?.includes(id)? 
                        <button onClick={(e) => handleCancleGenres(id, genres[id])} className='md:mx-5 mx-1 font-semibold text-sm text-black bg-white md:px-5 px-3 py-2 my-3 flex items-center gap-1 rounded-lg'  key={id}>
                              <p className="text">{genres[id]}</p>
                                    <AiOutlinePlus className='rotate-[45deg] font-bold duration-500'/>
                        </button>:
                        <button onClick={(e) => handleSelectedGenres(id, genres[id])} className='md:mx-5 mx-1 font-semibold text-sm bg-[rgb(255,0,47)] md:px-5 px-3 py-2 my-3 flex items-center gap-1 rounded-lg'  key={id}>
                        <p className="text">{genres[id]}</p>
                              <AiOutlinePlus className='rotate-0 font-bold duration-500'/>
                        </button>
                  }
                  </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
