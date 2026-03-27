import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";

const TMDB_KEY = "fdf48c727d8739cdd310025a2a6e8310";

function App() {
  const [activePage, setActivePage] = useState(1);
  const [filmResults, setFilmResults] = useState([]);
  const [maxPages, setMaxPages] = useState(0);
  const [typedSearch, setTypedSearch] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    loadFilms(activePage);
  }, [activePage, typedSearch]);

  async function loadFilms(pageNumber) {
    let requestUrl;

    if (typedSearch === "") {
      requestUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&page=${pageNumber}`;
    } else {
      requestUrl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${typedSearch}&page=${pageNumber}`;
    }

    const apiResponse = await fetch(requestUrl);
    const apiData = await apiResponse.json();

    let movies = apiData.results || [];

    if (selectedSort === "Release_Desc") {
      movies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    if (selectedSort === "Release_Asc") {
      movies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    if (selectedSort === "Rating_Desc") {
      movies.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (selectedSort === "Rating_Asc") {
      movies.sort((a, b) => a.vote_average - b.vote_average);
    }

    setFilmResults(movies);
    setMaxPages(apiData.total_pages || 0);
  }

  function handleNext() {
    if (activePage < maxPages) {
      setActivePage(activePage + 1);
    }
  }

  function handlePrevious() {
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  }

  function handleSearch(event) {
    setTypedSearch(event.target.value);
    setActivePage(1);
  }

  function handleSort(event) {
    const sortValue = event.target.value;
    setSelectedSort(sortValue);

    let sortedMovies = [...filmResults];

    if (sortValue === "Release_Desc") {
      sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    if (sortValue === "Release_Asc") {
      sortedMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    }

    if (sortValue === "Rating_Desc") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (sortValue === "Rating_Asc") {
      sortedMovies.sort((a, b) => a.vote_average - b.vote_average);
    }

    setFilmResults(sortedMovies);
  }

  return (
    <div>
      <div className="top-banner">
        <h1>Movie Explorer</h1>

        <div className="filter-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={typedSearch}
            onChange={handleSearch}
          />

          <select value={selectedSort} onChange={handleSort}>
            <option value="">Sort By</option>
            <option value="Release_Asc">Release Date (Asc)</option>
            <option value="Release_Desc">Release Date (Desc)</option>
            <option value="Rating_Asc">Rating (Asc)</option>
            <option value="Rating_Desc">Rating (Desc)</option>
          </select>
        </div>
      </div>

      <div id="film-grid">
        {filmResults.map((film) => (
          <MovieCard key={film.id} film={film} />
        ))}
      </div>

      <div className="page-controls">
        <button onClick={handlePrevious}>Previous</button>
        <span>
          Page {activePage} of {maxPages}
        </span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default App;
