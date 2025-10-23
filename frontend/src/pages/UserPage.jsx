import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import { getUsers } from '../services/userService';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <button onClick={() => { setEditingUser(null); setModalOpen(true); }}>+ Agregar Usuario</button>
      <UserTable users={users} setEditingUser={setEditingUser} setModalOpen={setModalOpen} />
      {modalOpen && (
        <UserModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          editingUser={editingUser}
          refreshUsers={fetchUsers}
        />
      )}
    </div>
  );
}

export default UsersPage;
