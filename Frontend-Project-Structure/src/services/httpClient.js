// utils/httpClient.js
const API_BASE_URL = 'http://localhost:8080/api'; // Desarrollo
//const API_BASE_URL = '/api'; // Producción

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  let url = `${API_BASE_URL}${endpoint}`;

  // --- Construir query params ---
  if (options.params) {
    const query = new URLSearchParams(options.params).toString();
    if (query) url += `?${query}`;
  }

  // Configuración base
  const config = {
    method: options.method || 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  // Manejar body según sea JSON o FormData
  if (options.body) {
    if (options.body instanceof FormData) {
      config.body = options.body; // fetch asignará Content-Type multipart/form-data automáticamente
    } else {
      config.body = JSON.stringify(options.body);
      config.headers['Content-Type'] = 'application/json';
    }
  }

  try {
    const response = await fetch(url, config);

    const contentType = response.headers.get('content-type');
    const data = contentType && contentType.includes('application/json')
      ? await response.json().catch(() => ({}))
      : await response.text().then(text => ({ data: text }));

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

    if (!response.ok) {
      throw new Error(data.error || `Error ${response.status}: ${response.statusText}`);
    }

    if (response.status === 204) return null;

    return data;

  } catch (error) {
    console.error('Error en httpClient:', error);
    throw error;
  }
};

const getImage = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const config = {
    method: 'GET',
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
      localStorage.removeItem('token');
      alert('Sesión expirada. Por favor, inicia sesión de nuevo.');
      window.location.href = '/login';
      return null;
    }

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    return url;

  } catch (error) {
    console.error('Error obteniendo la imagen:', error);
    throw error;
  }
};

export const httpClient = {
  API_BASE_URL,
  getImage,
  get: (endpoint, options = {}) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};
