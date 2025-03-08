import React, { createContext, useState, useContext, useEffect } from 'react';
import { User as AuthUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithSteam: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  loginWithSteam: async () => {}
});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Supabase user to app User
  const formatUser = async (authUser: AuthUser): Promise<User | null> => {
    try {
      // Fetch the user profile from our profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
      
      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      if (!data) return null;

      return {
        id: authUser.id,
        username: data.username,
        email: authUser.email || '',
        avatar: data.avatar,
        level: data.level,
        xp: data.xp,
        coins: data.coins,
        bio: data.bio,
        createdAt: data.created_at,
        online: data.online
      };
    } catch (error) {
      console.error('Error formatting user:', error);
      return null;
    }
  };

  // Check if the user is logged in on page load
  useEffect(() => {
    const initialize = async () => {
      try {
        // Set initial loading state
        setIsLoading(true);
        
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        // If session exists, get user data
        if (session?.user) {
          const formattedUser = await formatUser(session.user);
          if (formattedUser) {
            setUser(formattedUser);
          }
        }

        // Set up auth state change listener
        const { data: { subscription } } = await supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              const formattedUser = await formatUser(session.user);
              if (formattedUser) {
                setUser(formattedUser);
              }
            } else {
              setUser(null);
            }
            setIsLoading(false);
          }
        );

        // Cleanup subscription on unmount
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        const formattedUser = await formatUser(data.user);
        if (formattedUser) {
          setUser(formattedUser);
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Sign up the user with Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          }
        }
      });
      
      if (error) throw error;
      
      // The profile will be created by the database trigger we set up
      if (data.user) {
        toast({
          title: "Success",
          description: "Your account has been created successfully. Check your email for verification.",
        });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithSteam = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'steam',
        options: {
          redirectTo: window.location.origin
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Steam login error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to login with Steam",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, loginWithSteam }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
