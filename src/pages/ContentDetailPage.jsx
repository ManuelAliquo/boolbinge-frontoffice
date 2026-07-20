import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import performerPlaceholder from "../assets/imgs/performer-placeholder.png";

export default function ContentDetailPage() {
  const { slug } = useParams();
  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;
  const baseUrl = import.meta.env.VITE_BACKOFFICE_BASE_URL;

  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/contents/${slug}`)
      .then((res) => {
        setContent(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Content fetch error:", error);
        setLoading(false);
      });
  }, [slug, apiUrl]);

  // trailer ID
  const getYoutubeId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/,
    );
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 mb-5 pb-5">
        <div className="spinner-grow text-warning" role="status"></div>
      </div>
    );
  }

  return (
    <>
      {/* background */}
      <img
        className="detail-background"
        src={`${baseUrl}/storage/${content.background}`}
        alt="background"
      />
      <div className="content-detail my-4 px-md-2">
        <div className="row mt-md-5 px-sm-2">
          <div className="col">
            {/* logo */}
            {content.logo ? (
              <img
                src={`${baseUrl}/storage/${content.logo}`}
                className="detail-logo mb-5"
                alt={content.title}
              />
            ) : (
              <h1 className="display-1 fw-bold mb-3">{content.title}</h1>
            )}
            {/* rating - year - production - length */}
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              {content.rating && (
                <span className="badge bg-warning text-dark fs-6">
                  <i className="bi bi-star-fill me-1" />
                  {content.rating}
                </span>
              )}
              {content.production && <span className="fs-5">{content.production}</span>}
            </div>
            <div className="ms-1 fs-5">
              {content.length && <span>{content.length} • </span>}
              <span>{content.release_year}</span>
              {content.end_year && <span> - {content.end_year}</span>}
            </div>
            {/* genres */}
            {content.genres && content.genres.length > 0 && (
              <div className="d-flex flex-wrap gap-2 mt-3">
                {content.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genres/${genre.slug}`}
                    className="genre-badge badge fs-6 bg-dark bg-opacity-50 text-light px-3 py-2"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4 px-2">
          {/* long description */}
          <div className="col-12 col-sm-10 col-md-8 bg-dark bg-opacity-50 rounded-3 shadow-md d-flex align-items-center p-3">
            {content.long_description && (
              <p className="text-light m-0">{content.long_description}</p>
            )}
          </div>
        </div>
        <div className="row mt-3 px-2 g-4">
          {/* trailer */}
          {content.trailer && getYoutubeId(content.trailer) && (
            <div className="col-12 col-md-8">
              <h3 className="border-bottom border-secondary pb-2 mb-3 text-shadow">
                <i className="bi bi-play-circle-fill text-warning me-2" />
                Watch Trailer
              </h3>
              <div className="ratio ratio-16x9 shadow-lg rounded-3 overflow-hidden trailer-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${getYoutubeId(content.trailer)}`}
                  title={`${content.title} trailer`}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          {/* performers */}
          {content.performers && content.performers.length > 0 && (
            <div className="col-12 col-md-4">
              <h3 className="border-bottom border-secondary pb-2 mb-3 text-shadow">
                <i className="bi bi-people-fill text-warning me-2" />
                Cast
              </h3>
              <div className="row row-cols-3 row-cols-md-2 row-cols-lg-3 g-2">
                {content.performers.map((performer) => (
                  <div key={performer.id} className="col">
                    <Link to={`/performers/${performer.slug}`}>
                      <div className="performer-card card bg-dark rounded-4 text-light border-0 h-100 bg-opacity-50">
                        <div className="card-img pt-2 px-2">
                          <img
                            src={
                              performer.picture
                                ? `${baseUrl}/storage/${performer.picture}`
                                : performerPlaceholder
                            }
                            className="card-img-top performer-img rounded-circle"
                            alt={performer.name}
                            onError={(e) => (e.target.src = performerPlaceholder)}
                          />
                        </div>
                        <span className="mt-2 card-text small text-center">{performer.name}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
