import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchUsers } from "./services/api";
import UserList from "./components/userList";
import UserCreator from "./components/userCreator";
import Nav from "./components/nav";
import UserEditor from "./components/userEditor";

function App() {
  const [users, setUsers] = useState([]);
  const [activeUserId, setActiveUser] = useState(-1);
  const [error, setError] = useState(null);

  const loadUsers = () => {
    console.log("loadUsers");
    fetchUsers()
      .then((response) => setUsers(response.data))
      .catch((error) =>
        setError(error.response?.data.message || "Unknown error")
      );
  };

  const onCancel = () => {
    setActiveUser(-1);
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
        <div className="vertical_line">
        <UserCreator onUserAdded={loadUsers} />
        {activeUserId !== -1 && (
          <UserEditor
            user_id={activeUserId}
            onCancel={onCancel}
            onSave={loadUsers}
          />
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
