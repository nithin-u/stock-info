import { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Verify token with backend
          const userData = await authService.getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error.message);
        // Clear invalid auth data
        authService.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      setUser(response.data);
      setIsAuthenticated(true);
      
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await authService.register({ name, email, password });
      
      setUser(response.data);
      setIsAuthenticated(true);
      
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Registration failed:', error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error.message);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    try {
      const updatedUser = await authService.updateProfile(userData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error.message);
      throw new Error(error.message);
    }
  };

  // Update password function
  const updatePassword = async (currentPassword, newPassword) => {
    try {
      await authService.updatePassword(currentPassword, newPassword);
      return true;
    } catch (error) {
      console.error('Password update failed:', error.message);
      throw new Error(error.message);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
