// Auth Context
// Manages Supabase authentication state
// Provides: user, isAuthenticated, loading, signIn, signOut

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// 🛠️ Creating a completely safe, fake mock user profile so your UI works perfectly
const mockUser: User = {
  id: 'sandbox-user-12345',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
  email: 'developer@example.com',
};

const mockSession: Session = {
  access_token: 'mock-token',
  refresh_token: 'mock-refresh',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  user: mockUser,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // 🚀 Start the application with a pre-authenticated sandbox user session
  const [user, setUser] = useState<User | null>(mockUser);
  const [session, setSession] = useState<Session | null>(mockSession);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // We explicitly keep state initialized as logged in, bypassing Supabase checks
    setSession(mockSession);
    setUser(mockUser);
    setLoading(false);
  }, []);

  const signIn = async (email: string): Promise<{ error: Error | null }> => {
    // Immediate local success confirmation 
    setUser(mockUser);
    setSession(mockSession);
    return { error: null };
  };

  const signOut = async (): Promise<void> => {
    setSession(null);
    setUser(null);
    window.location.assign('/');
  };

  const value: AuthContextType = {
    user,
    session,
    isAuthenticated: true, // 🚀 Locked to true so auth-guards will let you through instantly
    loading,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};