import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink to-white py-12 px-4">
      <div className="auth-container space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-5xl font-light tracking-wider text-deep-charcoal mb-2">
            LOVING YOUR SKIN
          </h1>
          <p className="text-lg text-text-secondary">Welcome back to your beauty marketplace</p>
        </div>

        {/* Login Form */}
        <div className="auth-card">
            <h2 className="text-3xl font-normal mb-6">Sign In</h2>
            
            {error && (
              <div className="alert alert-error mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input input-bordered w-full pl-10"
                    placeholder="you@example.com"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                  <Link to="/forgot-password" className="label-text-alt link link-hover text-rose-gold">
                    Forgot password?
                  </Link>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full pl-10"
                    placeholder="••••••••"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Remember Me */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="checkbox checkbox-sm"
                  />
                  <span className="label-text">Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="btn btn-outline w-full">
                <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" />
                Continue with Google
              </button>
              <button className="btn btn-outline w-full">
                <img src="/apple-icon.svg" alt="Apple" className="h-5 w-5 mr-2" />
                Continue with Apple
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              New to LYS Platform?{' '}
              <Link to="/register" className="font-medium text-rose-gold hover:text-rose-gold-dark">
                Create an account
              </Link>
            </p>
        </div>

        {/* Demo Credentials */}
        <div className="text-center text-sm text-gray-600">
          <p>Demo credentials:</p>
          <p>Retailer: retailer@demo.com / demo123</p>
          <p>Brand: brand@demo.com / demo123</p>
        </div>
      </div>
    </div>
  );
};