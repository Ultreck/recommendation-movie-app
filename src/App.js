import React, {useEffect, useState} from 'react'
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
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
      const GENRE_URL = "https://api.themoviedb.org/3/genre/movie/list?api_key=ac8a3479c6590b82c6d9c82d62545a12";
      
      const selectedGenresLocalStorage = JSON.parse(localStorage.getItem("selectedGenres"));
      const apiKey = 'ac8a3479c6590b82c6d9c82d62545a12';
      let listOfIds = parseInt(selectedGenresLocalStorage?.toString());
      const MOVIE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${listOfIds}`;


      useEffect(() => {
        axios.get(MOVIE_URL).then(data => {
              dispatch(getMovies(data.data.results));
              }).catch(err => {
              console.log(err);
              });
  }, [MOVIE_URL, dispatch, selectedGenresLocalStorage, reload]);
      
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
            
      }, [dispatch, reload]);

    

  
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage reload={reload} setReload={setReload}/>}/>
        <Route path='/recommendation' element={<Recommendation/>}/>
        <Route path='/moviedetailview/:id' element={<MovieDetailView/>}/>
        <Route path='/searchmoviedetail/:id' element={<SearchMovieDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
