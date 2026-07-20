import { Link } from "react-router-dom";
import bigBrand from "../assets/imgs/brand-nobackground.png";
import smallBrand from "../assets/imgs/logo-nobackground.png";

export default function Navbar({ formSubmit, genres }) {
  return (
    <nav className="navbar pb-3">
      <div className="container-fluid">
        {/* brand */}
        <Link className="navbar-brand m-0" to="/">
          <picture>
            <source className="big-brand" srcSet={bigBrand} media="(min-width: 700px)" />
            <source className="small-brand" srcSet={smallBrand} media="(max-width: 576px)" />
            <img src={smallBrand} alt="brand" loading="lazy" />
          </picture>
        </Link>
        {/* links */}
        <ul className="list-unstyled m-0 d-flex flex-grow-1 justify-content-evenly align-items-center">
          <li className="nav-item">
            <Link className="nav-link d-flex flex-column align-items-center p-0" to="/movie">
              <i className="bi bi-film text-light fs-5" />
              <span className="text-light small d-none d-sm-inline">Movies</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex flex-column align-items-center p-0" to="/show">
              <i className="bi bi-tv text-light fs-5" />
              <span className="text-light small d-none d-sm-inline">Shows</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link d-flex flex-column align-items-center p-0" to="/anime">
              <i className="bi bi-mask text-light fs-5" />
              <span className="text-light small d-none d-sm-inline">Anime</span>
            </Link>
          </li>
          {/* genres dropdown */}
          <li className="genres-dropdown nav-item dropdown d-flex flex-column align-items-center">
            <div
              className="d-flex flex-column align-items-center dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-camera-reels text-light fs-5" />
              <span className="text-light small d-none d-sm-inline">
                Genres
                <i className="bi bi-chevron-down ms-1 small" />
              </span>
            </div>
            {/* menu */}
            <ul className="dropdown-menu p-2 mt-3">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <Link className="dropdown-item text-light small" to={`/genres/${genre.slug}`}>
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        {/* search desktop */}
        <form className="nav-search d-flex d-none d-sm-flex" role="search" onSubmit={formSubmit}>
          <div className="input-group border border-primary rounded">
            <input
              className="form-control bg-transparent border-0"
              type="search"
              name="search"
              aria-label="Search"
              placeholder="Search..."
            />
            <button className="btn btn-outline-primary border-0" type="submit">
              <i className="bi bi-search" />
            </button>
          </div>
        </form>
        {/* search mobile */}
        <div className="d-sm-none">
          <Link className="btn btn-outline-primary" to="/search">
            <i className="bi bi-search" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
