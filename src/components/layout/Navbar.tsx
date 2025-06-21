import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Home, 
  Store, 
  Package, 
  UserCircle,
  Menu,
  X,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { useCartStore } from '../../stores/cart.store';
import { useUIStore } from '../../stores/ui.store';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { summary } = useCartStore();
  const { language, setLanguage } = useUIStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = summary?.items.length || 0;

  const navLinks = isAuthenticated
    ? [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/brands', label: 'Brands', icon: Store },
        { path: '/catalog', label: 'Products', icon: Package },
        { path: '/orders', label: 'Orders', icon: Package },
        { path: '/cart', label: 'Shopping Cart', icon: ShoppingCart },
        { path: '/settings', label: 'Settings', icon: UserCircle },
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
      {/* Desktop Navigation - DaisyUI Navbar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 hidden md:flex">
        <div className="container navbar">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost text-xl tracking-wider">
              LOVING YOUR SKIN
            </Link>
          </div>

          <div className="navbar-center">
            <ul className="menu menu-horizontal gap-1">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`rounded-full ${
                      isActive(link.path) 
                        ? 'bg-soft-pink-hover text-deep-charcoal' 
                        : 'text-text-primary hover:bg-soft-pink-hover'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-2">
            {/* Language Selector */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <Globe className="h-5 w-5" />
              </label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2">
                <li><a onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>English</a></li>
                <li><a onClick={() => setLanguage('ko')} className={language === 'ko' ? 'active' : ''}>한국어</a></li>
                <li><a onClick={() => setLanguage('zh')} className={language === 'zh' ? 'active' : ''}>中文</a></li>
              </ul>
            </div>

            {isAuthenticated && user ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <ShoppingCart className="h-5 w-5" />
                    {cartItemCount > 0 && (
                      <span className="badge badge-sm indicator-item bg-rose-gold text-white border-rose-gold">
                        {cartItemCount}
                      </span>
                    )}
                  </div>
                </Link>
                
                {/* User Menu */}
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <User className="h-5 w-5 m-auto mt-2.5" />
                    </div>
                  </label>
                  <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                    <li className="menu-title">
                      <span>{user.displayName}</span>
                    </li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                    <li><a onClick={logout} className="text-error">Logout</a></li>
                  </ul>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Top Bar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-40 md:hidden">
        <div className="navbar-start">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div className="navbar-center">
          <Link to="/" className="btn btn-ghost text-lg">LYS</Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle btn-sm">
              <Globe className="h-4 w-4" />
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 mt-2">
              <li><a onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>EN</a></li>
              <li><a onClick={() => setLanguage('ko')} className={language === 'ko' ? 'active' : ''}>KO</a></li>
              <li><a onClick={() => setLanguage('zh')} className={language === 'zh' ? 'active' : ''}>ZH</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-base-100 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-medium">Menu</span>
              <button
                className="btn btn-ghost btn-circle btn-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="menu p-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={isActive(link.path) ? 'active' : ''}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation - DaisyUI Bottom Navigation */}
      <div className="btm-nav md:hidden">
        <Link 
          to="/" 
          className={isActive('/') ? 'active text-rose-gold' : ''}
        >
          <Home className="h-5 w-5" />
          <span className="btm-nav-label">Home</span>
        </Link>
        <Link 
          to="/brands" 
          className={isActive('/brands') ? 'active text-rose-gold' : ''}
        >
          <Store className="h-5 w-5" />
          <span className="btm-nav-label">Brands</span>
        </Link>
        <Link 
          to="/cart" 
          className={`${isActive('/cart') ? 'active text-rose-gold' : ''}`}
        >
          <div className="indicator">
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="badge badge-xs indicator-item bg-rose-gold text-white border-rose-gold">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="btm-nav-label">Cart</span>
        </Link>
        <Link 
          to="/orders" 
          className={isActive('/orders') ? 'active text-rose-gold' : ''}
        >
          <Package className="h-5 w-5" />
          <span className="btm-nav-label">Orders</span>
        </Link>
        <Link 
          to="/profile" 
          className={isActive('/profile') ? 'active text-rose-gold' : ''}
        >
          <UserCircle className="h-5 w-5" />
          <span className="btm-nav-label">Profile</span>
        </Link>
      </div>
    </>
  );
};