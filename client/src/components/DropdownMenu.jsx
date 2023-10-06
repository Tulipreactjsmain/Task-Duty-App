import { logOutUser } from "../config/api";
import { Dropdown, Menu } from "antd";
import { Image } from "react-bootstrap";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import Cookies from "js-cookie";

const DropdownMenu = ({ userData }) => {

  const clearUserCookies = () => {
    Cookies.remove("connect.sid", { path: "/" });
    console.log(Cookies);
    // location.replace("/");
  };

  const handleLogout = async () => {
    try {
      const response = await logOutUser();

      if (response.status === 200) {
        toast("Logout successful.");
        clearUserCookies();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else if (key === "profile") {
    } else if (key === "settings") {
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="settings">Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["hover"]}
      className="d-flex d-none d-lg-block d-md-block justify-content-center text-danger-emphasis align-items-center"
    >
      <div>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Image
            roundedCircle
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
            src={userData?.profileImg}
          />
        </a>
      </div>
    </Dropdown>
  );
};

export default DropdownMenu;
