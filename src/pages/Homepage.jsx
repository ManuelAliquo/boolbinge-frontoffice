import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Homepage() {
  const { contents, genres } = useOutletContext();

  const apiUrl = import.meta.env.VITE_BACKOFFICE_API_URL;
  const baseUrl = import.meta.env.VITE_BACKOFFICE_BASE_URL;

  const [featuredContent, setFeaturedContent] = useState(null);
  const [randomGenres, setRandomGenres] = useState([]);

  useEffect(() => {
    // featured
    if (contents.length > 0) {
      const contentsWithBackground = contents.filter((content) => content.background);
      if (contentsWithBackground.length > 0) {
        const randomIndex = Math.floor(Math.random() * contentsWithBackground.length);
        setFeaturedContent(contentsWithBackground[randomIndex]);
      } else setFeaturedContent(null);
    }

    // 3 random genres
    if (genres.length > 0 && contents.length > 0) {
      const genresWithContents = genres.filter((genre) =>
        contents.some((content) => content.genres?.some((g) => g.id === genre.id)),
      );
      const shuffledGenres = [...genresWithContents].sort(() => 0.5 - Math.random());
      setRandomGenres(shuffledGenres.slice(0, 3));
    }
  }, [contents, genres]);

  const getContentsByGenre = (genreId) =>
    contents.filter((content) => content.genres?.some((g) => g.id === genreId));

  return (
    <div className="text-light py-3">
      {/* HERO */}
      {featuredContent && (
        <div className="position-relative bg-dark rounded-4 overflow-hidden mb-5">
          <img
            src={`${baseUrl}/storage/${featuredContent.background}`}
            className="d-block w-100 hero-img object-fit-cover"
            alt={featuredContent.title}
          />
          <div className="carousel-caption d-flex flex-column align-items-start justify-content-center text-start start-0 bottom-0 top-0 p-3 p-sm-4 p-md-5 col-12 col-sm-10 col-md-6">
            {featuredContent.logo ? (
              <img
                src={`${baseUrl}/storage/${featuredContent.logo}`}
                className="img-fluid mb-2 mb-sm-3 hero-logo object-fit-contain"
                alt={featuredContent.title}
              />
            ) : (
              <h2 className="display-6 display-md-5 fw-bold mb-2 mb-sm-3">
                {featuredContent.title}
              </h2>
            )}
            <p className="text-light opacity-75 mb-3 mb-sm-4 small">
              {featuredContent.short_description}
            </p>
            <Link
              to={`/contents/${featuredContent.slug}`}
              className="btn btn-warning fw-bold px-3 px-sm-4 py-1 py-sm-2"
            >
              Info
            </Link>
          </div>
        </div>
      )}
      {/* random genres - invariate */}
      {randomGenres.map((genre) => {
        const genreContents = getContentsByGenre(genre.id);
        return (
          <section key={genre.id} className="mb-5">
            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
              <h3 className="m-0 fs-4">{genre.name}</h3>
              <Link
                to={`/genres/${genre.slug}`}
                className="text-warning text-decoration-none small"
              >
                See All <i className="bi bi-chevron-right small"></i>
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
              {genreContents.slice(0, 6).map((content) => (
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
        );
      })}
    </div>
  );
}
