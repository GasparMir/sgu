CREATE DATABASE IF NOT EXISTS usuariosdb;
USE usuariosdb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100),
    correo_electronico VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE INDEX idx_correo_electronico ON users(correo_electronico);
CREATE INDEX idx_telefono ON users(telefono);
