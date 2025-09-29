import { useCallback, useState } from 'react';
import type { LoginCredentials } from '../../types/auth';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const { login, isLoading, error, clearAuthError } = useAuth();
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const validateCredentials = (credentials: LoginCredentials) => {
    const errors: typeof validationErrors = {};
    
    if (!credentials.username.trim()) {
      errors.username = 'Usuario es requerido';
    }
    
    if (!credentials.password.trim()) {
      errors.password = 'Contraseña es requerida';
    }
    
    if (credentials.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (credentials: LoginCredentials) => {
   
    clearAuthError();
    setValidationErrors({});
    
    
    if (!validateCredentials(credentials)) {
      return { success: false, error: 'Credenciales inválidas' };
    }
    
    try {
      const result = await login(credentials);
      if (result.type === 'auth/loginUser/fulfilled') {
        return { success: true };
      } else {
        return { 
          success: false, 
          error: result.payload as string || 'Error de autenticación' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Error inesperado' 
      };
    }
  };

  const clearErrors = useCallback(() => {
    setValidationErrors({});
    clearAuthError();
  }, [clearAuthError]);

  return {
    isLoading,
    error,
    validationErrors,
    
    login:handleLogin,
    clearErrors,
  };
};