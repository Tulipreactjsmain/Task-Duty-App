import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useStore } from "../config/store";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FiSettings } from "react-icons/fi";
import { AiOutlinePoweroff } from "react-icons/ai";
import Settings from "./Settings";

export default function SideMenu({ name, ...props }) {
  const [show, setShow] = useState(false);
  const { userData, handleLogout, setShowSettingsModal, showSettingsModal } =
    useStore();

  const handleClose = () => {
    setShow(false);
    setShowSettingsModal(false);
  };

  const handleShow = () => setShow(true);

  const handleSettingsClick = () => {
    setShowSettingsModal(true);
  };

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
        style={{width:"100%"}}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Manage</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column gap-3 text-black">
          <div>
            <Button
              className="text-black w-100 m-0 px-0 bg-body border-0 d-flex justify-content-between align-items-center"
              onClick={handleSettingsClick}
            >
              <div className=""> Settings</div>
              <FiSettings className="fs-4" />
            </Button>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              onClick={() => handleLogout()}
              className="text-black w-100 m-0 px-0 bg-body border-0 d-flex justify-content-between align-items-center"
            >
              <div>Logout</div>
              <AiOutlinePoweroff className="fs-4" />
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Settings show={showSettingsModal} onHide={handleClose} />
    </>
  );
}
