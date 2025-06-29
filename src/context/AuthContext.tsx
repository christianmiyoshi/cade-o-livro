"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserAuth } from '../types';

interface AuthContextType {
  user: UserAuth;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserAuth>({
    isAuthenticated: false
  });

  const login = (asAdmin = false) => {
    // Mock login
    setUser({
      isAuthenticated: true,
      name: asAdmin ? 'Admin' : 'Usuário Demo',
      email: asAdmin ? 'admin@exemplo.com' : 'usuario@exemplo.com',
      isAdmin: asAdmin
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
