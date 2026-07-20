import { Link } from "react-router-dom";
import smallBrand from "../assets/imgs/logo-nobackground.png";

export default function Footer() {
  return (
    <footer className="mt-auto pb-3 pt-4">
      <div className="container-fluid px-3 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-light text-decoration-none opacity-75"
        >
          <img src={smallBrand} alt="logo" loading="lazy" className="footer-logo" />
          <span className="small">BoolBinge • Manuel Aliquò • 2026</span>
        </Link>
        <div className="d-flex align-items-center gap-2">
          <Link to="/movie" className="footer-link text-light opacity-75 small">
            Movies
          </Link>
          <span className="opacity-75">•</span>
          <Link to="/show" className="footer-link text-light opacity-75 small">
            Shows
          </Link>
          <span className="opacity-75">•</span>
          <Link to="/anime" className="footer-link text-light opacity-75 small">
            Anime
          </Link>
        </div>
      </div>
    </footer>
  );
}
