import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Toaster } from 'react-hot-toast';

export const Layout: React.FC = () => {
  return (
    <div className="flex flex-col" style={{ minHeight: '100dvh' }}>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: 'var(--color-primary-white)',
            color: 'var(--color-text-primary)',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'var(--color-primary-white)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'var(--color-primary-white)',
            },
          },
        }}
      />
    </div>
  );
};