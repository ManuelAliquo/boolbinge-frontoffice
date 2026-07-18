import { useParams, useOutletContext, Link } from "react-router-dom";
import ContentCard from "../components/ContentCard";

export default function TypePage() {
  const { type } = useParams();
  const { contents } = useOutletContext();

  const typeLabels = {
    movies: "Explore Movies",
    shows: "Explore Shows",
    anime: "Explore Anime",
  };

  const pluralToSingular = {
    movies: "movie",
    shows: "show",
    anime: "anime",
  };

  const label = typeLabels[type] || type;
  const singularType = pluralToSingular[type];

  if (!singularType) {
    return (
      <div className="text-light text-center py-5">
        <i className="bi bi-question-circle fs-1 d-block mb-3"></i>
        <p className="fs-5">Page not found.</p>
        <Link to="/" className="btn btn-warning">
          Back to Home
        </Link>
      </div>
    );
  }

  const filteredContents = contents.filter((c) => c.type === singularType);

  return (
    <div className="text-light py-4">
      <div className="border-bottom border-secondary pb-2 mb-4">
        <h2 className="m-0 fs-3">{label}</h2>
      </div>

      {filteredContents.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
          {filteredContents.map((content) => (
            <div key={content.id} className="col">
              <ContentCard content={content} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-film fs-1 d-block mb-3"></i>
          <p className="fs-5">No {label.toLowerCase()} found.</p>
        </div>
      )}
    </div>
  );
}
