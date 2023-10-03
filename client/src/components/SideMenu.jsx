import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function SideMenu({ name, ...props }) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
     <i className="bi bi-list fs-1 text-black d-lg-none d-md-none" onClick={handleShow}></i>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end" 
        {...props}
        style={{width:"70%"}}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as a placeholder. In real life, you can have the elements you
          have chosen, like text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
