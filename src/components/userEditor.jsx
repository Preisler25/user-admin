import React, { useEffect, useState } from "react";
import {
  updateUser,
  fetchUserById,
  uploadUserProfile,
  deleteUserProfile,
} from "../services/api";

const UserEditor = ({ user_id, onCancel, onSave }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");

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
    setFileName(e.target.files[0].name);
  };

  const handelFileDelet = async () => {
    await deleteUserProfile(user.id);
    onSave();
    onCancel();
    setFile(null);
    setFileName("");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        await uploadUserProfile(user.id, file);
        setFile(null);
        setFileName("");
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
        <div className="v-inp">
          <label htmlFor="email">email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="age">age:</label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      
        <label id="file-label" htmlFor="file">Uploda file</label>
        {file && <img className="disp-img" src={URL.createObjectURL(file)} alt="profile" />}
        <div id="file-name-disp">{fileName}</div>
        <input id="file" type="file" onChange={handleFileChange} />
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" onClick={handelFileDelet}>
            Delet Profile Picture
          </button>
        </div>
        </div>   
      </form>
    </div>
  );
};

export default UserEditor;
