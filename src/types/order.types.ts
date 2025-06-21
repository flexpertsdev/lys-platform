export interface Order {
  id: string;
  orderNumber: string;
  retailerId: string;
  retailerName: string;
  brandId: string;
  brandName: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod?: PaymentMethod;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  notes?: string;
  messages?: OrderMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  sku: string;
  price: number;
  quantity: number;
  total: number;
  image?: string;
}

export interface Address {
  id?: string;
  name: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  county?: string;
  postcode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer' | 'purchase_order';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  accountNumber?: string;
  sortCode?: string;
  poNumber?: string;
}

export interface OrderMessage {
  id: string;
  orderId: string;
  senderId: string;
  senderName: string;
  senderRole: 'retailer' | 'brand' | 'admin';
  message: string;
  attachments?: OrderMessageAttachment[];
  isRead: boolean;
  createdAt: Date;
}

export interface OrderMessageAttachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface CheckoutData {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsBilling: boolean;
  paymentMethod: PaymentMethod;
  notes?: string;
}