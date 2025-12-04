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
    active BOOLEAN NOT NULL DEFAULT false,
    FOREIGN KEY (id_rol) REFERENCES cat_roles(id_rol)
);

CREATE TABLE verification_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    usuario_id BIGINT NOT NULL,
    expiration TIMESTAMP NOT NULL,
    CONSTRAINT fk_verification_token_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE password_reset_token (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL UNIQUE,
    usuario_id BIGINT NOT NULL,
    expiration TIMESTAMP NOT NULL,
    
    CONSTRAINT fk_password_reset_user
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);


-- Tabla de Medicamentos Básica
CREATE TABLE medicamentos (
    id_medicamento SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL,
    url TEXT,
    nombre_medicamento VARCHAR(255) NOT NULL,
    descripcion TEXT,
    presentacion VARCHAR(100),           -- Tableta, cápsula, jarabe, etc.
    dosis VARCHAR(50),                   -- 500 mg, 10 ml, etc.
    cantidad_stock INT DEFAULT 0,        -- Cantidad disponible
    stock_minimo INT DEFAULT 5,
    fecha_caducidad DATE,
    uso TEXT,                            -- Opcional: para qué se utiliza
    activo BOOLEAN NOT NULL DEFAULT TRUE,
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

CREATE TABLE info_cards (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT true,
    orden INT DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notificaciones (
    id SERIAL PRIMARY KEY,                           -- Autoincremental
    usuario_id INT NOT NULL REFERENCES usuarios(id), -- Relación con la tabla de usuarios
    titulo VARCHAR(255) NOT NULL,                    -- Título de la notificación
    descripcion TEXT,                                -- Descripción detallada
    tipo VARCHAR(50) DEFAULT 'INFO',                 -- Tipo de notificación: INFO, ALERTA, ERROR, ÉXITO, etc.
    url VARCHAR(255),                                -- URL opcional para redirigir al hacer clic
    leida BOOLEAN DEFAULT FALSE,                     -- Indica si el usuario ya vio la notificación
    fecha_lectura TIMESTAMP WITH TIME ZONE,         -- Fecha en que se marcó como leída
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    activo BOOLEAN DEFAULT TRUE                      -- Para mantener historial o desactivar notificaciones obsoletas
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
('Otros', 'Medicamentos o productos farmacéuticos que no entran en ninguna categoría específica.'),
('Analgésicos y antiinflamatorios', 'Medicamentos utilizados para aliviar el dolor y reducir la inflamación.'),
('Respiratorios y alergias', 'Medicamentos destinados al tratamiento de afecciones respiratorias y alergias.'),
('Gastrointestinales', 'Medicamentos que ayudan en el funcionamiento y cuidado del sistema digestivo.'),
('Vitaminas', 'Suplementos vitamínicos para complementar la nutrición diaria.'),
('Insumos y curación', 'Materiales y productos para curación y cuidado de heridas.');

INSERT INTO info_cards (icon, title, text, orden) VALUES
('📰', 'Noticias Recientes', 'Mantente al día con las últimas novedades y comunicados.', 1),
('🤝', 'Programas de Apoyo', 'Descubre los programas y campañas activas.', 2),
('❤️', 'Consejos de Salud', 'Artículos y guías para cuidar tu bienestar.', 3),
('📄', 'Documentos Oficiales', 'Accede a reglamentos, guías y otros documentos.', 4);

-- usuario doctor
INSERT INTO usuarios (id_rol, nombre, apellido_paterno, apellido_materno, boleta, correo, contrasena, telefono, foto, active) 
VALUES (1, 'MediAid', 'ESCOM', 'IPN', 'm3d1a1dESCOM', 'escomediaid@gmail.com', '$2a$10$gqvjzU3NdYeBC/iC7Sz6bOnrb9hmZBTpeOO67EFWz2s9rChIsbOoW', '5557296000 52014', '/public/UserPhoto/mediAid.jpg', true);

-- =============================================
-- DATOS DE PRUEBA (MEDICAMENTOS)
-- =============================================

-- =============================================
-- DATOS DE PRUEBA (USUARIOS)
-- =============================================
-- (La contraseña debe ser un hash real en producción)
