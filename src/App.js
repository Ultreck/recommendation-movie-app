import React, {useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux'
import Recommendation from "./components/Recommendation"
import { getMovies } from './slices/AllMoviesSlice';
import { getGenres } from './slices/AllGenresSlice';
import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import MovieDetailView from './components/MovieDetailView';
import SearchMovieDetail from './components/SearchMovieDetail';

function App() {
  const dispatch = useDispatch();
      const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=ac8a3479c6590b82c6d9c82d62545a12";
      
      
    //use Effect to fetch all genres from The Movie Database(TMDb).
      useEffect(() => {
            axios.get(GENRE_URL).then(response => {
                  const genreMap = {};
                  response.data.genres.forEach(genre => {
                    genreMap[genre.id] = genre.name;
                  });
                  // redux to store all Genres
                  dispatch(getGenres(genreMap));
                }).catch(error => {
                  console.error('Error fetching genres:', error);
                });
            
      }, [dispatch]);

    

  
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/recommendation' element={<Recommendation/>}/>
        <Route path='/moviedetailview/:id' element={<MovieDetailView/>}/>
        <Route path='/searchmoviedetail/:id' element={<SearchMovieDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
