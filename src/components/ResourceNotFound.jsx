import { Link } from "react-router-dom";

export default function ResourceNotFound({
  icon = "bi-exclamation-circle",
  message = "Not found.",
  backTo = "/",
  backLabel = "",
}) {
  return (
    <div className="text-light text-center mt-5 pt-5">
      <i className={`bi ${icon} fs-1 d-block mb-3`}></i>
      <p className="fs-5">{message}</p>
      <Link to={backTo} className="btn btn-warning">
        <i className="bi bi-house-fill me-2" />
        Back to Home
      </Link>
    </div>
  );
}
