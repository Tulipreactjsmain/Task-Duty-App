import React, { useState } from "react";
import { useStore } from "../config/store";
import Settings from "./Settings";
import "../DropdownMenu.css";

const DropdownMenu = ({ userData }) => {
  const { handleLogout, setShowSettingsModal, showSettingsModal } = useStore();

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleClose = () => {
    setShowSettingsModal(false);
    setIsMenuVisible(false);
  };

  const handleShow = () => {
    setShowSettingsModal(true);
    setIsMenuVisible(false);
  };

  const handleMouseEnter = () => {
    setIsMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setIsMenuVisible(false);
  };

  const handleLogoutClick = () => {
    handleLogout();
    setIsMenuVisible(false);
  };

  return (
    <div
      className="dropdown-menu-container d-flex d-none d-lg-block d-md-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="profile-image">
        <img
          className="rounded-circle"
          style={{
            width: "50px",
            height: "50px",
            objectFit: "cover",
          }}
          src={userData?.profileImg}
          alt="User Profile"
          onClick={handleMouseEnter}
        />
      </div>
      {isMenuVisible && (
        <div className="dropdown-menu" style={{ fontSize: "14px" }}>
          <ul>
            <li onClick={handleShow}>Settings</li>
            <hr className="p-0 m-0" style={{ color: "#ccc" }} />
            <li onClick={handleLogoutClick}>Logout</li>
          </ul>
        </div>
      )}
      <Settings show={showSettingsModal} onHide={handleClose} />
    </div>
  );
};

export default DropdownMenu;
