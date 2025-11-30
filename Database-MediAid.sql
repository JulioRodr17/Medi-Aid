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
        REFERENCES usuario(id)
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
('Analgésicos', 'Medicamentos utilizados para aliviar el dolor.'),
('Anestésicos', 'Sustancias que bloquean la sensibilidad al dolor de manera parcial o total.'),
('Antiagregantes plaquetarios', 'Medicamentos que previenen la formación de coágulos sanguíneos.'),
('Antibióticos', 'Medicamentos que combaten infecciones bacterianas.'),
('Anticoagulantes', 'Medicamentos que reducen la capacidad de coagulación de la sangre.'),
('Anticonceptivos', 'Medicamentos para prevenir el embarazo.'),
('Anticonvulsivos', 'Medicamentos para prevenir o tratar convulsiones.'),
('Antidiabéticos', 'Medicamentos utilizados para controlar los niveles de glucosa en sangre.'),
('Antidepresivos', 'Medicamentos para el tratamiento de trastornos depresivos.'),
('Antidiarreicos', 'Medicamentos para controlar la diarrea.'),
('Antieméticos', 'Medicamentos para prevenir náuseas y vómitos.'),
('Antifúngicos', 'Medicamentos utilizados para combatir infecciones por hongos.'),
('Antihipertensivos', 'Medicamentos para controlar la presión arterial alta.'),
('Antihistamínicos', 'Utilizados para tratar alergias y reacciones histamínicas.'),
('Antiinflamatorios', 'Medicamentos que reducen la inflamación.'),
('Antipiréticos', 'Medicamentos empleados para reducir la fiebre.'),
('Antipsicóticos', 'Medicamentos para tratar trastornos como esquizofrenia y psicosis.'),
('Antisépticos', 'Sustancias que eliminan o inhiben microorganismos en tejidos vivos.'),
('Antitusivos', 'Medicamentos que alivian o eliminan la tos.'),
('Antivirales', 'Medicamentos para el tratamiento de infecciones virales.'),
('Broncodilatadores', 'Medicamentos que facilitan la respiración al dilatar las vías respiratorias.'),
('Corticoesteroides', 'Medicamentos antiinflamatorios y supresores del sistema inmunológico.'),
('Expectorantes', 'Medicamentos que ayudan a expulsar mucosidad de las vías respiratorias.'),
('Gastroprotectores', 'Medicamentos que protegen la mucosa del estómago.'),
('Hipolipemiantes', 'Medicamentos para reducir los niveles de colesterol y triglicéridos.'),
('Hormonas', 'Medicamentos que contienen o regulan hormonas del organismo.'),
('Laxantes', 'Medicamentos que facilitan la evacuación intestinal.'),
('Relajantes musculares', 'Medicamentos que reducen el tono del músculo esquelético.'),
('Vitaminas y suplementos', 'Complementos alimenticios para cubrir deficiencias nutricionales.'),
('Otros', 'Medicamentos o productos farmacéuticos que no entran en ninguna categoría específica.');

INSERT INTO medicamentos 
(id_categoria, nombre_medicamento, descripcion, presentacion, dosis, cantidad_stock, fecha_caducidad, uso)
VALUES
-- Analgésicos
(1, 'Paracetamol', 'Alivio de dolor leve a moderado', 'Tableta', '500 mg', 100, '2026-12-31', 'Dolor y fiebre'),
(1, 'Ibuprofeno', 'Alivio de dolor e inflamación', 'Tableta', '400 mg', 80, '2026-10-30', 'Dolor, fiebre e inflamación'),
(1, 'Naproxeno', 'Antiinflamatorio y analgésico', 'Tableta', '250 mg', 60, '2026-08-15', 'Dolor e inflamación'),

-- Antibióticos
(2, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Cápsula', '500 mg', 150, '2026-11-20', 'Infecciones bacterianas'),
(2, 'Cefalexina', 'Antibiótico betalactámico', 'Cápsula', '500 mg', 120, '2026-09-30', 'Infecciones bacterianas'),
(2, 'Azitromicina', 'Antibiótico macrólido', 'Tableta', '250 mg', 90, '2026-07-31', 'Infecciones respiratorias y otras'),

-- Antiinflamatorios
(3, 'Diclofenaco', 'Antiinflamatorio no esteroideo', 'Tableta', '50 mg', 70, '2026-12-31', 'Dolor e inflamación'),
(3, 'Ketorolaco', 'Analgesico y antiinflamatorio potente', 'Tableta', '10 mg', 50, '2026-10-15', 'Dolor moderado a severo'),

-- Antihipertensivos
(4, 'Enalapril', 'Control de presión arterial', 'Tableta', '10 mg', 200, '2027-01-31', 'Hipertensión'),
(4, 'Losartán', 'Control de presión arterial', 'Tableta', '50 mg', 180, '2026-12-31', 'Hipertensión'),

-- Vitaminas y suplementos
(5, 'Vitamina C', 'Refuerzo del sistema inmunológico', 'Tableta', '500 mg', 250, '2027-06-30', 'Deficiencia de vitamina C'),
(5, 'Vitamina D', 'Regulación de calcio y huesos', 'Tableta', '1000 UI', 200, '2027-05-31', 'Deficiencia de vitamina D'),
(5, 'Multivitamínico', 'Suplemento multivitamínico', 'Cápsula', '1 cápsula', 150, '2027-04-30', 'Complemento nutricional');


INSERT INTO noticias (url, fecha_inicio, fecha_expiracion, titulo, descripcion, activo, orden, fecha_creacion) VALUES
('/public/Noticias/slide_1.jpg', CURRENT_DATE, CURRENT_DATE + INTERVAL '1 day', 'Noticia de 1 día', 'Descripción de la noticia que durará un día.', TRUE, 1, CURRENT_TIMESTAMP),
('/public/Noticias/slide_2.jpg', CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', 'Noticia de 1 semana', 'Descripción de la noticia que durará una semana.', TRUE, 2, CURRENT_TIMESTAMP),
('/public/Noticias/slide_3.jpg', CURRENT_DATE, CURRENT_DATE + INTERVAL '14 days', 'Noticia de 2 semanas', 'Descripción de la noticia que durará dos semanas.', TRUE, 3, CURRENT_TIMESTAMP);

INSERT INTO info_cards (icon, title, text, orden) VALUES
('📰', 'Noticias Recientes', 'Mantente al día con las últimas novedades y comunicados.', 1),
('🤝', 'Programas de Apoyo', 'Descubre los programas y campañas activas.', 2),
('❤️', 'Consejos de Salud', 'Artículos y guías para cuidar tu bienestar.', 3),
('📄', 'Documentos Oficiales', 'Accede a reglamentos, guías y otros documentos.', 4);

-- =============================================
-- DATOS DE PRUEBA (MEDICAMENTOS)
-- =============================================

-- =============================================
-- DATOS DE PRUEBA (USUARIOS)
-- =============================================
-- (La contraseña debe ser un hash real en producción)
