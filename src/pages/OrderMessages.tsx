import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Send, 
  ArrowLeft, 
  Package, 
  Paperclip,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  User,
  Building
} from 'lucide-react';
import { useAuthStore } from '../stores/auth.store';
import { formatDate } from '../utils/formatters';
import type { Order, OrderMessage, OrderStatus } from '../types';

// Mock order data
const mockOrder: Order = {
  id: '1',
  orderNumber: 'ORD-2024-001',
  retailerId: '1',
  retailerName: 'Beauty Boutique Ltd',
  brandId: '2',
  brandName: 'Seoul Beauty Co.',
  status: 'processing' as OrderStatus,
  items: [
    {
      id: '1',
      productId: '1',
      productName: 'Snail Mucin 96% Power Essence',
      variantId: 'v1',
      variantName: '100ml',
      sku: 'SM96-100',
      price: 25.00,
      quantity: 24,
      total: 600.00
    }
  ],
  subtotal: 600.00,
  shipping: 0,
  tax: 120.00,
  total: 720.00,
  shippingAddress: {
    name: 'Beauty Boutique Ltd',
    company: 'Beauty Boutique Ltd',
    addressLine1: '123 High Street',
    city: 'London',
    postcode: 'W1A 1AA',
    country: 'United Kingdom',
    phone: '+44 20 1234 5678'
  },
  billingAddress: {
    name: 'Beauty Boutique Ltd',
    company: 'Beauty Boutique Ltd',
    addressLine1: '123 High Street',
    city: 'London',
    postcode: 'W1A 1AA',
    country: 'United Kingdom',
    phone: '+44 20 1234 5678'
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-01-16')
};

const mockMessages: OrderMessage[] = [
  {
    id: '1',
    orderId: '1',
    senderId: '2',
    senderName: 'Seoul Beauty Co.',
    senderRole: 'brand',
    message: 'Thank you for your order! We have received it and will begin processing shortly.',
    isRead: true,
    createdAt: new Date('2024-01-15T10:00:00')
  },
  {
    id: '2',
    orderId: '1',
    senderId: '1',
    senderName: 'Beauty Boutique Ltd',
    senderRole: 'retailer',
    message: 'Great! When can we expect the shipment?',
    isRead: true,
    createdAt: new Date('2024-01-15T14:30:00')
  },
  {
    id: '3',
    orderId: '1',
    senderId: '2',
    senderName: 'Seoul Beauty Co.',
    senderRole: 'brand',
    message: 'Your order will be shipped within 2-3 business days. We\'ll send you the tracking information once it\'s dispatched.',
    isRead: true,
    createdAt: new Date('2024-01-15T15:00:00')
  }
];

export const OrderMessages: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { user } = useAuthStore();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setIsLoading(true);

    // Create new message
    const message: OrderMessage = {
      id: `msg-${Date.now()}`,
      orderId: orderId || '1',
      senderId: user.id,
      senderName: user.displayName,
      senderRole: user.role as 'retailer' | 'brand' | 'admin',
      message: newMessage,
      isRead: false,
      createdAt: new Date()
    };

    // Add message to list
    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsLoading(false);
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-warning" />;
      case 'confirmed':
      case 'processing':
        return <CheckCircle className="h-5 w-5 text-info" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-primary" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'cancelled':
      case 'refunded':
        return <XCircle className="h-5 w-5 text-error" />;
      default:
        return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'confirmed':
      case 'processing':
        return 'badge-info';
      case 'shipped':
        return 'badge-primary';
      case 'delivered':
        return 'badge-success';
      case 'cancelled':
      case 'refunded':
        return 'badge-error';
      default:
        return 'badge-ghost';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/orders" className="btn btn-ghost btn-circle">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-light">Order {mockOrder.orderNumber}</h1>
            <div className="flex items-center gap-2 mt-1">
              {getStatusIcon(mockOrder.status)}
              <span className={`badge ${getStatusColor(mockOrder.status)}`}>
                {mockOrder.status.charAt(0).toUpperCase() + mockOrder.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages Section */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-sm h-[600px] flex flex-col">
            {/* Messages Header */}
            <div className="card-body border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Messages</h2>
                <span className="text-sm text-gray-500">
                  {messages.length} messages
                </span>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => {
                const isOwnMessage = message.senderId === user?.id;
                
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {!isOwnMessage && (
                          <>
                            <div className="avatar placeholder">
                              <div className="w-6 h-6 rounded-full bg-rose-gold text-white">
                                <span className="text-xs">
                                  {message.senderRole === 'brand' ? <Building className="h-3 w-3" /> : <User className="h-3 w-3" />}
                                </span>
                              </div>
                            </div>
                            <span className="text-sm font-medium">{message.senderName}</span>
                          </>
                        )}
                        <span className="text-xs text-gray-500">
                          {formatDate(message.createdAt)}
                        </span>
                      </div>
                      <div className={`chat ${isOwnMessage ? 'chat-end' : 'chat-start'}`}>
                        <div className={`chat-bubble ${isOwnMessage ? 'chat-bubble-primary' : ''}`}>
                          {message.message}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="card-body border-t p-4">
              <div className="flex gap-2">
                <button type="button" className="btn btn-ghost btn-circle">
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="input input-bordered flex-1"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="btn btn-primary btn-circle"
                  disabled={!newMessage.trim() || isLoading}
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-4">
          {/* Order Summary */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="font-medium mb-4">Order Details</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date</span>
                  <span>{formatDate(mockOrder.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-medium">£{mockOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span>{mockOrder.items.reduce((sum, item) => sum + item.quantity, 0)} units</span>
                </div>
              </div>

              <div className="divider"></div>

              {/* Parties */}
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Retailer</p>
                  <p className="font-medium">{mockOrder.retailerName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Brand</p>
                  <p className="font-medium">{mockOrder.brandName}</p>
                </div>
              </div>

              <Link to={`/orders/${orderId}`} className="btn btn-outline btn-sm w-full mt-4">
                View Full Details
              </Link>
            </div>
          </div>

          {/* Order Items */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="font-medium mb-4">Order Items</h3>
              
              <div className="space-y-3">
                {mockOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      <Package className="h-6 w-6 text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.productName}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × £{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          {mockOrder.trackingNumber && (
            <div className="card bg-soft-pink">
              <div className="card-body">
                <h3 className="font-medium mb-2">Tracking Information</h3>
                <p className="text-sm text-gray-600">{mockOrder.trackingNumber}</p>
                <button className="btn btn-sm btn-outline mt-2">
                  Track Shipment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};