import React, {userState, useEffect} from 'react'

const Movies = ({ title, posterPath, genres }) => {
      // console.log(genres);
  return (
      <div className="movie">
      <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
      <h2>{title}</h2>
      <p>Genres: {genres.join(', ')}</p>
    </div>
  )
}

export default Movies
