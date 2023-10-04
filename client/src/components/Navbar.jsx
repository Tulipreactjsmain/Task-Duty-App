import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";
import SideMenu from "./SideMenu";
import Loader from "../utils/Loader";
import { fetchUserData } from "../hooks/userService";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, [userData]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              <NavLink className="fw-500 fs-5 text-black d-none d-md-block d-lg-block opacity">
                New Task
              </NavLink>
              <NavLink className="fw-500 fs-5 text-black  d-none d-md-block d-lg-block opacity">
                All Tasks
              </NavLink>
              {userData ? (
                <Image
                  roundedCircle
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                  src={userData?.profileImg}
                />
              ) : (
                <LoginModal setUserData={setUserData} />
              )}

              <SideMenu />
            </div>
          </div>
        </>
      )}
    </>
  );
}
