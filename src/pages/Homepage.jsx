import { useOutletContext, Link } from "react-router-dom";
import Hero from "../components/Hero";
import ContentCard from "../components/ContentCard";

export default function HomePage() {
  const { contents, genres } = useOutletContext();

  if (!contents || contents.length === 0) {
    return (
      <div className="text-light text-center py-5 mt-5">
        <div className="d-flex align-items-center justify-content-center gap-4 mb-3">
          <i className="bi bi-film fs-1 d-block" />
          <span>•</span>
          <i className="bi bi-tv fs-1 d-block" />
          <span>•</span>
          <i className="bi bi-mask fs-1 d-block" />
        </div>
        <p className="fs-5">No contents available yet.</p>
      </div>
    );
  }

  // featured content
  const withBackground = contents.filter((content) => content.background);
  const featuredContent =
    withBackground.length > 0
      ? withBackground[Math.floor(Math.random() * withBackground.length)]
      : null;

  // random genres
  const validGenres = genres.filter((genre) =>
    contents.some((content) => content.genres?.some((g) => g.id === genre.id)),
  );
  const shuffled = [...validGenres].sort(() => 0.5 - Math.random());
  const randomGenres = shuffled.slice(0, 3);
  const getContentsByGenre = (genreId) =>
    contents.filter((content) => content.genres?.some((g) => g.id === genreId));

  if (validGenres.length === 0) {
    return (
      <div className="text-light text-center py-5 mt-5">
        <i className="bi bi-tags fs-1 d-block mb-3" />
        <p className="fs-5">No genres available yet.</p>
      </div>
    );
  }

  return (
    <div className="text-light py-3">
      {featuredContent && <Hero content={featuredContent} />}
      <h1 className="display-4 mb-0 text-center text-glow text-warning">Discover</h1>
      {randomGenres.map((genre) => {
        const genreContents = getContentsByGenre(genre.id);
        if (genreContents.length === 0) return null;
        return (
          <section key={genre.id} className="mb-5">
            <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-2 mb-3">
              <h2 className="ms-1 mb-0 text-shadow">{genre.name}</h2>
              <Link to={`/genres/${genre.slug}`} className="text-warning small text-glow">
                See All <i className="bi bi-chevron-right small" />
              </Link>
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-3">
              {genreContents.slice(0, 6).map((content) => (
                <div key={content.id} className="col">
                  <ContentCard content={content} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
