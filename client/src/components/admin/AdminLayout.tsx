import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

type NavItem = {
  name: string;
  href: string;
  icon: string;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '🛍️' },
  { name: 'Orders', href: '/admin/orders', icon: '📦' },
  { name: 'Customers', href: '/admin/customers', icon: '👥' },
  { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { admin, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!admin) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white">
        <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
          <Link to="/admin/dashboard" className="text-xl font-bold hover:text-gray-300 transition-colors">
            Admin Panel
          </Link>
        </div>
        
        <nav className="mt-5 px-2 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                isActive(item.href)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <span className="mr-3 text-lg">🚪</span>
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="flex justify-between items-center h-16 px-6">
            <div className="flex items-center">
              <span className="text-gray-500">Welcome back, {admin.email}</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
