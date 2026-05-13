import { useEffect, useState } from "react";
import axios from "../utils/axios";
import YouTube from "react-youtube";
import "../index.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/trending/movie/week?api_key=${API_KEY}`
      );

      const results = request.data.results;
      const randomMovie =
        results[Math.floor(Math.random() * results.length)];

      setMovie(randomMovie);

      // 🔥 Fetch trailer
      const trailerRes = await axios.get(
        `/movie/${randomMovie.id}/videos?api_key=${API_KEY}`
      );

      const trailer = trailerRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      }
    }

    fetchData();
  }, []);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 0,
      mute: 1,
      loop: 1,
      modestbranding: 1,
    },
    
  };
  
  return (
    <header className="banner">
      {trailerKey && (
        <YouTube
          videoId={trailerKey}
          opts={opts}
          className="banner__video"
        />
      )}
        <div className="banner__fadeTop" />
        <div className="banner__fadeBottom" />
        <div className="banner__overlay">
        <div className="banner__contents">
          <h1 className="banner__title">
            {movie?.title || movie?.name}
          </h1>

          <p className="banner__description">
            {movie?.overview}
          </p>

            <div className="banner__buttons">
    <button className="banner__button">
      ▶ Play
    </button>

    <button className="banner__button banner__button--secondary">
      ℹ More Info
    </button>
  </div>


        </div>
      </div>
    </header>
  );
}

export default Banner;
