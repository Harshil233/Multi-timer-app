import React from "react";
import Modal from "./Modal";

export default function CompletionModal({ name, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="completion-modal">
        <h2>🎉 Congrats!</h2>
        <p>{name} completed.</p>
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
      </div>
    </Modal>
  );
}
