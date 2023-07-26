import React from 'react';
import {useSelector } from 'react-redux'
import Movies from "../components/Movies"

const Recommendation = () => {
  
    // State management for both genres and movies
      const movies = useSelector(state => state.allMovies);
      const genres = useSelector(state => state.allGenres);


  return (
      <div className="recommendation">
      <h1 className="text-red-500 text-3xl ">Thriller Movies Recommendation</h1>
      <div className="text-black">
        {movies.map(movie => (
          <Movies
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_path}
            genres={movie.genre_ids.map(id => genres[id])}
          />
        ))}
      </div>
    </div>
  )
}

export default Recommendation
