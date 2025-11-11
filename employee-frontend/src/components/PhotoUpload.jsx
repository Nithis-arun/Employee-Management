import React, { useState } from 'react';
import '../styles/PhotoUpload.css';

export default function PhotoUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && onUpload) onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <input
        type="file"
        accept="image/*"
        className="upload-input"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <div className="upload-actions">
        <button
          type="submit"
          disabled={!file}
          className="upload-button"
        >
          Upload
        </button>
      </div>
    </form>
  );
}
