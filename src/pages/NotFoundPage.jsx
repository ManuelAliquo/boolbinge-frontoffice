import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-light d-flex flex-column align-items-center justify-content-center text-center mt-5 pt-5">
      <h1 className="display-1 fw-bold text-warning text-glow mb-3">404</h1>
      <h2 className="display-5 mb-3">Page Not Found</h2>
      <p className="text-light opacity-50 mb-4 fs-5">The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-warning fw-bold px-4 py-2">
        <i className="bi bi-house-fill me-2" />
        Back to Home
      </Link>
    </div>
  );
}
