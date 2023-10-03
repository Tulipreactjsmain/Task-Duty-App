import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div
        className="navDiv d-flex align-items-center justify-content-between px-3 px-large px-md-5 border-bottom"
        style={{ height: "93px" }}
      >
        <NavLink
          to="/"
          className="d-flex gap-2 justify-content-center align-items-center "
        >
          <Image style={{height:"41px",}} src="https://res.cloudinary.com/techbro/image/upload/v1696322350/Task%20Duty/Group_1_l4ydlp.png" />
          <span
          className="logoName d-none d-lg-block"
            style={{ fontWeight: "600", color: "#2D0050" }}
          >
            TaskDuty
          </span>
        </NavLink>
        <div className="d-flex gap-4 justify-content-center align-items-center">
          <NavLink className="fw-500 fs-5 text-black d-none d-lg-block">New Task</NavLink>
          <NavLink className="fw-500 fs-5 text-black  d-none d-lg-block">All Tasks</NavLink>
          <NavLink>
            <i className="bi bi-person-circle fs-3 text-black"></i>
          </NavLink>
        </div>
      </div>
    </>
  );
}
