import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, getToken, setToken, clearToken, cartApi } from '../services/api';
import { useCart } from './CartContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Load current user on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (!token) { setIsLoading(false); return; }
      try {
        const userData = await authApi.me();
        setUser(userData);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, []);

  // Listen for 401 unauthorized events
  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      clearToken();
    };
    window.addEventListener('pitch:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('pitch:unauthorized', handleUnauthorized);
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, user: userData } = await authApi.login(email, password);
    setToken(token);
    setUser(userData);
    setIsAuthModalOpen(false);

    // Sync guest cart to server after login
    try {
      const localCart = JSON.parse(localStorage.getItem('pitch_willow_cart') || '[]');
      if (localCart.length > 0) {
        const syncItems = localCart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          options: item.options || {},
          unitPrice: item.unitPrice,
        }));
        await cartApi.sync(syncItems);
        localStorage.removeItem('pitch_willow_cart');
      }
    } catch (e) {
      // Cart sync failure shouldn't block login
      console.warn('[Auth] Cart sync after login failed:', e.message);
    }

    return userData;
  }, []);

  const register = useCallback(async (name, email, password, phone) => {
    const { token, user: userData } = await authApi.register({ name, email, password, phone });
    setToken(token);
    setUser(userData);
    setIsAuthModalOpen(false);
    return userData;
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  const openLogin = useCallback(() => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      isAuthModalOpen,
      authMode,
      setAuthMode,
      setIsAuthModalOpen,
      login,
      register,
      logout,
      openLogin,
      openRegister,
      refreshUser: async () => {
        try { const u = await authApi.me(); setUser(u); } catch { /* noop */ }
      },
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
