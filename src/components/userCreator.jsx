import React, { useState } from "react";
import { createUser } from "../services/api";

const UserCreator = ({ onUserAdded }) => {
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(email, parseInt(age))
      .then(() => {
        setEmail("");
        setAge("");
        onUserAdded();
      })
      .catch((error) =>
        setError(error.response?.data.message || "Unknown error")
      );
  };

  return (
    <div className="add_user_cont">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserCreator;
