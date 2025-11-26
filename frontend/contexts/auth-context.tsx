"use client";

import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import type { AuthContextType, AuthState, LoginCredentials, RegisterData, Usuario } from '@/types/auth';
import { authApi, AuthApiError } from '@/lib/api/auth';
import {
  setToken,
  getToken,
  setStoredUser,
  getStoredUser,
  clearAuthStorage,
  isTokenExpired,
} from '@/lib/auth-storage';

// Estado inicial
const initialState: AuthState = {
  usuario: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Tipos de acciones
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: Usuario }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'SET_LOADING'; payload: boolean };

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        usuario: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        usuario: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        usuario: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Inicializar autenticación desde localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      const storedUser = getStoredUser<Usuario>();

      if (token && storedUser) {
        // Verificar si el token ha expirado
        if (isTokenExpired(token)) {
          clearAuthStorage();
          dispatch({ type: 'SET_LOADING', payload: false });
          return;
        }

        // Token válido, restaurar sesión
        dispatch({ type: 'AUTH_SUCCESS', payload: storedUser });
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Login
  const login = useCallback(async (credentials: LoginCredentials) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await authApi.login(credentials);
      
      // Guardar token y usuario
      setToken(response.access_token);
      setStoredUser(response.usuario);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: response.usuario });
    } catch (error) {
      const message = error instanceof AuthApiError 
        ? error.message 
        : 'Error al iniciar sesión';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  }, []);

  // Register
  const register = useCallback(async (data: RegisterData) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const response = await authApi.register(data);
      
      // Guardar token y usuario
      setToken(response.access_token);
      setStoredUser(response.usuario);
      
      dispatch({ type: 'AUTH_SUCCESS', payload: response.usuario });
    } catch (error) {
      const message = error instanceof AuthApiError 
        ? error.message 
        : 'Error al registrar usuario';
      dispatch({ type: 'AUTH_ERROR', payload: message });
      throw error;
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    clearAuthStorage();
    dispatch({ type: 'AUTH_LOGOUT' });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para usar el contexto
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

// Export del contexto por si se necesita acceso directo
export { AuthContext };
