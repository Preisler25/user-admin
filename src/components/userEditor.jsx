import React, { useState } from "react";
import { updateUser, fetchUserById } from "../services/api";

const UserEditor = async ({ user_id, onSave }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [age, setAge] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserById(user_id)
      .then((response) => setUser(response.data))
      .catch((error) =>
        setError(error.response?.data.message || "Unknown error")
      );
    setEmail(user.email);
    setAge(user.age);
  }, [user_id]);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(user.id, { email, age: parseInt(age) })
      .then(() => {
        onSave();
        onCancel();
      })
      .catch((error) =>
        setError(error.response?.data.message || "Unknown error")
      );
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSave}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserEditor;
