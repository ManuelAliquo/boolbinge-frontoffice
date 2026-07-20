import { Link } from "react-router-dom";

export default function Hero({ content }) {
  const baseUrl = import.meta.env.VITE_BACKOFFICE_BASE_URL;

  return (
    <Link to={`/contents/${content.slug}`}>
      <div className="position-relative bg-dark rounded-4 overflow-hidden shadow mb-4 hero-card">
        <img
          src={`${baseUrl}/storage/${content.background}`}
          className="d-block w-100 hero-img object-fit-cover"
          alt={content.title}
          loading="lazy"
        />
        <div className="carousel-caption d-flex flex-column align-items-start justify-content-center text-start start-0 bottom-0 top-0 p-3 p-sm-4 p-md-5 col-12 col-sm-10 col-md-6">
          {content.logo ? (
            <img
              src={`${baseUrl}/storage/${content.logo}`}
              className="img-fluid mb-2 mb-sm-3 hero-logo object-fit-contain"
              alt={content.title}
              loading="lazy"
            />
          ) : (
            <h2 className="display-6 display-md-5 fw-bold mb-2 mb-sm-3">{content.title}</h2>
          )}
          {content.short_description && (
            <p className="text-light opacity-75 mb-3 mb-sm-4 small text-shadow">
              {content.short_description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
