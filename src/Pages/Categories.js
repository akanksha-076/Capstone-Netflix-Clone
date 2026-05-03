import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import './Categories.css';

function Categories() {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  const genres = [
    { id: 28, name: '💥 Action' },
    { id: 35, name: '😂 Comedy' },
    { id: 27, name: '👻 Horror' },
    { id: 10749, name: '💕 Romance' },
    { id: 878, name: '🚀 Sci-Fi' },
    { id: 18, name: '🎭 Drama' },
    { id: 16, name: '🎨 Animation' },
    { id: 53, name: '😱 Thriller' },
    { id: 12, name: '🗺️ Adventure' },
    { id: 14, name: '🧙 Fantasy' },
  ];

  useEffect(() => {
    setLoading(true);
    axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}&sort_by=popularity.desc`
    ).then((response) => {
      setMovies(response.data.results);
      setLoading(false);
    });
  }, [selectedGenre, API_KEY]);

  return (
    <div className="categories">
      <Navbar />
      <div className="categories__content">
        <h1 className="categories__heading">Browse by Category</h1>

        <div className="categories__genres">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className={`categories__genre__btn ${
                selectedGenre === genre.id ? 'active' : ''
              }`}
              onClick={() => setSelectedGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="categories__loading">
            <p>Loading movies...</p>
          </div>
        ) : (
          <div className="categories__grid">
            {movies.map((movie) => (
              movie.poster_path && (
                <div
                  key={movie.id}
                  className="categories__card"
                  onClick={() => navigate(`/watch/${movie.id}`)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="categories__poster"
                  />
                  <div className="categories__card__info">
                    <h3>{movie.title}</h3>
                    <p>⭐ {movie.vote_average?.toFixed(1)}</p>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;