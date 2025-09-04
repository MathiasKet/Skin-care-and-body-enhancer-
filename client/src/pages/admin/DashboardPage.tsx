import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

type StatsCardProps = {
  title: string;
  value: string | number;
  change: number;
  icon: string;
};

function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
            <span className="text-white text-2xl">{icon}</span>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-medium text-gray-900">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      {change !== 0 && (
        <div className={`px-5 py-3 ${change > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="text-sm">
            <span className={`font-medium ${change > 0 ? 'text-green-800' : 'text-red-800'}`}>
              {change > 0 ? `+${change}%` : `${change}%`}
            </span>{' '}
            <span className="text-gray-500">from last month</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchStats = async () => {
      try {
        // const response = await fetch('/api/admin/stats');
        // const data = await response.json();
        // setStats(data);
        
        // Mock data for now
        setTimeout(() => {
          setStats({
            totalSales: 12500,
            totalOrders: 248,
            totalProducts: 56,
            totalCustomers: 184,
          });
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          change={12.5}
          icon="💰"
        />
        <StatsCard
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={5.2}
          icon="📦"
        />
        <StatsCard
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          change={3.1}
          icon="🛍️"
        />
        <StatsCard
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          change={8.7}
          icon="👥"
        />
      </div>

      <div className="mt-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Latest actions in your store</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-12 text-gray-500">
              <p>No recent activity to display</p>
              <p className="text-sm mt-2">Activity will appear here as it happens</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
