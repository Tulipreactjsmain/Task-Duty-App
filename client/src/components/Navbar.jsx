import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import SideMenu from "./SideMenu";
import Loader from "../utils/Loader";
import { fetchUserData } from "../hooks/userService";
import { useState, useEffect } from "react";
import { useStore } from "../config/store";
import toast from "react-hot-toast";

export default function Navbar() {
  // const [userData, setUserData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function getUserData() {
  //     setLoading(true);
  //     try {
  //       const data = await fetchUserData();
  //       setUserData(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   getUserData();
  // }, []);

  const { userData } = useStore();

  const showToast = () => {
    toast("Please log in to access this feature.");
  };
  return (
    <>
      <>
        <div
          className="navDiv d-flex align-items-center justify-content-between px-3 px-large px-md-5 border-bottom"
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
                <div className="position-relative">
                  <Image
                    roundedCircle
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    src={userData?.profileImg}
                  />
                  <h6 className="position-absolute top-0 start-100 translate-middle fs-6">
                    <i
                      className="bi bi-emoji-neutral-fill"
                      style={{ color: "#974FD0" }}
                    ></i>
                  </h6>
                </div>
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
