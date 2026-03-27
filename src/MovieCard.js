import React from "react";

function MovieCard({ film }) {
  return (
    <div className="film-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
        alt={film.title}
      />
      <h3>{film.title}</h3>
      <p>Release Date: {film.release_date}</p>
      <p>Rating: {film.vote_average}</p>
    </div>
  );
}

export default MovieCard;