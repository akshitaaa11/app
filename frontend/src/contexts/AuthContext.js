import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const mockUser = {
        id: '1',
        name: 'Alex Johnson',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        university: 'MIT',
        major: 'Computer Science',
        gpa: '3.8',
        graduationYear: '2025'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = (profileData) => {
    setUser(prevUser => ({ ...prevUser, ...profileData }));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};