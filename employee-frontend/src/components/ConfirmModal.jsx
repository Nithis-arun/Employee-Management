import React from 'react';
import '../styles/ConfirmModal.css';

export default function ConfirmModal({ message = 'Are you sure?', onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
          <button className="modal-delete" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
