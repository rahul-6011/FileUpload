import React, { useEffect, useState } from 'react';
import './FileList.css';

const FileList = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/files")
      .then(res => res.json())
      .then(data => {
        setFiles(data);
      })
      .catch(err => console.error("Failed to fetch files", err));
  }, []);

  return (
    <div className="file-list-container">
      <h2 className="file-list-title">Uploaded Files</h2>
      <ul className="file-list">
        {files.map(file => (
          <li key={file.id} className="file-item">
            <span className="file-name">{file.originalname}</span>
            <div className="file-actions">
              <a
                href={`http://localhost:5000/view/${file.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="view-button"
              >
                View
              </a>
              <a
                href={`http://localhost:5000/download/${file.id}`}
                className="download-button"
              >
                Download
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
