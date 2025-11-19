-- =============================================
-- CREACIÓN DE BASE DE DATOS
-- =============================================
DROP DATABASE IF EXISTS mediaid;
CREATE DATABASE mediaid OWNER usr_mediaid;
\c mediaid;

GRANT ALL PRIVILEGES ON SCHEMA public TO usr_mediaid;
ALTER SCHEMA public OWNER TO usr_mediaid;

-- Permiso sobre el esquema
GRANT USAGE ON SCHEMA public TO usr_mediaid;

-- Permisos sobre todas las tablas existentes
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO usr_mediaid;

-- Permisos sobre todas las secuencias existentes
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO usr_mediaid;

-- Permisos sobre funciones (si tu app las usa)
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO usr_mediaid;

-- Asegurar que futuras tablas/secuencias tengan permisos automáticos
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO usr_mediaid;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO usr_mediaid;

-- =============================================
-- TABLAS DE CATÁLOGO
-- =============================================

-- Catálogo para los roles de usuario (DONANTES Y OPERADORES)
CREATE TABLE cat_roles (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL UNIQUE,
    admin BOOLEAN DEFAULT FALSE
);

-- Catálogo para los tipos de movimiento de inventario
CREATE TABLE cat_tipos_movimiento (
    id_tipo_movimiento SERIAL PRIMARY KEY,
    nombre_movimiento VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT
);

-- Catálogo para las categorías de los medicamentos
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Catálogo para los estados de una donación
CREATE TABLE cat_estados_donacion (
    id_estado_donacion SERIAL PRIMARY KEY,
    nombre_estado VARCHAR(50) NOT NULL UNIQUE
);

-- =============================================
-- TABLAS PRINCIPALES
-- =============================================

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido_paterno VARCHAR(100) NOT NULL,
    apellido_materno VARCHAR(100),
    boleta VARCHAR(20) UNIQUE NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    foto VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES cat_roles(id_rol)
);

-- Tabla de Medicamentos
CREATE TABLE medicamentos (
    id_medicamento SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre_medicamento VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_caducidad DATE,
    estado VARCHAR(50) NOT NULL DEFAULT 'ACTIVO',
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Tabla de Donaciones
CREATE TABLE donaciones (
    id_donacion SERIAL PRIMARY KEY,
    id_usuario_donante INT NOT NULL,
    id_usuario_aprueba INT,
    id_estado_donacion INT NOT NULL,
    motivo_rechazo TEXT,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_resolucion TIMESTAMP,
    FOREIGN KEY (id_usuario_donante) REFERENCES usuarios(id),
    FOREIGN KEY (id_usuario_aprueba) REFERENCES usuarios(id),
    FOREIGN KEY (id_estado_donacion) REFERENCES cat_estados_donacion(id_estado_donacion)
);

-- Tabla de detalle de donaciones
CREATE TABLE detalle_donacion (
    id_detalle_donacion SERIAL PRIMARY KEY,
    id_donacion INT NOT NULL,
    id_medicamento INT NOT NULL,
    cantidad_ofrecida INT NOT NULL,
    lote VARCHAR(100),
    fecha_caducidad_lote DATE,
    FOREIGN KEY (id_donacion) REFERENCES donaciones(id_donacion),
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento)
);

-- Tabla central de movimientos de inventario
CREATE TABLE movimientos_medicamentos (
    id_movimiento SERIAL PRIMARY KEY,
    id_medicamento INT NOT NULL,
    id_tipo_movimiento INT NOT NULL,
    id_usuario_registra INT NOT NULL,
    id_detalle_donacion INT,
    cantidad INT NOT NULL,
    motivo_ajuste TEXT,
    fecha_movimiento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id_medicamento),
    FOREIGN KEY (id_tipo_movimiento) REFERENCES cat_tipos_movimiento(id_tipo_movimiento),
    FOREIGN KEY (id_usuario_registra) REFERENCES usuarios(id),
    FOREIGN KEY (id_detalle_donacion) REFERENCES detalle_donacion(id_detalle_donacion)
);

CREATE TABLE noticias(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_expiracion DATE NOT NULL,
    titulo VARCHAR(255),
    descripcion TEXT,
    activo BOOLEAN NOT NULL DEFAULT true,
    orden INT DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =============================================
-- DATOS INICIALES DE CATÁLOGOS
-- =============================================

INSERT INTO cat_roles (nombre_rol, admin) VALUES
('DOCTOR', TRUE),
('ASISTENTE', FALSE),
('ESTUDIANTE', FALSE),
('DOCENTE', FALSE),
('ADMINISTRATIVO', FALSE);

INSERT INTO cat_estados_donacion (nombre_estado) VALUES
('PENDIENTE'),
('APROBADA'),
('RECHAZADA');

INSERT INTO cat_tipos_movimiento (nombre_movimiento, descripcion) VALUES
('ENTRADA_COMPRA', 'Entrada de medicamento por compra a proveedor.'),
('ENTRADA_DONACION', 'Entrada de medicamento por donación aprobada por un Doctor.'),
('SALIDA_DISPENSACION', 'Salida de medicamento por entrega a paciente.'),
('AJUSTE_VENCIMIENTO', 'Salida de medicamento por haber alcanzado su fecha de caducidad.'),
('AJUSTE_MANUAL_POSITIVO', 'Ajuste manual para incrementar el stock.'),
('AJUSTE_MANUAL_NEGATIVO', 'Ajuste manual para decrementar el stock.');

INSERT INTO categorias (nombre_categoria, descripcion) VALUES
('Analgésicos', 'Medicamentos para aliviar el dolor.'),
('Antibióticos', 'Medicamentos para tratar infecciones bacterianas.'),
('Antihistamínicos', 'Medicamentos para alergias.');

-- =============================================
-- DATOS DE PRUEBA (MEDICAMENTOS)
-- =============================================

-- =============================================
-- DATOS DE PRUEBA (USUARIOS)
-- =============================================
-- (La contraseña debe ser un hash real en producción)
