import React, { useState } from 'react';
import { deleteUser } from '../api';
import EditUser from './userEditor';

const UserList = ({ users, error, onUserUpdated, onUserDeleted }) => {
  const [editingUserId, setEditingUserId] = useState(null);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => onUserDeleted())
      .catch(error => console.error(error.response?.data.message || "Unknown error"));
  };

  const handleEditClick = (id) => {
    setEditingUserId(id);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.id}</p>
            <img src={`http://localhost:3000/users/${user.id}/profile`} alt="Profile" width="50" />
            {editingUserId === user.id ? (
              <EditUser user={user} onSave={onUserUpdated} onCancel={handleCancelEdit} />
            ) : (
              <>
                <span>{user.email} ({user.age} years)</span>
                <button onClick={() => handleEditClick(user.id)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
