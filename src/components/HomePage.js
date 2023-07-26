import React, {useState, useEffect} from 'react'
import img from '../images/poster.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdArrowForwardIos } from 'react-icons/md';
import { getSearchMovie } from '../slices/SearchMovieSlice';

const HomePage = () => {
      const [selectedGenres, setSelectedGenres] = useState([]);
      const [reload, setReload] = useState(false);
      const [inputValue, setInputValue] = useState("");
      const [closeSearchTray, setCloseSearchTray] = useState(true)
      const [seatchMovies, setSeatchMovies] = useState([])
      
      
      // redux for the genres
      const genres =  useSelector(state => state.allGenres);
      const movies =  useSelector(state => state.allMovies);
      const searchM =  useSelector(state => state.searchMovie);
      const dispatch = useDispatch();
      // console.log(movies);
      
      useEffect(() => {
            let localStorageData = JSON.parse(localStorage.getItem('selectedGenres'));
            setSelectedGenres(localStorageData);
      }, [reload]);
      
      // console.log(movies);
      // Function handling on change of the search input
      const handleChanges = (e) => {
            const value = e.target.value
            setInputValue(value);
            const movieFilter =  movies.filter((movieName) => {
                 return  movieName.title.toLowerCase().includes(value.toLowerCase());
            });
            // redux for the searched movie.
            dispatch(getSearchMovie(movieFilter));
      }


      // Function handling the submit.
      const handleSubmit = (e) => {
            console.log(inputValue);
            
      }
      // Function handling the submit.
      const handleSearchChoice = (e) => {
            setInputValue(e.title);
            setCloseSearchTray(false);
            dispatch(getSearchMovie([e]));
            console.log(searchM);

      }
      // Function handling the selected genres with local Storage functionalities.
      const handleSelectedGenres = (id) => {
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
      }
      
      // Function handling the cancle selected genres with local Storage functionality.
      const handleCancleGenres = (id) => {
            let localStorageData =  JSON.parse(localStorage.getItem('selectedGenres'));
            let found =localStorageData.filter((genres) => genres !== id)
            localStorage.setItem('selectedGenres', JSON.stringify(found));
            setReload(found);
            
      }

  return (
    <div className='min-h-screen bg-no-repeat w-full pt-20 bg-cover bg-black/70 bg-blend-overlay' style={{backgroundImage: `url(${img})`}}>
            {/* <p className="text-center text-white my-2 ">Pr.</p> */}
      <div className="text text-center relative md:mt-32  lg:w-1/2 w-2/3 mx-auto">
            <input type="search" value={inputValue} placeholder='search movies by title...' onChange={handleChanges} onKeyUp={(e) => e.key === "Enter" && handleSubmit()} className="text py-1 px-5 w-full" />
            <div className={`text absolute  bg-white mt-1 w-full mx-auto min-h-40 ${inputValue && closeSearchTray? " " : "hidden"}`}>
                  {searchM.map((value, index) => (
                        <>
                        <div onClick={() =>handleSearchChoice(value)} className="text border px-5 py-1">{searchM.length === 0 ?value.title : "No Movie With Such Name"}</div>
                        </>
                  ))}
            </div>
      </div>
      <div className="text-white mt-10 lg:px-40  px-2 md:px-10">
            <h1 className="text-white text-center font-semibold">Get Top Movies Based On Genre</h1>
            <p className="text-center">You can add as many genre as possible.</p>
            <div className="text-center mt-3">
                        <button className={`text bg-blue-600 px-10 mx-auto py-2 items-center rounded  ${selectedGenres.length > 0? "flex" : " hidden "}`}>
                              Explore
                              <MdArrowForwardIos className={`ml-3 font-bold text-lg animate-pulse `}/>
                        </button>
            </div>

            <div className="text flex flex-wrap mx-auto">
            {Object.keys(genres).map(id => (
                  <div className=' flex justify-center  mx-auto'>
                  {/* Section that includes whether genre has been selected or not */}
                  {selectedGenres?.includes(id)? 
                        <button onClick={(e) => handleCancleGenres(id)} className='md:mx-5 mx-1 font-semibold text-sm text-black bg-white md:px-5 px-3 py-2 my-3 flex items-center gap-1 rounded-lg'  key={id}>
                              <p className="text">{genres[id]}</p>
                                    <AiOutlinePlus className='rotate-[45deg] font-bold duration-500'/>
                        </button>:
                        <button onClick={(e) => handleSelectedGenres(id)} className='md:mx-5 mx-1 font-semibold text-sm bg-[rgb(255,0,47)] md:px-5 px-3 py-2 my-3 flex items-center gap-1 rounded-lg'  key={id}>
                        <p className="text">{genres[id]}</p>
                              <AiOutlinePlus className='rotate-0 font-bold duration-500'/>
                        </button>
                  }
                  </div>
        ))}
        </div>
      </div>
      {/* <img src={img} alt="poster" className="text w-full h-full" /> */}
    </div>
  )
}

export default HomePage
