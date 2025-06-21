import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building, User, Phone, AlertCircle, Check } from 'lucide-react';
import { useAuthStore } from '../../stores/auth.store';
import { UserRole } from '../../types';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    accountType: 'retailer',
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const passwordRequirements = [
    { met: formData.password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(formData.password), text: 'One number' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.termsAccepted) {
      setError('Please accept the terms and conditions');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        password: formData.password,
        displayName: formData.contactName,
        companyName: formData.businessName,
        businessName: formData.businessName,
        phone: formData.phone,
        role: formData.accountType === 'retailer' ? UserRole.RETAILER : UserRole.BRAND
      });
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
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

  const nextStep = () => {
    if (step === 1 && formData.accountType) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink to-white py-12 px-4">
      <div className="auth-container space-y-8">
        {/* Logo and Title */}
        <div className="text-center">
          <h1 className="text-5xl font-light tracking-wider text-deep-charcoal mb-2">
            LOVING YOUR SKIN
          </h1>
          <p className="text-lg text-text-secondary">Join the UK's premier K-beauty marketplace</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className={`h-2 w-24 rounded-full ${step >= 1 ? 'bg-rose-gold' : 'bg-gray-300'}`} />
          <div className={`h-2 w-24 rounded-full ${step >= 2 ? 'bg-rose-gold' : 'bg-gray-300'}`} />
        </div>

        {/* Registration Form */}
        <div className="auth-card">
            <h2 className="text-3xl font-normal mb-6">Create Account</h2>
            
            {error && (
              <div className="alert alert-error mb-4">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  {/* Account Type Selection */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">I am a...</span>
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`card cursor-pointer ${formData.accountType === 'retailer' ? 'ring-2 ring-rose-gold' : ''}`}>
                        <input
                          type="radio"
                          name="accountType"
                          value="retailer"
                          checked={formData.accountType === 'retailer'}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="card-body text-center">
                          <Building className="h-12 w-12 mx-auto mb-2 text-rose-gold" />
                          <h3 className="font-medium">Retailer</h3>
                          <p className="text-sm text-gray-600">Buy products for my store</p>
                        </div>
                      </label>
                      <label className={`card cursor-pointer ${formData.accountType === 'brand' ? 'ring-2 ring-rose-gold' : ''}`}>
                        <input
                          type="radio"
                          name="accountType"
                          value="brand"
                          checked={formData.accountType === 'brand'}
                          onChange={handleChange}
                          className="hidden"
                        />
                        <div className="card-body text-center">
                          <Building className="h-12 w-12 mx-auto mb-2 text-rose-gold" />
                          <h3 className="font-medium">Brand</h3>
                          <p className="text-sm text-gray-600">Sell my products</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn btn-primary w-full"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  {/* Business Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Business Name</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="Your Business Ltd"
                        required
                      />
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Contact Name */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contact Name</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="John Smith"
                        required
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Business Email</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="you@business.com"
                        required
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="+44 20 1234 5678"
                        required
                      />
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
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
                    
                    {/* Password Requirements */}
                    <div className="mt-2 space-y-1">
                      {passwordRequirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Check className={`h-4 w-4 ${req.met ? 'text-success' : 'text-gray-300'}`} />
                          <span className={req.met ? 'text-success' : 'text-gray-500'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="input input-bordered w-full pl-10"
                        placeholder="••••••••"
                        required
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="termsAccepted"
                        checked={formData.termsAccepted}
                        onChange={handleChange}
                        className="checkbox checkbox-sm"
                      />
                      <span className="label-text">
                        I agree to the{' '}
                        <Link to="/terms" className="link link-hover text-rose-gold">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="link link-hover text-rose-gold">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="btn btn-outline flex-1"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`btn btn-primary flex-1 ${isLoading ? 'loading' : ''}`}
                    >
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-rose-gold hover:text-rose-gold-dark">
                Sign in
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};