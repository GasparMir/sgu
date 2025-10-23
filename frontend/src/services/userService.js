const API_HOST = import.meta.env.VITE_API_HOST ?? 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT ?? '8080';
const API_BASE = (import.meta.env.VITE_API_BASE ?? '').replace(/\/$/, '');

const API_URL = `http://${API_HOST}:${API_PORT}${API_BASE}/api/users`;


export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createUser = async (user) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

export const updateUser = async (id, user) => {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

export const deleteUser = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
