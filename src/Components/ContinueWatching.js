import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContinueWatching.css';

function ContinueWatching() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const watched = JSON.parse(localStorage.getItem('continueWatching') || '[]');
    setMovies(watched);
  }, []);

  const handleRemove = (e, movieId) => {
    e.stopPropagation();
    const updated = movies.filter((m) => m.id !== movieId);
    setMovies(updated);
    localStorage.setItem('continueWatching', JSON.stringify(updated));
  };

  if (movies.length === 0) return null;

  return (
    <div className="continue">
      <h2 className="continue__title">▶ Continue Watching</h2>
      <div className="continue__posters">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="continue__card"
            onClick={() => navigate(`/watch/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title || movie.name}
              className="continue__poster"
            />
            <div className="continue__overlay">
              <span className="continue__play">▶</span>
              <button
                className="continue__remove"
                onClick={(e) => handleRemove(e, movie.id)}
              >
                ✕
              </button>
            </div>
            <p className="continue__name">
              {movie.title || movie.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContinueWatching;