import React, { useEffect, useState } from 'react';
import { fetchUsers } from './api';
import CreateUser from './components/userCreator';
import UserList from './components/userList';

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const loadUsers = () => {
    fetchUsers()
      .then(response => setUsers(response.data))
      .catch(error => setError(error.response?.data.message || "Unknown error"));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <h1>User Administration</h1>
      <CreateUser onUserAdded={loadUsers} />
      <UserList users={users} error={error} onUserUpdated={loadUsers} onUserDeleted={loadUsers} />
    </div>
  );
}

export default App;
