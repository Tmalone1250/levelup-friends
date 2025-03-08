
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

// Mock user data for testing
const MOCK_USER: User = {
  id: '1',
  username: 'GamerPro123',
  email: 'gamer@example.com',
  avatar: '/avatars/default.png',
  level: 5,
  xp: 2500,
  coins: 750,
  bio: 'Passionate gamer who loves FPS and RPG games!',
  createdAt: new Date().toISOString(),
  online: true
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would check for stored tokens and validate them
    // For this MVP, we'll just simulate a loading state
    const checkAuth = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if there's a stored user in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Authentication error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an actual API call
      // For the MVP, we'll use mock data
      if (email === 'demo@example.com' && password === 'password') {
        setUser(MOCK_USER);
        localStorage.setItem('user', JSON.stringify(MOCK_USER));
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would make an actual API call
      // For the MVP, we'll create a new user with the provided details
      const newUser: User = {
        ...MOCK_USER,
        id: Math.random().toString(36).substring(2, 9),
        username,
        email,
        level: 1,
        xp: 0,
        coins: 100
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
