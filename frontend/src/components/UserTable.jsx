import React from 'react';
import { deleteUser } from '../services/userService';
import '../styles/UserPage.css';


function UserTable({ users = [], setEditingUser, setModalOpen, onUserDeleted }) {
  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Confirma que desea eliminar este usuario?')) return;
    try {
      await deleteUser(id);
      if (typeof onUserDeleted === 'function') onUserDeleted(id);
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      alert('No se pudo eliminar el usuario.');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] table-auto divide-y divide-slate-100">
        <thead className="bg-white">
          <tr>
            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Nombre</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Email</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Teléfono</th>
            <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Acciones</th>
          </tr>
        </thead>

        {/* Body with soft row hover and table card shadow */}
        <tbody className="bg-white">
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-12 text-center text-slate-500">No hay usuarios registrados</td>
            </tr>
          ) : (
            users.map((u) => {
              const id = u.id ?? u._id;
              const name = u.nombre_completo || u.fullName || u.name || '-';
              const email = u.correo_electronico || u.email || '-';
              const phone = u.telefono || u.phone || '-';
              return (
                <tr key={id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-slate-800">{name}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{email}</td>
                  <td className="px-4 py-4 text-sm text-slate-700">{phone}</td>
                  <td className="px-4 py-4 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(u)}
                      className="px-3 py-1.5 rounded-md text-sm bg-white border border-slate-200 text-sky-600 hover:bg-slate-50"
                      aria-label={`Editar ${name}`}
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(id)}
                      className="px-3 py-1.5 rounded-md text-sm bg-red-600 text-white hover:bg-red-500"
                      aria-label={`Eliminar ${name}`}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;