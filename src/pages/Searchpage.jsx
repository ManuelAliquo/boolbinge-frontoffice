import { useSearchParams, useOutletContext } from "react-router-dom";
import ContentCard from "../components/ContentCard";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const { contents } = useOutletContext();

  if (!contents || contents.length === 0) return null;

  const filteredContents = contents.filter((content) =>
    content.title?.toLowerCase().includes(query.toLowerCase()),
  );

  const searchedMovies = filteredContents.filter((content) => content.type === "movie");
  const searchedShowsAnime = filteredContents.filter(
    (content) => content.type === "show" || content.type === "anime",
  );

  return (
    <div className="text-light py-4">
      <h4 className="ms-1 mb-4 fw-semibold">Search results for: "{query}"</h4>
      {/* movies */}
      {searchedMovies.length > 0 && (
        <section className="mb-5">
          <div className="border-bottom border-secondary pb-2 mb-3">
            <h3 className="ms-1 mb-0 fs-4">Movies</h3>
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
            <h3 className="ms-1 mb-0 fs-4">Shows & Anime</h3>
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
          <i className="bi bi-exclamation-circle fs-1 d-block mb-3" />
          <p className="fs-5">No results found matching your search.</p>
        </div>
      )}
    </div>
  );
}
