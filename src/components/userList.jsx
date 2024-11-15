import React, { useState } from "react";
import { deleteUser } from "../services/api";

const UserList = ({ users, error, onUserDeleted, onUserSelected }) => {
  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => onUserDeleted())
      .catch((error) =>
        console.error(error.response?.data.message || "Unknown error")
      );
  };

  const handleEditClick = (id) => {
    console.log("handleEditClick", id);
    onUserSelected(id);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id} className="user-cont" >
            <img
              className="profile-pic"
              src={`http://localhost:3000/users/${
                user.id
              }/profile?timestamp=${new Date().getTime()}`}
              alt="Profile"
              width="50"
            />

            <span>
              {user.email} ({user.age} years)
            </span>
            <button onClick={() => handleEditClick(user.id)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
