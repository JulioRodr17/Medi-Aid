// --- Simulación de la base de datos de usuarios ---

const DUMMY_USERS = [
  {
    id: 'u1',
    email: 'user@test.com',
    password: 'password123', // En un backend real, esto estaría hasheado
    name: 'Usuario de Prueba',
    role: 'user',
    phone: '55-1234-5678',
    avatarUrl: 'https://via.placeholder.com/150'
  },
  {
    id: 'a1',
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Admin de Prueba',
    role: 'admin',
    phone: '55-8765-4321',
    avatarUrl: 'https://via.placeholder.com/150'
  }
];

// --- Simulación de la lógica de la API ---

/**
 * Simula una llamada a la API para hacer login.
 * Tarda 500ms en responder.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} El objeto de usuario (sin la contraseña)
 */
export const simulateLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 1. Busca al usuario por su email
      const user = DUMMY_USERS.find(u => u.email === email);

      // 2. Verifica si el usuario existe y la contraseña es correcta
      if (user && user.password === password) {
        // 3. Si es exitoso, devuelve los datos del usuario (¡nunca la contraseña!)
        const { password, ...userData } = user;
        resolve({
          ...userData,
          token: `dummy-jwt-token-for-${user.id}` // Simula un token de sesión
        });
      } else {
        // 4. Si falla, devuelve un error
        reject(new Error('Credenciales inválidas. Por favor, inténtalo de nuevo.'));
      }
    }, 500); // 500ms de retraso para simular la red
  });
};

/**
 * Simula una llamada a la API para registrar un usuario.
 * Tarda 700ms en responder.
 * @param {object} registerData - Datos del formulario de registro
 * @returns {Promise<object>} El objeto del nuevo usuario
 */
export const simulateRegister = (registerData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, name, password } = registerData;

      // 1. Verifica si el email ya está en uso
      if (DUMMY_USERS.some(u => u.email === email)) {
        reject(new Error('Este correo electrónico ya está registrado.'));
        return;
      }

      // 2. Si no existe, "crea" el nuevo usuario
      const newUser = {
        id: `u${Math.floor(Math.random() * 1000)}`,
        email: email,
        password: password, // El backend real lo hashearía
        name: name,
        role: 'user', // Por defecto
        phone: registerData.phone || '',
        avatarUrl: 'https://via.placeholder.com/150'
      };

      // "Guarda" el usuario en nuestra base de datos falsa (solo para esta simulación)
      DUMMY_USERS.push(newUser);

      // 3. Devuelve los datos del nuevo usuario
      const { password: pw, ...userData } = newUser;
      resolve({
        ...userData,
        token: `dummy-jwt-token-for-${newUser.id}`
      });
    }, 700);
  });
};