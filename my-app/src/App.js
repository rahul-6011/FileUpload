// App.jsx
import React, { useState } from 'react';
import UploadForm from './UploadFile';
import FileList from './FileList';
import './App.css';

const App = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(() => {
        alert('File uploaded successfully!');
        setRefreshKey(prev => prev + 1); // trigger file list refresh
      })
      .catch(err => {
        console.error('Upload failed:', err);
        alert('Upload failed. See console for details.');
      });
  };

  return (
    <div className="table-header">
      <UploadForm onFileUpload={handleFileUpload} />
      <FileList key={refreshKey} />
    </div>
  );
};

export default App;
