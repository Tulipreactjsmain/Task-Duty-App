import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import SideMenu from "./SideMenu";
import { useStore } from "../config/store";
import toast from "react-hot-toast";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
  const { userData } = useStore();

  const showToast = () => {
    toast("Please log in to access this feature.");
  };
  return (
    <>
      <>
        <div
          className="navDiv d-flex align-items-center justify-content-between customPadding border-bottom"
          style={{ height: "93px" }}
        >
          <NavLink
            to="/"
            className="d-flex gap-2 justify-content-center align-items-center "
          >
            <Image
              className="logo"
              style={{ height: "41px" }}
              src="https://res.cloudinary.com/techbro/image/upload/v1696322350/Task%20Duty/Group_1_l4ydlp.png"
            />
            <span
              className="logoName"
              style={{ fontWeight: "600", color: "#2D0050" }}
            >
              TaskDuty
            </span>
          </NavLink>
          <div className="d-flex gap-4 justify-content-center align-items-center">
            <NavLink
              to={userData ? `${userData.username}/tasks/create` : null}
              className="fw-500 fs-5 text-black d-none d-md-block d-lg-block opacity"
              onClick={() => {
                if (!userData) {
                  showToast();
                }
              }}
            >
              New Task
            </NavLink>
            <NavLink
              to={userData ? `${userData.username}/tasks` : null}
              className="fw-500 fs-5 text-black d-none d-md-block d-lg-block opacity"
              onClick={() => {
                if (!userData) {
                  showToast();
                }
              }}
            >
              All Tasks
            </NavLink>

            {userData ? (
              <>
                <Image
                  className="d-md-none d-lg-none"
                  roundedCircle
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                  src={userData?.profileImg}
                />
                <DropdownMenu userData={userData} />
              </>
            ) : (
              <LoginModal />
            )}
            <SideMenu />
          </div>
        </div>
      </>
    </>
  );
}
