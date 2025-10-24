import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';
import { getUsers } from '../services/userService';
import '../index.css';


function UserPage() {
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        {/* Encabezado */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Gestión de Usuarios</h1>
            <p className="text-slate-500 text-sm mt-1">Administra, edita y agrega nuevos usuarios fácilmente.</p>
          </div>
          <button
            onClick={() => { setEditingUser(null); setModalOpen(true); }}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg shadow hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-300 transition-all"
          >
            <span className="text-lg">＋</span> Agregar Usuario
          </button>
        </div>

        {/* Tabla */}
        <UserTable
          users={users}
          setEditingUser={setEditingUser}
          setModalOpen={setModalOpen}
          onUserDeleted={() => fetchUsers()}
        />
      </div>

      {/* Modal */}
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

export default UserPage;
