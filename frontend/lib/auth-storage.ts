// Constantes para el almacenamiento de tokens
const TOKEN_KEY = 'esports_auth_token';
const USER_KEY = 'esports_user';

/**
 * Guardar el token de autenticación
 */
export function setToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Obtener el token de autenticación
 */
export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Eliminar el token de autenticación
 */
export function removeToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Guardar datos del usuario en localStorage
 */
export function setStoredUser(user: unknown): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/**
 * Obtener datos del usuario de localStorage
 */
export function getStoredUser<T>(): T | null {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      try {
        return JSON.parse(user) as T;
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Eliminar datos del usuario de localStorage
 */
export function removeStoredUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(USER_KEY);
  }
}

/**
 * Limpiar toda la información de autenticación
 */
export function clearAuthStorage(): void {
  removeToken();
  removeStoredUser();
}

/**
 * Verificar si hay una sesión almacenada
 */
export function hasStoredSession(): boolean {
  return getToken() !== null;
}

/**
 * Decodificar el payload del JWT (sin verificar firma)
 */
export function decodeToken(token: string): Record<string, unknown> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Verificar si el token ha expirado
 */
export function isTokenExpired(token: string): boolean {
  const decoded = decodeToken(token);
  if (!decoded || typeof decoded.exp !== 'number') {
    return true;
  }
  // exp está en segundos, Date.now() en milisegundos
  return decoded.exp * 1000 < Date.now();
}
