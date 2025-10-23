import React from 'react';
import { deleteUser } from '../services/userService';

function UserTable({ users, setEditingUser, setModalOpen }) {

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Confirma que desea eliminar este usuario?')) return;

    try {
      await deleteUser(id);
      if (typeof onUserDeleted === 'function') {
        onUserDeleted(id);
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.error('Error eliminando usuario:', err);
      alert('No se pudo eliminar el usuario. Revisa la consola para más detalles.');
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.fullName}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>
              <button onClick={() => handleEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
