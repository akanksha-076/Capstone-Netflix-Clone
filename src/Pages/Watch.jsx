import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Watch.css';

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trailer, setTrailer] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    ).then((response) => {
      const trailerData = response.data.results.find(
        (vid) => vid.type === 'Trailer' && vid.site === 'YouTube'
      );
      setTrailer(trailerData);
    });

    axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    ).then((response) => {
      setMovieDetails(response.data);
    });
  }, [id, API_KEY]);

  return (
    <div className="watch">
      <div className="watch__nav">
        <button className="watch__back" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        <h2 className="watch__title">
          {movieDetails?.title || movieDetails?.name}
        </h2>
      </div>

      <div className="watch__player">
        {trailer ? (
          <iframe
            className="watch__iframe"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title="Movie Trailer"
            allowFullScreen
            allow="autoplay"
          />
        ) : (
          <div className="watch__notrailer">
            <h2>No trailer available for this movie</h2>
            <button onClick={() => navigate('/')}>Go Back</button>
          </div>
        )}
      </div>

      {movieDetails && (
        <div className="watch__details">
          <h1>{movieDetails.title}</h1>
          <div className="watch__info">
            <span className="watch__rating">
              ⭐ {movieDetails.vote_average?.toFixed(1)}
            </span>
            <span className="watch__year">
              📅 {movieDetails.release_date?.split('-')[0]}
            </span>
            <span className="watch__runtime">
              ⏱ {movieDetails.runtime} mins
            </span>
          </div>
          <p className="watch__overview">{movieDetails.overview}</p>
          <div className="watch__genres">
            {movieDetails.genres?.map((genre) => (
              <span key={genre.id} className="watch__genre">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Watch;