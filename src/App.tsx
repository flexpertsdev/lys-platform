import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from './components/layout/Layout';
import { ProductCatalog } from './pages/ProductCatalog';
import { Home } from './pages/Home';
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
  const { checkAuth, user } = useAuthStore();
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
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalog" element={<ProductCatalog />} />
            <Route path="products/:id" element={<div>Product Detail Page (Coming Soon)</div>} />
            <Route path="cart" element={<div>Cart Page (Coming Soon)</div>} />
            <Route path="login" element={<div>Login Page (Coming Soon)</div>} />
            <Route path="register" element={<div>Register Page (Coming Soon)</div>} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App
