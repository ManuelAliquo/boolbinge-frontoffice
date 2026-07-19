import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function DefaultLayout() {
  // data states
  const [genres, setGenres] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [contents, setContents] = useState([]);
  // loading state
  const [loading, setLoading] = useState(true);
  // searchbar state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  // search control
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeSearch = () => setIsSearchOpen(false);
  const handleDocumentClick = () => {
    if (isSearchOpen) closeSearch();
  };

  // DATA FETCH
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get(`${apiUrl}/genres`),
      axios.get(`${apiUrl}/performers`),
      axios.get(`${apiUrl}/contents`),
    ])
      .then(([genresRes, performersRes, contentsRes]) => {
        setGenres(genresRes.data.data);
        setPerformers(performersRes.data.data);
        setContents(contentsRes.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
        setLoading(false);
      });
  }, [apiUrl]);

  // search query
  const formSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.search.value?.trim();
    if (query && query !== "") {
      navigate(`/search?query=${query}`);
      e.currentTarget.reset();
      closeSearch();
    }
  };

  return (
    <>
      <header className="sticky-top">
        <Navbar
          isSearchOpen={isSearchOpen}
          toggleSearch={toggleSearch}
          formSubmit={formSubmit}
          genres={genres}
        />
      </header>
      <main className="container-fluid px-3" onClick={handleDocumentClick}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center vh-100 mb-5 pb-5">
            <div className="pb-5 mb-5">
              <div className="spinner-grow text-warning" role="status"></div>
            </div>
          </div>
        ) : (
          <Outlet context={{ genres, performers, contents }} />
        )}
      </main>
      {isSearchOpen && <div className="search-overlay" onClick={closeSearch} />}
    </>
  );
}
