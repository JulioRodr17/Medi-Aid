// utils/httpClient.js
const API_BASE_URL = 'http://localhost:8080/api';     // Desarrollo
//const API_BASE_URL = '/api';                            // Producción 

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  if (options.body) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    // Leer body primero (JSON o vacío)
    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : await response.text().then(text => ({ data: text }));
    
    // Manejar errores específicos
    if (response.status === 401) {
      localStorage.removeItem('token');
      alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
      window.location.href = '/login';
      return;
    }

    if (response.status === 403) {
      alert(data.error || 'No tienes permisos para realizar esta acción.');
      return;
    }

    // Otros errores HTTP
    if (!response.ok) {
      throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
    }

    // No Content
    if (response.status === 204) return null;

    // Respuesta correcta
    return data;

  } catch (error) {
    console.error('Error en httpClient:', error);
    throw error;
  }
};

export const httpClient = {
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};
