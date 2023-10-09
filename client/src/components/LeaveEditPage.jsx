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
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


// import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
// import CustomConfirmationModal from "./CustomConfirmationModal";

// export default function UpdateTask() {
//   const history = useHistory();
//   const [showConfirmationModal, setShowConfirmationModal] = useState(false);

//   const handleConfirm = () => {
//     // Perform the action you want to confirm (e.g., navigating away)
//     history.push("/some-other-route");
//   };

//   return (
//     <div>
//       {/* Your update task content here */}
//       <button
//         onClick={() => setShowConfirmationModal(true)}
//         className="btn btn-danger"
//       >
//         Leave Page
//       </button>

//       <CustomConfirmationModal
//         show={showConfirmationModal}
//         onClose={() => setShowConfirmationModal(false)}
//         onConfirm={handleConfirm}
//         message="Are you sure you want to leave this page? Your changes may not be saved."
//       />
//     </div>
//   );
// }
