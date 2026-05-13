import { useEffect, useState } from "react";
import axios from "../utils/axios";
import placeholder from "../assets/placeholder.png";

 function SearchRow({ onMovieClick }) {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      try {
        const res = await axios.get(
          `/search/movie?api_key=${API_KEY}&query=${query}`
        );

        setMovies(res.data.results);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500); // debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query, API_KEY]);

  return (
    <div className="row">
      <h2>Search Movies</h2>

      <input
        className="search__input"
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="row__posters">
        {movies.map((movie) => (
          <div
             key={movie.id}
                className="row__item"
                  onClick={() => onMovieClick(movie)}
>

            <img
              className="row__poster"
              src={placeholder}
              alt={movie.title || movie.name}
            />
            <p className="row__title">
              {movie.title || movie.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchRow;
