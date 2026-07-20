import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  const [genres, setGenres] = useState([]);
  const [performers, setPerformers] = useState([]);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

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

  // FORM SUBMIT
  const formSubmit = (e) => {
    e.preventDefault();
    const query = e.currentTarget.search.value?.trim();
    if (query) {
      navigate(`/search?query=${query}`);
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <div className="page-wrapper d-flex flex-column min-vh-100">
        {/* HEADER */}
        <header>
          <Navbar formSubmit={formSubmit} genres={genres} />
        </header>
        {/* MAIN */}
        <main className="container-fluid px-3 flex-grow-1">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-100 mb-5 pb-5">
              <div className="spinner-grow text-warning" role="status"></div>
            </div>
          ) : (
            <Outlet context={{ genres, performers, contents }} />
          )}
        </main>
        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
