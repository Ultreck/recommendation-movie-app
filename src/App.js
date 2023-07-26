import React, {userState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import Recommendation from "./components/Recommendation"
import { getMovies } from './slices/AllMoviesSlice';
import { getGenres } from './slices/AllGenresSlice';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';

function App() {
  const dispatch = useDispatch();
const MOVIE_URL = "https://api.themoviedb.org/3/discover/movie?api_key=ac8a3479c6590b82c6d9c82d62545a12&with_genres=53"
const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=ac8a3479c6590b82c6d9c82d62545a12"
  useEffect(() => {

    // Axios that fetch all Movies 
    axios.get(MOVIE_URL).then(data => {
      // redux to get all Movies
      dispatch(getMovies(data.data.results));
    }).catch(err => {
      console.log(err);
    });
    

    // The axios that fetch all genres
    axios.get(GENRE_URL).then(response => {
      const genreMap = {};
      response.data.genres.forEach(genre => {
        genreMap[genre.id] = genre.name;
      });
      // redux to get all Genres
      dispatch(getGenres(genreMap));
    }).catch(error => {
      console.error('Error fetching genres:', error);
    });

  }, [dispatch]);


  
  return (
    <div className="App">
      <NavBar/>
      <HomePage/>
      {/* <Recommendation/> */}
    </div>
  );
}

export default App;
