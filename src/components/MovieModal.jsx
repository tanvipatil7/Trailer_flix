import { useEffect, useState } from "react";
import axios from "../utils/axios";
import "../index.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function MovieModal({ movie, onClose }) {
  const [trailerKey, setTrailerKey] = useState(null);
   
  useEffect(() => {
    if (!movie) return;

    async function fetchTrailer() {
      try {
        const res = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
        );

        const trailer = res.data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error("Trailer fetch error:", error);
      }
    }

    fetchTrailer();
  }, [movie]);
   useEffect(() => {
  if (!movie) return;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [movie, onClose]);

  if (!movie) return null;

  return (
  <div className="modal__overlay" onClick={onClose}>
    <div
      className="modal"
      onClick={(e) => e.stopPropagation()}
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="modal__content">
        <button className="modal__close" onClick={onClose}>
          ✖
        </button>

        <h2>{movie.title || movie.name}</h2>

        {trailerKey ? (
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No Trailer Available</p>
        )}

        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
        <p><strong>Language:</strong> {movie.original_language}</p>
      </div>
    </div>
  </div>
);

}

export default MovieModal;
