import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useStore } from "../config/store";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";

export default function SideMenu({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userData, handleLogout } = useStore();
  return (
    <>
      {userData && (
        <i
          className="bi bi-list fs-1 text-black d-lg-none d-md-none"
          onClick={handleShow}
        ></i>
      )}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        {...props}
        style={{
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Manage</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column gap-3 text-black">
          <div className="d-flex justify-content-between align-items-center">
            <NavLink className="text-black" href="/profile">
              Profile
            </NavLink>
            <CgProfile className="fs-4" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <NavLink className="text-black" href="/settings">
              Settings
            </NavLink>
            <FiSettings className="fs-4" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <NavLink className="text-black" href="/logout">
              Logout
            </NavLink>
            <AiOutlinePoweroff className="fs-4" />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
