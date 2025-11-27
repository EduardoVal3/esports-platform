/**
 * Hook useUsuarioActual
 * 
 * Obtiene los datos actualizados del usuario desde el endpoint /auth/me
 * en lugar de depender del token almacenado en localStorage.
 * Esto garantiza que los cambios en el perfil se reflejen inmediatamente.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { api } from '@/lib/api/client';

export interface UsuarioActual {
  id: string;
  nickname: string;
  rol: string;
  avatar: {
    id: string;
    url: string;
    nombre: string;
  } | null;
  saldo: string;
  creditos: number;
  xp: number;
  estado: string;
  persona: {
    nombre: string;
    apellido: string;
    correo: string;
    fechaNacimiento?: string;
    timezone?: string;
  };
}

interface UseUsuarioActualReturn {
  usuario: UsuarioActual | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useUsuarioActual(): UseUsuarioActualReturn {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [usuario, setUsuario] = useState<UsuarioActual | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuario = useCallback(async () => {
    if (!isAuthenticated) {
      setUsuario(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await api.get<UsuarioActual>('/api/auth/me');
      setUsuario(data);
    } catch (err) {
      console.error('Error obteniendo usuario actual:', err);
      setError(err instanceof Error ? err.message : 'Error al obtener usuario');
      setUsuario(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Cargar usuario cuando cambia la autenticación
  useEffect(() => {
    if (!authLoading) {
      fetchUsuario();
    }
  }, [authLoading, fetchUsuario]);

  return {
    usuario,
    isLoading: authLoading || isLoading,
    error,
    refetch: fetchUsuario,
  };
}

export default useUsuarioActual;
