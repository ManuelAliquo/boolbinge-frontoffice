import { Link } from "react-router-dom";
import posterPlaceholder from "../assets/imgs/poster-placeholder.png";

export default function ContentCard({ content }) {
  const baseUrl = import.meta.env.VITE_BACKOFFICE_BASE_URL;
  const posterSrc = content.poster ? `${baseUrl}/storage/${content.poster}` : posterPlaceholder;

  return (
    <Link to={`/contents/${content.slug}`}>
      <div className="content-card card h-100 bg-dark text-light border-0 shadow">
        <img
          src={posterSrc}
          className="card-img-top card-poster-img"
          alt={content.title}
          onError={(e) => {
            e.target.src = posterPlaceholder;
          }}
        />
        <div className="card-body p-2">
          <h6 className="card-title text-truncate mb-1 text-shadow fs-6">{content.title}</h6>
          {content.rating && (
            <span className="text-warning small d-flex align-items-center">
              <i className="bi bi-star-fill me-1" />
              <span className="text-glow">{content.rating}</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
