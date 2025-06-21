import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, GridItem } from '../ui/Grid';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 mt-auto">
      <Container className="py-2xl">
        <Grid cols={4} gap="xl" className="mb-xl">
          {/* Company Info */}
          <GridItem colSpan={4} className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold mb-md">Loving Your Skin</h3>
            <p className="text-sm text-base-content/70 mb-lg">
              Your trusted B2B marketplace for premium Korean beauty products.
            </p>
            <div className="flex space-x-md">
              <a href="#" className="text-base-content/50 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-base-content/50 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-base-content/50 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </GridItem>

          {/* Quick Links */}
          <GridItem colSpan={2} className="md:col-span-1">
            <h4 className="text-base font-semibold mb-md">Quick Links</h4>
            <ul className="space-y-sm">
              <li>
                <Link to="/catalog" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </GridItem>

          {/* Support */}
          <GridItem colSpan={2} className="md:col-span-1">
            <h4 className="text-base font-semibold mb-md">Support</h4>
            <ul className="space-y-sm">
              <li>
                <Link to="/help" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </GridItem>

          {/* Contact */}
          <GridItem colSpan={4} className="md:col-span-2 lg:col-span-1">
            <h4 className="text-base font-semibold mb-md">Contact Us</h4>
            <ul className="space-y-sm">
              <li className="flex items-start space-x-sm">
                <Mail className="h-4 w-4 text-base-content/50 mt-0.5" />
                <span className="text-sm text-base-content/70">info@loveyourskin.com</span>
              </li>
              <li className="flex items-start space-x-sm">
                <Phone className="h-4 w-4 text-base-content/50 mt-0.5" />
                <span className="text-sm text-base-content/70">+44 20 1234 5678</span>
              </li>
              <li className="flex items-start space-x-sm">
                <MapPin className="h-4 w-4 text-base-content/50 mt-0.5" />
                <span className="text-sm text-base-content/70">
                  123 Beauty Street<br />
                  London, UK EC1A 1BB
                </span>
              </li>
            </ul>
          </GridItem>
        </Grid>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-lg">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-md md:space-y-0">
            <p className="text-sm text-base-content/70">
              © {currentYear} Loving Your Skin. All rights reserved.
            </p>
            <div className="flex space-x-lg">
              <Link to="/privacy" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};