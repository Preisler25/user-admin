import React, { useState } from 'react';
import { uploadUserProfile, deleteUserProfile } from '../api';

const UserProfile = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      uploadUserProfile(userId, formData)
        .catch(error => setError(error.response?.data.message || "Unknown error"));
    }
  };

  const handleDelete = () => {
    deleteUserProfile(userId)
      .catch(error => setError(error.response?.data.message || "Unknown error"));
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Profile Picture</button>
      <button onClick={handleDelete}>Delete Profile Picture</button>
    </div>
  );
};

export default UserProfile;
