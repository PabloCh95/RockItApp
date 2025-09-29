import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkAuthStatus,
  clearError,
  loginUser,
  logoutUser
} from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store/store';
import type { LoginCredentials } from '../../types/auth';


export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    return dispatch(loginUser(credentials));
  }, [dispatch]);

  const logout = useCallback(async () => {
    return dispatch(logoutUser());
  }, [dispatch]);

  const checkAuth = useCallback(async () => {
    return dispatch(checkAuthStatus());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    checkAuth,
    clearAuthError,
  };
};