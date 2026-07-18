import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DefaultLayout() {
  const [genres, setGenres] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeSearch = () => setIsSearchOpen(false);

  const handleDocumentClick = () => {
    if (isSearchOpen) closeSearch();
  };

  // DATA FETCH
  useEffect(() => {
    setLoading(true);
    // requests counter
    let completedRequests = 0;
    const checkCompletion = () => {
      completedRequests++;
      if (completedRequests === 3) setLoading(false);
    };

    // genres
    axios
      .get(`${apiUrl}/genres`)
      .then((res) => {
        setGenres(res.data.data);
        checkCompletion();
      })
      .catch((error) => {
        console.error("Genres fetch Error:", error);
        checkCompletion();
      });

    // performers
    axios
      .get(`${apiUrl}/performers`)
      .then((res) => {
        setPerformers(res.data.data);
        checkCompletion();
      })
      .catch((error) => {
        console.error("Performers fetch Error:", error);
        checkCompletion();
      });

    // contents
    axios
      .get(`${apiUrl}/contents`)
      .then((res) => {
        setContents(res.data.data);
        checkCompletion();
      })
      .catch((error) => {
        console.error("Content fetch Error:", error);
        checkCompletion();
      });
  }, [apiUrl]);

  // search
  const formSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.search.value?.trim();

    if (query) {
      navigate(`/search?query=${query}`);
      e.currentTarget.reset();
      closeSearch();
    }
  };

  return (
    <>
      <header>
        <Navbar
          isSearchOpen={isSearchOpen}
          toggleSearch={toggleSearch}
          formSubmit={formSubmit}
          genres={genres}
        />
      </header>

      <main className="container-fluid px-3" onClick={handleDocumentClick}>
        {loading ? (
          <div className="text-center mt-5 pt-5">
            <div className="spinner-grow text-black" role="status"></div>
          </div>
        ) : (
          <Outlet context={{ genres, performers, contents }} />
        )}
      </main>

      {isSearchOpen && <div className="search-overlay" onClick={closeSearch} />}
    </>
  );
}
