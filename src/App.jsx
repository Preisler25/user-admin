import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchUsers } from "./services/api";
import UserList from "./components/userList";
import UserCreator from "./components/userCreator";
import Nav from "./components/nav";
import UserEditor from "./components/userEditor";

function App() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUser] = useState(null);
  const [error, setError] = useState(null);

  const loadUsers = () => {
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch((error) =>
        setError(error.response?.data.message || "Unknown error")
      );
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="main_cont">
      <Nav name="User Management" />
      <div className="split_screen_cont">
        <UserList
          users={users}
          error={error}
          onUserSelected={setActiveUser}
          onUserUpdated={loadUsers}
          onUserDeleted={loadUsers}
        />
        <UserCreator onUserAdded={loadUsers} />
        {activeUserId != null && (
          <UserEditor user_id={activeUserId} onSave={loadUsers} />
        )}
      </div>
    </div>
  );
}

export default App;
