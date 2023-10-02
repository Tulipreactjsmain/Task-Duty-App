import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div
        className="navDiv d-flex align-items-center justify-content-between px-5 border-bottom"
        style={{ height: "93px" }}
      >
        <NavLink
          to="/"
          className="d-flex gap-2 justify-content-center align-items-center"
        >
          <Image src="https://res.cloudinary.com/techbro/image/upload/v1696279498/Task%20Duty/logo_pshjts.png" />{" "}
          <span
            style={{ fontWeight: "600", fontSize: "27.37px", color: "#2D0050" }}
          >
            TaskDuty
          </span>
        </NavLink>
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <NavLink className="fw-500 fs-5 text-black">New Task</NavLink>
          <NavLink className="fw-500 fs-5 text-black">All Tasks</NavLink>
          <NavLink>
            <i className="bi bi-person-circle fs-3 text-black"></i>
          </NavLink>
        </div>
      </div>
    </>
  );
}
