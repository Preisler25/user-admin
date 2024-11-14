import React, { useEffect, useState } from "react";
import { updateUser, fetchUserById, uploadUserProfile } from "../services/api";

const UserEditor = ({ user_id, onCancel, onSave }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchUserById(user_id)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setEmail(userData.email);
        setAge(userData.age);
      })
      .catch((error) =>
        setError(error.response?.data.message || "Unknown error")
      );
  }, [user_id]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        await uploadUserProfile(user.id, file);
        setFile(null);
      }
      await updateUser(user.id, { email, age: parseInt(age) });
      onSave();
      onCancel();
    } catch (error) {
      console.log(error);
      setError(error.response?.data.message || "Unknown error");
    }
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
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserEditor;
