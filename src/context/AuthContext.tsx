"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserAuth, SubscriptionPlan } from '../types';

interface AuthContextType {
  user: UserAuth;
  login: () => void;
  logout: () => void;
  upgradeAccount: () => void;
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
      isAdmin: asAdmin,
      plan: asAdmin ? 'premium' : 'free',
      createdAt: '2024-01-15'
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false
    });
  };

  const upgradeAccount = () => {
    // In a real app, this would involve payment processing
    if (user.isAuthenticated) {
      setUser({
        ...user,
        plan: 'premium'
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeAccount }}>
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
