import React, { useState } from 'react';
import { createUser } from '../api';

const CreateUser = ({ onUserAdded }) => {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, parseInt(age))
      .then(() => {
        setEmail('');
        setAge('');
        onUserAdded(); 
      })
      .catch(error => setError(error.response?.data.message || "Unknown error"));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
      <button type="submit">Add User</button>
    </form>
  );
};

export default CreateUser;
