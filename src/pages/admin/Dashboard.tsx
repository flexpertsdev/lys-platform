import React from 'react';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Package,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon,
  color = 'rose-gold'
}) => (
  <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-light">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {change > 0 ? (
                <ArrowUp className="h-4 w-4 text-success" />
              ) : (
                <ArrowDown className="h-4 w-4 text-error" />
              )}
              <span className={`text-sm ${change > 0 ? 'text-success' : 'text-error'}`}>
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        <div className={`bg-soft-pink rounded-full p-3`}>
          <Icon className={`h-6 w-6 text-${color}`} />
        </div>
      </div>
    </div>
  </div>
);

export const AdminDashboard: React.FC = () => {
  // Mock data - replace with real data from store
  const stats = {
    totalUsers: 1234,
    activeOrders: 56,
    revenue: 125400,
    growth: 12.5
  };

  const recentActivity = [
    { id: 1, type: 'order', message: 'New order #1234 from Beauty Store Ltd', time: '5 min ago' },
    { id: 2, type: 'user', message: 'New retailer registration: Glow Beauty', time: '1 hour ago' },
    { id: 3, type: 'product', message: 'Seoul Beauty Co. added 5 new products', time: '2 hours ago' },
    { id: 4, type: 'order', message: 'Order #1230 marked as delivered', time: '3 hours ago' },
    { id: 5, type: 'payment', message: 'Payment received for order #1225', time: '5 hours ago' }
  ];

  const topProducts = [
    { id: 1, name: 'Snail Mucin Essence', brand: 'Seoul Beauty', sales: 234, revenue: 5850 },
    { id: 2, name: 'Vitamin C Serum', brand: 'K-Glow', sales: 189, revenue: 4725 },
    { id: 3, name: 'Sheet Mask Set', brand: 'Pure Seoul', sales: 167, revenue: 2505 },
    { id: 4, name: 'Cleansing Oil', brand: 'Seoul Beauty', sales: 145, revenue: 3625 },
    { id: 5, name: 'Sunscreen SPF50+', brand: 'K-Shield', sales: 134, revenue: 3350 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/reports" className="btn btn-outline btn-sm">
            View Reports
          </Link>
          <Link to="/admin/settings" className="btn btn-primary btn-sm">
            Settings
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={8.3}
          icon={Users}
        />
        <StatCard
          title="Active Orders"
          value={stats.activeOrders.toString()}
          change={12.5}
          icon={ShoppingBag}
        />
        <StatCard
          title="Monthly Revenue"
          value={`£${(stats.revenue / 1000).toFixed(1)}k`}
          change={15.2}
          icon={TrendingUp}
        />
        <StatCard
          title="Growth Rate"
          value={`${stats.growth}%`}
          change={3.1}
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-xl font-light">Recent Activity</h2>
              <Link to="/admin/activity" className="text-sm text-rose-gold hover:text-rose-gold-dark">
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'order' ? 'bg-success' :
                      activity.type === 'user' ? 'bg-info' :
                      activity.type === 'product' ? 'bg-warning' :
                      'bg-primary'
                    }`} />
                    <p className="text-sm">{activity.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-xl font-light mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/admin/users/new" className="btn btn-outline btn-block justify-start">
                <Users className="h-5 w-5" />
                Add New User
              </Link>
              <Link to="/admin/products/approve" className="btn btn-outline btn-block justify-start">
                <Package className="h-5 w-5" />
                Approve Products
              </Link>
              <Link to="/admin/orders" className="btn btn-outline btn-block justify-start">
                <ShoppingBag className="h-5 w-5" />
                Manage Orders
              </Link>
              <Link to="/admin/analytics" className="btn btn-outline btn-block justify-start">
                <TrendingUp className="h-5 w-5" />
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl font-light">Top Products This Month</h2>
            <Link to="/admin/products" className="text-sm text-rose-gold hover:text-rose-gold-dark">
              View all products
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th className="text-right">Sales</th>
                  <th className="text-right">Revenue</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(product => (
                  <tr key={product.id} className="hover">
                    <td className="font-medium">{product.name}</td>
                    <td className="text-gray-600">{product.brand}</td>
                    <td className="text-right">{product.sales}</td>
                    <td className="text-right">£{product.revenue.toLocaleString()}</td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
                          <MoreVertical className="h-4 w-4" />
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                          <li><a><Eye className="h-4 w-4" /> View Details</a></li>
                          <li><a>Edit Product</a></li>
                          <li><a>View Analytics</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};