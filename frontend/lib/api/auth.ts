import { env } from '@/config/env';
import type { AuthResponse, LoginCredentials, RegisterData } from '@/types/auth';

const API_URL = env.NEXT_PUBLIC_API_URL;

class AuthApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'AuthApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new AuthApiError(
      data.message || 'Error en la solicitud',
      response.status,
      data.errors
    );
  }
  
  return data as T;
}

export const authApi = {
  /**
   * Iniciar sesión con nickname o email y contraseña
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    return handleResponse<AuthResponse>(response);
  },

  /**
   * Registrar un nuevo usuario
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse<AuthResponse>(response);
  },

  /**
   * Obtener el usuario actual con el token
   */
  async getCurrentUser(token: string): Promise<AuthResponse['usuario']> {
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return handleResponse<AuthResponse['usuario']>(response);
  },

  /**
   * Validar si el token es válido
   */
  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
  },
};

export { AuthApiError };
