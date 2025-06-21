import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { useCartStore } from '../../stores/cart.store';
import { useUIStore } from '../../stores/ui.store';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { summary } = useCartStore();
  const { language, setLanguage } = useUIStore();

  const cartItemCount = summary?.items.length || 0;

  const navLinks = isAuthenticated
    ? [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/brands', label: 'Brands' },
        { path: '/catalog', label: 'Products' },
        { path: '/orders', label: 'Orders' },
        { path: '/cart', label: 'Shopping Cart' },
        { path: '/settings', label: 'Settings' },
      ]
    : [
        { path: '/how-it-works', label: 'How It Works' },
        { path: '/for-retailers', label: 'For Retailers' },
        { path: '/for-brands', label: 'For Brands' },
        { path: '/contact', label: 'Contact' },
      ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="nav-logo">
              LOVING YOUR SKIN
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-item ${isActive(link.path) ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <select 
                className="form-select text-sm px-3 py-1.5 rounded-full border-gray-300"
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'ko' | 'zh')}
              >
                <option value="en">EN</option>
                <option value="ko">KO</option>
                <option value="zh">ZH</option>
              </select>

              {isAuthenticated && user ? (
                <>
                  {/* Cart for logged in users */}
                  <Link to="/cart" className="nav-item relative">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-rose-gold text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  
                  {/* User Menu */}
                  <div className="relative group">
                    <button className="nav-item flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="text-sm">{user.displayName}</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-50">Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-50">Settings</Link>
                      <hr className="my-1" />
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-red-600">
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/') ? 'text-rose-gold' : 'text-gray-500'}`}>
            <div className="text-xl">🏠</div>
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/brands" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/brands') ? 'text-rose-gold' : 'text-gray-500'}`}>
            <div className="text-xl">🏪</div>
            <span className="text-xs">Brands</span>
          </Link>
          <Link to="/cart" className={`flex flex-col items-center gap-1 px-3 py-2 relative ${isActive('/cart') ? 'text-rose-gold' : 'text-gray-500'}`}>
            <div className="text-xl">🛒</div>
            <span className="text-xs">Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-2 bg-rose-gold text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link to="/orders" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/orders') ? 'text-rose-gold' : 'text-gray-500'}`}>
            <div className="text-xl">📦</div>
            <span className="text-xs">Orders</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center gap-1 px-3 py-2 ${isActive('/profile') ? 'text-rose-gold' : 'text-gray-500'}`}>
            <div className="text-xl">👤</div>
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="container flex items-center justify-between h-14">
          <Link to="/" className="text-lg font-light tracking-wider">
            LYS
          </Link>
          <select 
            className="text-sm px-2 py-1 rounded-full border border-gray-300"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ko' | 'zh')}
          >
            <option value="en">EN</option>
            <option value="ko">KO</option>
            <option value="zh">ZH</option>
          </select>
        </div>
      </div>
    </>
  );
};