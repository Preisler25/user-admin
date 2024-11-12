import React, { useState } from 'react';
import { updateUser } from '../api';

const EditUser = ({ user, onSave, onCancel }) => {
  const [email, setEmail] = useState(user.email);
  const [age, setAge] = useState(user.age);
  const [error, setError] = useState(null);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(user.id, { email, age: parseInt(age) })
      .then(() => {
        onSave(); 
        onCancel();
      })
      .catch(error => setError(error.response?.data.message || "Unknown error"));
  };

  return (
    <form onSubmit={handleSave}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditUser;
