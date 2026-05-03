import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
    ).then((response) => {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    });
  }, []);

  if (!movie) return null;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="banner__overlay" />
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.name}
        </h1>
        <p className="banner__description">
          {movie?.overview?.length > 150
            ? movie?.overview?.substring(0, 150) + '...'
            : movie?.overview}
        </p>
        <div className="banner__buttons">
          <button className="banner__button banner__button--play">
            ▶ Play
          </button>
          <button className="banner__button banner__button--info">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;