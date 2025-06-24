"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';

interface User {
  _id: string;
  name: string;
  walletAddress: string;
  role: string;
  joinDate: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (identifier: string, password?: string) => Promise<void>;
  register: (name: string, walletAddress: string, role?: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (identifier: string, password?: string) => {
    try {
      let response;
      if (password) {
        // Email/password login
        response = await fetch('https://blockevid3-0-bc.onrender.com/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: identifier, password }),
        });
      } else {
        // Wallet login
        if (!window.ethereum) {
          throw new Error('Please install MetaMask or another Ethereum-compatible wallet.');
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const message = `Sign this message to authenticate with BlockEvid 3.0: ${Date.now()}`;
        const signature = await signer.signMessage(message);
        response = await fetch('https://blockevid3-0-bc.onrender.com/api/auth/wallet-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ wallet: identifier, message, signature }),
        });
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }

      const data = await response.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('isAuthenticated', 'true');
      if (password) {
        localStorage.setItem('userEmail', identifier);
      } else {
        localStorage.setItem('walletAddress', identifier);
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, walletAddress: string, role?: string) => {
    const response = await fetch('https://blockevid3-0-bc.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, walletAddress, role }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Registration failed');
    }

    const data = await response.json();
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('walletAddress', walletAddress);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, setUser, setToken }}>
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