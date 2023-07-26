import { configureStore } from '@reduxjs/toolkit';
import { allMoviesReducer } from './slices/AllMoviesSlice';
import { allGenresReducer } from './slices/AllGenresSlice';
import { searchMovieReducer } from './slices/SearchMovieSlice';


const store = configureStore({
      reducer: {
            allMovies: allMoviesReducer,
            allGenres: allGenresReducer,
            searchMovie:searchMovieReducer,
      }
})

export default store
