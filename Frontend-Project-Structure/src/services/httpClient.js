// TODO: BACKEND
// Esta es la URL base de tu API de Spring Boot.
// La ponemos aquí para que sea el ÚNICO lugar que tengamos
// que modificar cuando movamos el backend a producción.
const API_BASE_URL = 'http://localhost:8080/api/v1';

/**
 * Función genérica para manejar todas las peticiones 'fetch'.
 * @param {string} endpoint - El endpoint de la API al que se llamará (ej. '/auth/login')
 * @param {object} options - Configuración de Fetch (method, headers, body, etc.)
 * @returns {Promise<any>} Los datos de la respuesta en JSON
 */
const request = async (endpoint, options = {}) => {
  // Configuración por defecto
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      // TODO: BACKEND
      // Aquí es donde pondríamos el token de autenticación
      // const token = localStorage.getItem('authToken');
      // if (token) {
      //   config.headers['Authorization'] = `Bearer ${token}`;
      // }
      ...options.headers,
    },
    ...options,
  };

  // Si hay un 'body', lo convertimos a JSON
  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Si la respuesta no es OK (ej. 404, 500), lanzamos un error
    if (!response.ok) {
      // Intenta parsear el error que envía el backend
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    // Si la respuesta es 204 (No Content), no hay JSON que parsear
    if (response.status === 204) {
      return null;
    }

    // Si todo OK, devolvemos el JSON
    return response.json();

  } catch (error) {
    console.error('Error en httpClient:', error);
    // Relanzamos el error para que el componente que llamó lo pueda atrapar
    throw error;
  }
};

// Exportamos un objeto con los métodos HTTP más comunes
export const httpClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};