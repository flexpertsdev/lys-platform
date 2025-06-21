import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, DollarSign, FileText, CheckCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const features = [
    {
      icon: Rocket,
      title: 'Fast Shipping',
      description: 'Direct from Korea to your store in days, not weeks'
    },
    {
      icon: DollarSign,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise shipping costs'
    },
    {
      icon: FileText,
      title: 'Simple Process',
      description: 'No complicated customs forms or language barriers'
    },
    {
      icon: CheckCircle,
      title: 'Verified Brands',
      description: 'All brands CPNP certified for UK/EU/CH markets'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Korean Beauty, Simplified</h1>
          <p className="hero-subtitle">Connect with verified Korean beauty brands. No barriers, just beauty.</p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Request Invitation
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  <feature.icon className="h-8 w-8 text-rose-gold" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="text-3xl font-light text-center mb-10">Get in Touch</h2>
          <form className="contact-form">
            <div className="form-group">
              <label className="form-label">I am a...</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="retailer" className="radio" />
                  <span>Retailer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="brand" className="radio" />
                  <span>Brand</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="other" className="radio" />
                  <span>Other</span>
                </label>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" className="form-input" placeholder="Your name" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="your@email.com" />
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows={4} placeholder="Tell us about your business..."></textarea>
            </div>
            
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};