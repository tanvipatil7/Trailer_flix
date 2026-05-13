import { useState } from "react";
import axios from "../utils/axios";
import Navbar from "../components/Navbar";
import Row from "../components/Row";
import Banner from "../components/Banner";
import SearchRow from "../components/SearchRow";
import MovieModal from "../components/MovieModal";
import requests from "../utils/requests";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const res = await axios.get(
      `/search/movie?api_key=${API_KEY}&query=${query}`
    );
    setResults(res.data.results);
  };

  return (
    <div className="home">
      <Navbar onSearchToggle={() => setShowSearch(!showSearch)} />

      {showSearch && (
        <SearchRow
          query={query}
          setQuery={setQuery}
          results={results}
          onSearch={handleSearch}
          onMovieClick={setSelectedMovie}
        />
      )}

      {!showSearch && (
        <>
          <Banner />
                  <Row
  title="Trending Now"
  fetchUrl={requests.fetchTrending}
  onMovieClick={setSelectedMovie}
/>

<Row
  title="Top Rated"
  fetchUrl={requests.fetchTopRated}
  onMovieClick={setSelectedMovie}
/>

<Row
  title="Action Movies"
  fetchUrl={requests.fetchActionMovies}
  onMovieClick={setSelectedMovie}
/>

<Row
  title="Comedy Movies"
  fetchUrl={requests.fetchComedyMovies}
  onMovieClick={setSelectedMovie}
/>

                </>
      )}

      {/* ✅ MOVE MODAL INSIDE RETURN */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Home;
