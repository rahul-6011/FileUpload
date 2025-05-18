import React, { useState } from 'react';
import './UploadFile.css';

const UploadForm = ({ onFileUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onFileUpload(selectedFile);
      setSelectedFile(null); // reset after upload
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <label className="file-input-label">
        Choose File
        <input type="file" onChange={handleChange} className="hidden-input" />
      </label>

      <span className="file-name">
        {selectedFile ? selectedFile.name : 'No file selected'}
      </span>

      <button type="submit" className="upload-button" disabled={!selectedFile}>
        Upload
      </button>
    </form>
  );
};

export default UploadForm;
