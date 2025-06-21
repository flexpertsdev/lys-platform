import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full" style={{ backgroundColor: 'var(--color-soft-pink)' }}>
      <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-2xl)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" style={{ marginBottom: 'var(--spacing-xl)' }}>
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Loving Your Skin</h3>
            <p className="text-sm text-gray-600" style={{ marginBottom: 'var(--spacing-lg)' }}>
              Your trusted B2B marketplace for premium Korean beauty products.
            </p>
            <div className="flex" style={{ gap: 'var(--spacing-md)' }}>
              <a href="#" className="text-gray-500 hover:text-rose-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-rose-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-rose-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold" style={{ marginBottom: 'var(--spacing-md)' }}>Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm text-gray-600">info@loveyourskin.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm text-gray-600">+44 20 1234 5678</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Beauty Street<br />
                  London, UK EC1A 1BB
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t" style={{ borderColor: 'var(--color-border-gray)', paddingTop: 'var(--spacing-lg)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {currentYear} Loving Your Skin. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-gray-600 hover:text-rose-gold transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};