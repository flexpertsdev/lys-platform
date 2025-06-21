import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  CreditCard, 
  FileText,
  Check,
  Building,
  Package,
  Info,
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import type { Address, PaymentMethod, CheckoutData } from '../types';

// Mock saved addresses
const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'Beauty Boutique Ltd',
    company: 'Beauty Boutique Ltd',
    addressLine1: '123 High Street',
    city: 'London',
    postcode: 'W1A 1AA',
    country: 'United Kingdom',
    phone: '+44 20 1234 5678',
    isDefault: true
  },
  {
    id: '2',
    name: 'Beauty Boutique Warehouse',
    company: 'Beauty Boutique Ltd',
    addressLine1: '456 Industrial Park',
    addressLine2: 'Unit 12',
    city: 'Birmingham',
    postcode: 'B1 1AA',
    country: 'United Kingdom',
    phone: '+44 121 234 5678',
    isDefault: false
  }
];

// Mock payment methods
const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: 12,
    expiryYear: 2025
  },
  {
    id: '2',
    type: 'bank_transfer'
  }
];

interface CheckoutStep {
  id: number;
  name: string;
  icon: React.ReactNode;
}

const steps: CheckoutStep[] = [
  { id: 1, name: 'Shipping', icon: <MapPin className="h-5 w-5" /> },
  { id: 2, name: 'Payment', icon: <CreditCard className="h-5 w-5" /> },
  { id: 3, name: 'Review', icon: <FileText className="h-5 w-5" /> }
];

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shippingAddress: mockAddresses[0],
    billingAddress: mockAddresses[0],
    sameAsBilling: true,
    paymentMethod: mockPaymentMethods[0],
    notes: ''
  });

  const [newAddress, setNewAddress] = useState<Address>({
    name: '',
    company: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    county: '',
    postcode: '',
    country: 'United Kingdom',
    phone: ''
  });

  const [showNewAddressForm, setShowNewAddressForm] = useState(false);

  // Mock cart data
  const cartItems = [
    {
      id: '1',
      productName: 'Snail Mucin 96% Power Essence',
      brandName: 'Seoul Beauty Co.',
      variantName: '100ml',
      price: 25.00,
      quantity: 24,
      total: 600.00
    },
    {
      id: '2',
      productName: 'Vitamin C Brightening Serum',
      brandName: 'K-Glow Beauty',
      variantName: '30ml',
      price: 35.00,
      quantity: 12,
      total: 420.00
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.20;
  const total = subtotal + shipping + tax;

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    
    try {
      // In production, this would call orderService.createOrder
      // For now, simulate order placement
      setTimeout(() => {
        navigate('/orders/confirmation/ORD-2024-002');
      }, 2000);
    } catch (error) {
      console.error('Failed to place order:', error);
      setIsLoading(false);
    }
  };

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
        
        {/* Saved Addresses */}
        <div className="space-y-3 mb-4">
          {mockAddresses.map((address) => (
            <label key={address.id} className="card cursor-pointer">
              <div className="card-body p-4">
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingAddress"
                    className="radio radio-sm mt-1"
                    checked={checkoutData.shippingAddress.id === address.id}
                    onChange={() => setCheckoutData(prev => ({ 
                      ...prev, 
                      shippingAddress: address,
                      billingAddress: prev.sameAsBilling ? address : prev.billingAddress
                    }))}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{address.name}</p>
                    {address.company && <p className="text-sm text-gray-600">{address.company}</p>}
                    <p className="text-sm text-gray-600">
                      {address.addressLine1}
                      {address.addressLine2 && `, ${address.addressLine2}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.postcode}
                    </p>
                    <p className="text-sm text-gray-600">{address.phone}</p>
                    {address.isDefault && (
                      <span className="badge badge-sm badge-primary mt-2">Default</span>
                    )}
                  </div>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Add New Address */}
        <button
          type="button"
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
          className="btn btn-outline btn-sm"
        >
          {showNewAddressForm ? 'Cancel' : 'Add New Address'}
        </button>

        {showNewAddressForm && (
          <div className="mt-4 card bg-base-200">
            <div className="card-body">
              <h4 className="font-medium mb-3">New Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contact Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.name}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.company}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Address Line 1</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.addressLine1}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine1: e.target.value }))}
                  />
                </div>
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Address Line 2 (Optional)</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.addressLine2}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, addressLine2: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">City</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">County</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.county}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, county: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Postcode</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={newAddress.postcode}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, postcode: e.target.value }))}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Phone</span>
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered"
                    value={newAddress.phone}
                    onChange={(e) => setNewAddress(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mt-4">
                <button type="button" className="btn btn-primary btn-sm">
                  Save Address
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Billing Address */}
      <div>
        <h3 className="text-lg font-medium mb-4">Billing Address</h3>
        <label className="label cursor-pointer justify-start gap-3">
          <input
            type="checkbox"
            className="checkbox"
            checked={checkoutData.sameAsBilling}
            onChange={(e) => setCheckoutData(prev => ({
              ...prev,
              sameAsBilling: e.target.checked,
              billingAddress: e.target.checked ? prev.shippingAddress : mockAddresses[0]
            }))}
          />
          <span className="label-text">Same as shipping address</span>
        </label>

        {!checkoutData.sameAsBilling && (
          <div className="space-y-3 mt-4">
            {mockAddresses.map((address) => (
              <label key={address.id} className="card cursor-pointer">
                <div className="card-body p-4">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="billingAddress"
                      className="radio radio-sm mt-1"
                      checked={checkoutData.billingAddress.id === address.id}
                      onChange={() => setCheckoutData(prev => ({ ...prev, billingAddress: address }))}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{address.name}</p>
                      {address.company && <p className="text-sm text-gray-600">{address.company}</p>}
                      <p className="text-sm text-gray-600">{address.addressLine1}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.postcode}
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        
        <div className="space-y-3">
          {/* Saved Cards */}
          {mockPaymentMethods.filter(pm => pm.type === 'card').map((method) => (
            <label key={method.id} className="card cursor-pointer">
              <div className="card-body p-4">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio radio-sm"
                    checked={checkoutData.paymentMethod.id === method.id}
                    onChange={() => setCheckoutData(prev => ({ ...prev, paymentMethod: method }))}
                  />
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium">
                      {method.brand} ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-600">
                      Expires {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                </div>
              </div>
            </label>
          ))}

          {/* Bank Transfer */}
          <label className="card cursor-pointer">
            <div className="card-body p-4">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-sm mt-1"
                  checked={checkoutData.paymentMethod.type === 'bank_transfer'}
                  onChange={() => setCheckoutData(prev => ({ 
                    ...prev, 
                    paymentMethod: mockPaymentMethods.find(pm => pm.type === 'bank_transfer')! 
                  }))}
                />
                <Building className="h-5 w-5 text-gray-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-gray-600">
                    Pay by bank transfer (invoice will be sent)
                  </p>
                  <div className="alert alert-info mt-3">
                    <Info className="h-4 w-4" />
                    <span className="text-xs">
                      Orders paid by bank transfer will be processed once payment is received
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </label>

          {/* Purchase Order */}
          <label className="card cursor-pointer">
            <div className="card-body p-4">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="radio radio-sm mt-1"
                  disabled
                />
                <FileText className="h-5 w-5 text-gray-300 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-gray-400">Purchase Order</p>
                  <p className="text-sm text-gray-400">
                    Coming soon - Pay with PO number
                  </p>
                </div>
              </div>
            </div>
          </label>
        </div>

        {/* Add New Card */}
        <button type="button" className="btn btn-outline btn-sm mt-4">
          Add New Card
        </button>
      </div>

      {/* Order Notes */}
      <div>
        <h3 className="text-lg font-medium mb-4">Order Notes (Optional)</h3>
        <textarea
          className="textarea textarea-bordered w-full"
          rows={3}
          placeholder="Add any special instructions or notes for this order..."
          value={checkoutData.notes}
          onChange={(e) => setCheckoutData(prev => ({ ...prev, notes: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      {/* Order Summary */}
      <div>
        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
        
        <div className="card bg-base-100">
          <div className="card-body">
            {/* Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.productName}</p>
                    <p className="text-xs text-gray-600">{item.brandName} • {item.variantName}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × £{item.price.toFixed(2)} = £{item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>VAT (20%)</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div>
        <h3 className="text-lg font-medium mb-4">Delivery Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Shipping Address */}
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Shipping Address</h4>
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(1)}
                  className="btn btn-ghost btn-xs"
                >
                  Edit
                </button>
              </div>
              <div className="text-sm text-gray-600">
                <p>{checkoutData.shippingAddress.name}</p>
                {checkoutData.shippingAddress.company && <p>{checkoutData.shippingAddress.company}</p>}
                <p>{checkoutData.shippingAddress.addressLine1}</p>
                {checkoutData.shippingAddress.addressLine2 && <p>{checkoutData.shippingAddress.addressLine2}</p>}
                <p>{checkoutData.shippingAddress.city}, {checkoutData.shippingAddress.postcode}</p>
                <p>{checkoutData.shippingAddress.country}</p>
                <p className="mt-2">{checkoutData.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">Payment Method</h4>
                <button 
                  type="button" 
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-ghost btn-xs"
                >
                  Edit
                </button>
              </div>
              <div className="text-sm text-gray-600">
                {checkoutData.paymentMethod.type === 'card' ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span>{checkoutData.paymentMethod.brand} ending in {checkoutData.paymentMethod.last4}</span>
                    </div>
                    <p>Expires {checkoutData.paymentMethod.expiryMonth}/{checkoutData.paymentMethod.expiryYear}</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      <span>Bank Transfer</span>
                    </div>
                    <p>Invoice will be sent after order confirmation</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {checkoutData.notes && (
          <div className="card bg-base-100 mt-4">
            <div className="card-body">
              <h4 className="font-medium text-sm mb-2">Order Notes</h4>
              <p className="text-sm text-gray-600">{checkoutData.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="form-control">
        <label className="label cursor-pointer justify-start gap-3">
          <input type="checkbox" className="checkbox" required />
          <span className="label-text">
            I agree to the{' '}
            <Link to="/terms" className="link link-hover text-rose-gold">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link to="/terms/sales" className="link link-hover text-rose-gold">
              Sales Agreement
            </Link>
          </span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/cart" className="btn btn-ghost btn-circle">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-light">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 ${index < steps.length - 1 ? 'relative' : ''}`}
          >
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute top-6 left-1/2 w-full h-0.5 bg-gray-300 -z-10">
                <div
                  className={`h-full bg-rose-gold transition-all duration-300 ${
                    currentStep > step.id ? 'w-full' : 'w-0'
                  }`}
                />
              </div>
            )}
            
            {/* Step */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  currentStep >= step.id
                    ? 'bg-rose-gold text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>
              <span className={`text-sm mt-2 ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          {currentStep === 1 && renderShippingStep()}
          {currentStep === 2 && renderPaymentStep()}
          {currentStep === 3 && renderReviewStep()}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrevStep}
          className={`btn btn-outline ${currentStep === 1 ? 'invisible' : ''}`}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="btn btn-primary"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePlaceOrder}
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Place Order'}
          </button>
        )}
      </div>
    </div>
  );
};