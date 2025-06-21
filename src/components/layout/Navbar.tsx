import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Bell, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuthStore } from '../../stores/auth.store';
import { useCartStore } from '../../stores/cart.store';
import { useUIStore } from '../../stores/ui.store';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { summary } = useCartStore();
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();

  const cartItemCount = summary?.items.length || 0;

  const navLinks = [
    { path: '/catalog', label: 'Products' },
    { path: '/brands', label: 'Brands' },
    { path: '/orders', label: 'Orders' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-sticky bg-base-100 shadow-sm">
      <div className="container mx-auto px-md">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-32 bg-primary rounded-md flex items-center justify-center text-primary-content font-bold">
              LYS
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-lg py-sm rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-base-content hover:bg-base-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-md">
            {/* Search */}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="error" size="sm" className="absolute -top-1 -right-1">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge variant="primary" size="sm" className="absolute -top-1 -right-1">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    {user.displayName.charAt(0).toUpperCase()}
                  </div>
                </label>
                <ul tabIndex={0} className="dropdown-content z-dropdown menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-3">
                  <li className="menu-title">
                    <span>{user.displayName}</span>
                  </li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/settings">Settings</Link></li>
                  <li className="border-t border-base-200 mt-2 pt-2">
                    <button onClick={() => logout()}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center space-x-sm">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-base-200">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-lg py-sm rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-base-content hover:bg-base-200'
                  }`}
                  onClick={() => toggleMobileMenu()}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-base-200 pt-4 space-y-2">
                <Link
                  to="/cart"
                  className="flex items-center justify-between px-lg py-sm rounded-md hover:bg-base-200"
                  onClick={() => toggleMobileMenu()}
                >
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <Badge variant="primary" size="sm">{cartItemCount}</Badge>
                  )}
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-lg py-sm rounded-md hover:bg-base-200"
                      onClick={() => toggleMobileMenu()}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        toggleMobileMenu();
                      }}
                      className="block w-full text-left px-lg py-sm rounded-md hover:bg-base-200 text-error"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-lg py-sm rounded-md hover:bg-base-200"
                      onClick={() => toggleMobileMenu()}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-lg py-sm rounded-md bg-primary text-primary-content hover:bg-primary-focus"
                      onClick={() => toggleMobileMenu()}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};