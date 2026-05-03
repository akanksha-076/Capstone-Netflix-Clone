import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Row.css';

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(fetchUrl).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchUrl]);

  const handleMovieClick = (movie) => {
    const watched = JSON.parse(localStorage.getItem('continueWatching') || '[]');
    const alreadyExists = watched.find((m) => m.id === movie.id);
    if (!alreadyExists) {
      const updated = [movie, ...watched].slice(0, 10);
      localStorage.setItem('continueWatching', JSON.stringify(updated));
    }
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row__poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title || movie.name}
            onClick={() => handleMovieClick(movie)}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;