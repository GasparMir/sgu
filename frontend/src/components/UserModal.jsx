import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/userService';

function UserModal({ isOpen, onClose, editingUser, refreshUsers }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingUser) {
      setFullName(editingUser.fullName);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
    } else {
      setFullName('');
      setEmail('');
      setPhone('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await updateUser(editingUser.id, { fullName, email, phone });
    } else {
      await createUser({ fullName, email, phone });
    }
    refreshUsers();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
        <input placeholder="Nombre completo" value={fullName} onChange={e => setFullName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Teléfono" value={phone} onChange={e => setPhone(e.target.value)} />
        <button type="submit">Guardar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
}

export default UserModal;
