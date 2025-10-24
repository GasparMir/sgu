import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../services/userService';
import '../index.css';


function UserModal({ isOpen, onClose, editingUser, refreshUsers }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingUser) {
      setFullName(editingUser.nombre_completo || editingUser.fullName || '');
      setEmail(editingUser.correo_electronico || editingUser.email || '');
      setPhone(editingUser.telefono || editingUser.phone || '');
    } else {
      setFullName('');
      setEmail('');
      setPhone('');
    }
  }, [editingUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id ?? editingUser._id, {
          nombre_completo: fullName,
          correo_electronico: email,
          telefono: phone,
        });
      } else {
        await createUser({
          nombre_completo: fullName,
          correo_electronico: email,
          telefono: phone,
        });
      }
      refreshUsers?.();
      onClose();
    } catch (err) {
      console.error('Error guardando usuario:', err);
      alert('Ocurrió un error al guardar el usuario.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">{editingUser ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
              <p className="text-sm text-slate-500 mt-1">{editingUser ? 'Modifica los datos y guarda.' : 'Rellena los datos del usuario.'}</p>
            </div>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 rounded-md p-1" aria-label="Cerrar">
              ×
            </button>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4">
            <label className="block">
              <span className="text-sm text-slate-600">Nombre completo</span>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="Nombre completo"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-600">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="correo@dominio.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-slate-600">Teléfono</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                placeholder="+34 600 000 000"
              />
            </label>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-500">
              {editingUser ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;