import { useSearchParams, useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";
import ContentCard from "../components/ContentCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { contents } = useOutletContext();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(query);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) navigate(`/search?query=${trimmed}`);
  };

  if (!contents || contents.length === 0) return null;

  const hasQuery = query !== "";

  const filteredContents = hasQuery
    ? contents.filter((content) => content.title?.toLowerCase().includes(query.toLowerCase()))
    : [];

  const searchedMovies = filteredContents.filter((c) => c.type === "movie");
  const searchedShowsAnime = filteredContents.filter(
    (c) => c.type === "show" || c.type === "anime",
  );

  return (
    <div className="text-light py-4">
      {/* searchbar */}
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control bg-dark text-light border-secondary"
            type="search"
            placeholder="Search contents..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="btn btn-warning" type="submit">
            <i className="bi bi-search" />
          </button>
        </div>
      </form>
      {!hasQuery && (
        <div className="text-center py-5 mt-5">
          <i className="bi bi-search fs-1 d-block mb-3 text-warning"></i>
          <p className="fs-4 fw-semibold">What's Next?</p>
          <p className="text-light opacity-50">Find movies, shows and anime from our catalog.</p>
        </div>
      )}
      {hasQuery && (
        <>
          <h4 className="mb-4 fw-semibold text-shadow">Search results for: "{query}"</h4>
          {/* movies */}
          {searchedMovies.length > 0 && (
            <section className="mb-5">
              <div className="border-bottom border-secondary pb-2 mb-3">
                <h3 className="m-0 fs-3 text-shadow">Movies</h3>
              </div>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                {searchedMovies.map((content) => (
                  <div key={content.id} className="col">
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* shows & anime */}
          {searchedShowsAnime.length > 0 && (
            <section className="mb-5">
              <div className="border-bottom border-secondary pb-2 mb-3">
                <h3 className="m-0 fs-3 text-shadow">Shows & Anime</h3>
              </div>
              <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
                {searchedShowsAnime.map((content) => (
                  <div key={content.id} className="col">
                    <ContentCard content={content} />
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* 0 results */}
          {filteredContents.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-exclamation-circle fs-1 d-block mb-3"></i>
              <p className="fs-5">No results found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
