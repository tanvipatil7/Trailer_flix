import { useEffect, useState } from "react";
import axios from "../utils/axios";
import placeholder from "../assets/placeholder.png";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function Row({ title, fetchUrl, onMovieClick }) {

  console.log("Row rendered:", title);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  

  // ✅ Added handleWheel function
  const handleWheel = (e) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
  };

  

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters" onWheel={handleWheel}>
        {movies.map((movie) => (
          <div key={movie.id} className="row__item" onClick={() => onMovieClick(movie)}
>
            <img
              className="row__poster"
              src={placeholder}
              alt={movie.title || movie.name}
            />
            <p className="row__title">{movie.title || movie.name}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Row;
