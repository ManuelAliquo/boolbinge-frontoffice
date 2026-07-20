import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "../components/ContentCard";
import performerPlaceholder from "../assets/imgs/performer-placeholder.png";

export default function PerformerPage() {
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;
  const baseUrl = import.meta.env.VITE_BACKOFFICE_BASE_URL;

  const [performer, setPerformer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/performers/${slug}`)
      .then((res) => {
        setPerformer(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Performer fetch error:", error);
        setLoading(false);
      });
  }, [slug, apiUrl]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 mb-5 pb-5">
        <div className="spinner-grow text-warning" role="status"></div>
      </div>
    );
  }

  if (!performer) {
    return (
      <div className="text-light text-center py-5">
        <i className="bi bi-exclamation-circle fs-1 d-block mb-3" />
        <p className="fs-5">Performer not found.</p>
        <Link to="/" className="btn btn-warning">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="text-light py-4 px-sm-1">
      {/* header */}
      <div className="d-flex align-items-center gap-3 mb-4 border-bottom border-secondary pb-3">
        <img
          src={performer.picture ? `${baseUrl}/storage/${performer.picture}` : performerPlaceholder}
          className="rounded-3 performer-header-img shadow"
          alt={performer.name}
          onError={(e) => (e.target.src = performerPlaceholder)}
        />
        <h2 className="display-5 text-shadow mb-0">{performer.name}</h2>
      </div>
      {/* info */}
      {performer.contents && performer.contents.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
          {performer.contents.map((content) => (
            <div key={content.id} className="col">
              <ContentCard content={content} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-person fs-1 d-block mb-3" />
          <p className="fs-5">No contents found for this performer.</p>
        </div>
      )}
    </div>
  );
}
