import React from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  ShoppingCart,
  Heart,
  RefreshCw,
  ArrowRight,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderStatCardProps {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

const OrderStatCard: React.FC<OrderStatCardProps> = ({ 
  title, 
  count, 
  icon: Icon,
  color,
  bgColor
}) => (
  <div className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-3xl font-light mt-1">{count}</p>
        </div>
        <div className={`${bgColor} rounded-full p-3`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  </div>
);

export const RetailerDashboard: React.FC = () => {
  // Mock data - replace with real data from store
  const orderStats = {
    pending: 3,
    processing: 5,
    delivered: 28,
    total: 36
  };

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      supplier: 'Seoul Beauty Co.',
      items: 12,
      total: 1250.00,
      status: 'processing'
    },
    {
      id: 'ORD-002',
      date: '2024-01-14',
      supplier: 'K-Glow Beauty',
      items: 8,
      total: 890.50,
      status: 'pending'
    },
    {
      id: 'ORD-003',
      date: '2024-01-12',
      supplier: 'Pure Seoul',
      items: 15,
      total: 2100.00,
      status: 'delivered'
    },
    {
      id: 'ORD-004',
      date: '2024-01-10',
      supplier: 'Seoul Beauty Co.',
      items: 6,
      total: 450.00,
      status: 'delivered'
    }
  ];

  const savedProducts = [
    {
      id: 1,
      name: 'Snail Mucin Essence',
      brand: 'Seoul Beauty',
      price: 25.00,
      moq: 12,
      image: '/products/snail-essence.jpg'
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      brand: 'K-Glow',
      price: 35.00,
      moq: 6,
      image: '/products/vitamin-c.jpg'
    },
    {
      id: 3,
      name: 'Sheet Mask Set',
      brand: 'Pure Seoul',
      price: 15.00,
      moq: 24,
      image: '/products/sheet-masks.jpg'
    },
    {
      id: 4,
      name: 'Cleansing Oil',
      brand: 'Seoul Beauty',
      price: 28.00,
      moq: 12,
      image: '/products/cleansing-oil.jpg'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-warning badge-sm">Pending</span>;
      case 'processing':
        return <span className="badge badge-info badge-sm">Processing</span>;
      case 'delivered':
        return <span className="badge badge-success badge-sm">Delivered</span>;
      default:
        return <span className="badge badge-ghost badge-sm">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light">Retailer Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your orders and discover new products</p>
        </div>
        <div className="flex gap-3">
          <Link to="/catalog" className="btn btn-outline btn-sm">
            Browse Products
          </Link>
          <Link to="/cart" className="btn btn-primary btn-sm">
            <ShoppingCart className="h-4 w-4" />
            View Cart
          </Link>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OrderStatCard
          title="Pending Orders"
          count={orderStats.pending}
          icon={Clock}
          color="text-warning"
          bgColor="bg-warning/10"
        />
        <OrderStatCard
          title="Processing"
          count={orderStats.processing}
          icon={Package}
          color="text-info"
          bgColor="bg-info/10"
        />
        <OrderStatCard
          title="Delivered"
          count={orderStats.delivered}
          icon={CheckCircle}
          color="text-success"
          bgColor="bg-success/10"
        />
        <OrderStatCard
          title="Total Orders"
          count={orderStats.total}
          icon={TrendingUp}
          color="text-rose-gold"
          bgColor="bg-rose-gold/10"
        />
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-xl font-light">Recent Orders</h2>
              <Link to="/orders" className="text-sm text-rose-gold hover:text-rose-gold-dark">
                View all orders
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Supplier</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="hover">
                      <td className="font-medium">{order.id}</td>
                      <td>{order.supplier}</td>
                      <td>{order.items}</td>
                      <td>£{order.total.toFixed(2)}</td>
                      <td>{getStatusBadge(order.status)}</td>
                      <td>
                        <Link to={`/orders/${order.id}`} className="btn btn-ghost btn-sm">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-xl font-light mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/catalog" className="btn btn-outline btn-block justify-start">
                <Package className="h-5 w-5" />
                Browse Catalog
              </Link>
              <button className="btn btn-outline btn-block justify-start">
                <RefreshCw className="h-5 w-5" />
                Quick Reorder
              </button>
              <Link to="/saved" className="btn btn-outline btn-block justify-start">
                <Heart className="h-5 w-5" />
                Saved Products
              </Link>
              <Link to="/calendar" className="btn btn-outline btn-block justify-start">
                <Calendar className="h-5 w-5" />
                Delivery Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Products / Quick Reorder */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl font-light">Quick Reorder - Saved Products</h2>
            <Link to="/saved" className="text-sm text-rose-gold hover:text-rose-gold-dark">
              View all saved
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {savedProducts.map(product => (
              <div key={product.id} className="card card-compact bg-base-100 border border-gray-200 hover:shadow-md transition-shadow">
                <figure className="aspect-square bg-gray-100">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Package className="h-12 w-12" />
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-600">{product.brand}</p>
                  <div className="flex justify-between items-center mt-2">
                    <div>
                      <p className="text-lg font-light">£{product.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500">MOQ: {product.moq}</p>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-soft-pink">
          <div className="card-body">
            <h3 className="text-sm font-medium text-gray-700">Account Balance</h3>
            <p className="text-2xl font-light mt-1">£5,240.50</p>
            <p className="text-xs text-gray-600 mt-2">Next payment due: Feb 1, 2024</p>
          </div>
        </div>
        <div className="card bg-soft-pink">
          <div className="card-body">
            <h3 className="text-sm font-medium text-gray-700">This Month's Spend</h3>
            <p className="text-2xl font-light mt-1">£3,890.00</p>
            <p className="text-xs text-gray-600 mt-2">15% increase from last month</p>
          </div>
        </div>
        <div className="card bg-soft-pink">
          <div className="card-body">
            <h3 className="text-sm font-medium text-gray-700">Loyalty Points</h3>
            <p className="text-2xl font-light mt-1">2,450</p>
            <p className="text-xs text-gray-600 mt-2">Redeem for discounts</p>
          </div>
        </div>
      </div>
    </div>
  );
};