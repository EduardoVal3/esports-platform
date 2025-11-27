// Tipos para el sistema de autenticación

export interface Persona {
  id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento?: string;
  genero?: string;
  timezone?: string;
}

export interface Usuario {
  id: string;
  nickname: string;
  rol: 'usuario' | 'administrador';
  persona: Persona;
  avatar: { id: string; url: string; nombre: string } | null;
  saldo: string; // viene como string del backend (NUMERIC)
  creditos: number;
  xp?: number;
  estado?: 'activo' | 'suspendido' | 'baneado';
}

export interface AuthResponse {
  access_token: string;
  usuario: Usuario;
}

export interface LoginCredentials {
  login: string; // nickname o email
  password: string;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  correo: string;
  nickname: string;
  password: string;
  fechaNacimiento: string;
  genero?: string;
  timezone?: string;
}

export interface AuthState {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}
