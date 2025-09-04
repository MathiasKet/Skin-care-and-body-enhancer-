import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@/lib/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

interface AdminUser extends User {
  email: string;
  // Add other user properties as needed
}

interface AdminAuthContextType {
  admin: AdminUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const supabase = createClient();

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      try {
        const currentUser = session?.user || null;
        if (currentUser) {
          setAdmin(currentUser as AdminUser);
        } else {
          setAdmin(null);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setError('Error checking authentication status');
      } finally {
        setLoading(false);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      if (data.user) {
        // Check if user has admin role (you'll need to implement this check)
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', data.user.id)
          .single();
          
        if (userError) throw userError;
        
        if (!userData?.is_admin) {
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin privileges required.');
        }
        
        setAdmin({
          ...data.user,
          email: data.user.email || '',
        });
        
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setAdmin(null);
      navigate('/login');
    } catch (err: any) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to log out. Please try again.');
      throw err;
    }
  };

  // Helper function to get the current session
  const getSession = async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  };

  // Helper function to get the current user
  const getUser = (): AdminUser | null => {
    return admin;
  };

  const value = {
    admin,
    login,
    logout,
    loading,
    error,
    getSession,
    getUser,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {!loading && children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
