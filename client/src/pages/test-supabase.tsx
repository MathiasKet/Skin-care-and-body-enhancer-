import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function TestSupabase() {
  const [message, setMessage] = useState('Testing connection...');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function testConnection() {
      try {
        // Test 1: Check if we can connect to Supabase
        const { data, error } = await supabase.from('profiles').select('*').limit(1);
        
        if (error) throw error;
        
        setMessage('✅ Successfully connected to Supabase!');
        
        // Test 2: Get the current user session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (err) {
        setMessage(`❌ Connection error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  const handleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'test-password',
      });
      
      if (error) throw error;
      
      if (data.user) {
        setUser(data.user);
        setMessage('✅ Check your email for the confirmation link!');
      }
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <h1>Supabase Connection Test</h1>
      <p>{message}</p>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {user ? (
            <div>
              <p>Logged in as: {user.email}</p>
              <button 
                onClick={() => supabase.auth.signOut()}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSignUp}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test Sign Up
            </button>
          )}
        </div>
      )}
    </div>
  );
}
