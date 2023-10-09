import { Button, Modal } from "react-bootstrap";

export default function LeaveEditPage({ show, onClose, onConfirm, message }) {
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="border-0" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="color border-0">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


