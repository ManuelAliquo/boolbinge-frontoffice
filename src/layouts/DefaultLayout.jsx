import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../assets/components/Navbar";
import axios from "axios";

export default function DefaultLayout() {
  // genres set
  const [genres, setGenres] = useState([]);

  // search control
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeSearch = () => setIsSearchOpen(false);

  const handleDocumentClick = () => {
    if (isSearchOpen) closeSearch();
  };

  // genres get
  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;
  useEffect(() => {
    axios
      .get(`${apiUrl}/genres`)
      .then((res) => {
        const genres = res.data.data;
        setGenres(genres);
      })
      .catch((error) => console.error("Error:", error));
  });

  // form submit
  const formSubmit = (e) => e.preventDefault();

  return (
    <>
      {/* HEADER */}
      <header>
        <Navbar
          isSearchOpen={isSearchOpen}
          toggleSearch={toggleSearch}
          formSubmit={formSubmit}
          genres={genres}
        />
      </header>
      {/* MAIN */}
      <main className="container" onClick={handleDocumentClick}>
        <Outlet />
      </main>

      {/* overlay for search-dropdown */}
      {isSearchOpen && <div className="search-overlay" onClick={closeSearch} />}
    </>
  );
}
