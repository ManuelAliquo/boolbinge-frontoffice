import { useSearchParams, Link, useOutletContext } from "react-router-dom";

export default function Searchpage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const { contents } = useOutletContext();

  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;
  const baseUrl = import.meta.env.VITE_BACKOFFICE_BASE_URL;

  // search filters
  const filteredContents = contents.filter((content) =>
    content.title?.toLowerCase().includes(query.toLowerCase()),
  );
  const searchedMovies = filteredContents.filter((content) => content.type === "movie");
  const searchedShowsAnime = filteredContents.filter(
    (content) => content.type === "show" || content.type === "anime",
  );

  return (
    <div className="text-light py-4">
      <h4 className="mb-4 fw-semibold">Search results for: "{query}"</h4>
      {/* MOVIES */}
      {searchedMovies.length > 0 && (
        <section className="mb-5">
          <div className="border-bottom border-secondary pb-2 mb-3">
            <h3 className="m-0 fs-4">Movies</h3>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {searchedMovies.map((content) => (
              <div key={content.id} className="col">
                <Link to={`/contents/${content.slug}`} className="text-decoration-none">
                  <div className="card h-100 bg-dark text-light border-secondary shadow-sm">
                    <img
                      src={`${baseUrl}/storage/${content.poster}`}
                      className="card-img-top card-poster-img"
                      alt={content.title}
                      onError={(e) => (e.target.src = "../assets/imgs/poster-placeholder.png")}
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate mb-1 fs-6">{content.title}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        {content.rating && (
                          <span className="text-warning small d-flex align-items-center">
                            <i className="bi bi-star-fill me-1"></i> {content.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* SHOWS & ANIME */}
      {searchedShowsAnime.length > 0 && (
        <section className="mb-5">
          <div className="border-bottom border-secondary pb-2 mb-3">
            <h3 className="m-0 fs-4">Shows & Anime</h3>
          </div>
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
            {searchedShowsAnime.map((content) => (
              <div key={content.id} className="col">
                <Link to={`/contents/${content.slug}`} className="text-decoration-none">
                  <div className="card h-100 bg-dark text-light border-secondary shadow-sm">
                    <img
                      src={`${baseUrl}/storage/${content.poster}`}
                      className="card-img-top card-poster-img"
                      alt={content.title}
                      onError={(e) => (e.target.src = "../assets/imgs/poster-placeholder.png")}
                    />
                    <div className="card-body p-2">
                      <h6 className="card-title text-truncate mb-1 fs-6">{content.title}</h6>
                      <div className="d-flex justify-content-between align-items-center">
                        {content.rating && (
                          <span className="text-warning small d-flex align-items-center">
                            <i className="bi bi-star-fill me-1"></i> {content.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
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
    </div>
  );
}
