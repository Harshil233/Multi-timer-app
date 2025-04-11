import React from "react";
import Modal from "./Modal";

export default function HalfwayModal({ name, progress, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="halfway-modal">
        <h2>⏱️ Halfway Point</h2>
        <p>You're halfway through {name}!</p>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </Modal>
  );
}
