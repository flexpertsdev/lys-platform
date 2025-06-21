import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardRedirect } from './components/auth/DashboardRedirect';

// Auth Pages
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';

// Retailer Pages
import { RetailerDashboard } from './pages/retailer/Dashboard';

// Public Pages
import { Home } from './pages/Home';
import { ProductCatalog } from './pages/ProductCatalog';
import { BrandShop } from './pages/BrandShop';
import { ProductDetail } from './pages/ProductDetail';
import { ShoppingCart } from './pages/ShoppingCart';

// Stores
import { useAuthStore } from './stores/auth.store';
import { useCartStore } from './stores/cart.store';

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { checkAuth, user, isAuthenticated } = useAuthStore();
  const { initCart } = useCartStore();

  useEffect(() => {
    // Check authentication status on app load
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    // Initialize cart when user is authenticated
    if (user) {
      initCart(user.id);
    }
  }, [user, initCart]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Login />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Register />
          } />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Dashboard Redirect */}
            <Route index element={<DashboardRedirect />} />
            
            {/* Admin Routes */}
            <Route path="admin">
              <Route index element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="users" element={<div>User Management (Coming Soon)</div>} />
              <Route path="analytics" element={<div>Analytics (Coming Soon)</div>} />
              <Route path="products" element={<div>Product Management (Coming Soon)</div>} />
              <Route path="orders" element={<div>Order Management (Coming Soon)</div>} />
              <Route path="settings" element={<div>Admin Settings (Coming Soon)</div>} />
            </Route>
            
            {/* Retailer Routes */}
            <Route path="retailer">
              <Route index element={
                <ProtectedRoute requiredRole="retailer">
                  <RetailerDashboard />
                </ProtectedRoute>
              } />
              <Route path="orders" element={<div>Order History (Coming Soon)</div>} />
              <Route path="saved" element={<div>Saved Products (Coming Soon)</div>} />
              <Route path="calendar" element={<div>Delivery Calendar (Coming Soon)</div>} />
            </Route>
            
            {/* Brand Routes */}
            <Route path="brand">
              <Route index element={<div>Brand Dashboard (Coming Soon)</div>} />
              <Route path="products" element={<div>Product Management (Coming Soon)</div>} />
              <Route path="orders" element={<div>Brand Orders (Coming Soon)</div>} />
              <Route path="analytics" element={<div>Brand Analytics (Coming Soon)</div>} />
            </Route>
            
            {/* Shared Routes */}
            <Route path="brands" element={<BrandShop />} />
            <Route path="brands/:id" element={<div>Brand Profile (Coming Soon)</div>} />
            <Route path="catalog" element={<ProductCatalog />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="cart" element={<ShoppingCart />} />
            <Route path="checkout" element={<div>Checkout (Coming Soon)</div>} />
            <Route path="orders" element={<div>Orders (Coming Soon)</div>} />
            <Route path="orders/:id" element={<div>Order Detail (Coming Soon)</div>} />
            <Route path="messages" element={<div>Messages (Coming Soon)</div>} />
            <Route path="messages/:orderId" element={<div>Order Messages (Coming Soon)</div>} />
            <Route path="profile" element={<div>Profile (Coming Soon)</div>} />
            <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
            <Route path="help" element={<div>Help & Support (Coming Soon)</div>} />
            
            {/* 404 */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>

          {/* Public Pages (without Layout) */}
          <Route path="/home" element={<Home />} />
          <Route path="/how-it-works" element={<div>How It Works (Coming Soon)</div>} />
          <Route path="/for-retailers" element={<div>For Retailers (Coming Soon)</div>} />
          <Route path="/for-brands" element={<div>For Brands (Coming Soon)</div>} />
          <Route path="/contact" element={<div>Contact (Coming Soon)</div>} />
          <Route path="/terms" element={<div>Terms of Service (Coming Soon)</div>} />
          <Route path="/privacy" element={<div>Privacy Policy (Coming Soon)</div>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;