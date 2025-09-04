import { useEffect } from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useLocation } from 'wouter';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAdminAuth();
  const [location] = useLocation();

  useEffect(() => {
    if (!loading && !admin) {
      // Redirect to login if not authenticated
      window.location.href = `/admin/login?redirect=${encodeURIComponent(location)}`;
    }
  }, [admin, loading, location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!admin) {
    return null; // Will redirect in the useEffect
  }

  return <>{children}</>;
}
