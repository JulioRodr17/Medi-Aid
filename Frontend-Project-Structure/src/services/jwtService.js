export function decodeJWT(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function isTokenValid(token) {
  try {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return false;     // token inválido
    const now = Date.now() / 1000;                  // segundos
    return payload.exp > now;                       // true si NO ha expirado
  } catch (err) {
    console.error("Token erroneo: ", err);
    return false; // token corrupto → no válido
  }
}

