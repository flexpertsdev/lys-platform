import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth.store';

export const DashboardRedirect: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      switch (user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'retailer':
          navigate('/retailer');
          break;
        case 'brand':
          navigate('/brand');
          break;
        default:
          navigate('/catalog');
      }
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="loading loading-spinner loading-lg text-rose-gold"></div>
    </div>
  );
};