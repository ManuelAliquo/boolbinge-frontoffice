import { useParams, useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ContentCard from "../components/ContentCard";

export default function GenrePage() {
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;

  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/genres/${slug}`)
      .then((res) => {
        setGenre(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Genre fetch error:", error);
        setLoading(false);
      });
  }, [slug, apiUrl]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 mb-5 pb-5">
        <div className="pb-5 mb-5">
          <div className="spinner-grow text-warning" role="status"></div>
        </div>
      </div>
    );
  }

  if (!genre) {
    return (
      <div className="text-light text-center py-5">
        <i className="bi bi-exclamation-circle fs-1 d-block mb-3"></i>
        <p className="fs-5">Genre not found.</p>
        <Link to="/" className="btn btn-warning">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="text-light py-4">
      <div className="border-bottom border-secondary pb-2 mb-4">
        <h2 className="display-5 ms-1 mb-0">{genre.name}</h2>
        {genre.description && (
          <p className="mx-1 mb-2 text-light opacity-75">{genre.description}</p>
        )}
      </div>
      {genre.contents && genre.contents.length > 0 ? (
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
          {genre.contents.map((content) => (
            <div key={content.id} className="col">
              <ContentCard content={content} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="bi bi-camera-reels fs-1 d-block mb-3"></i>
          <p className="fs-5">No contents found for this genre.</p>
        </div>
      )}
    </div>
  );
}
