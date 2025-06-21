import type { Order, OrderStatus, OrderMessage, CheckoutData } from '../types/order.types';

// Mock order service that handles the LYS order workflow
class OrderService {
  private mockOrders: Map<string, Order> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
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

    this.mockOrders.set(mockOrder.id, mockOrder);
  }

  // Create a new order (returns pending_approval status)
  async createOrder(checkoutData: CheckoutData, cartItems: any[], userId: string): Promise<Order> {
    const orderNumber = `ORD-${new Date().getFullYear()}-${String(this.mockOrders.size + 1).padStart(3, '0')}`;
    
    const order: Order = {
      id: `order-${Date.now()}`,
      orderNumber,
      retailerId: userId,
      retailerName: checkoutData.shippingAddress.company || checkoutData.shippingAddress.name,
      brandId: '2', // Would be determined by cart items in real implementation
      brandName: 'Multiple Brands', // Would be determined by cart items
      status: 'pending' as OrderStatus, // All new orders start as pending for admin approval
      items: cartItems.map((item, index) => ({
        id: `item-${index}`,
        productId: item.productId,
        productName: item.productName,
        variantId: item.variantId || 'default',
        variantName: item.variantName || 'Standard',
        sku: item.sku || `SKU-${item.productId}`,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      })),
      subtotal: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      shipping: 0, // Free shipping for B2B
      tax: 0, // Tax calculated after admin approval
      total: 0, // Total calculated after admin approval
      shippingAddress: checkoutData.shippingAddress,
      billingAddress: checkoutData.billingAddress,
      paymentMethod: checkoutData.paymentMethod,
      notes: checkoutData.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Calculate initial totals
    order.tax = order.subtotal * 0.20;
    order.total = order.subtotal + order.shipping + order.tax;

    this.mockOrders.set(order.id, order);

    // In production, this would:
    // 1. Create order in database
    // 2. Notify admin team for approval
    // 3. Send confirmation email to retailer
    console.log('Order created:', order);

    return order;
  }

  // Get order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    return this.mockOrders.get(orderId) || null;
  }

  // Get orders for a user
  async getOrdersByUserId(userId: string, role: 'retailer' | 'brand'): Promise<Order[]> {
    const orders = Array.from(this.mockOrders.values());
    
    if (role === 'retailer') {
      return orders.filter(order => order.retailerId === userId);
    } else if (role === 'brand') {
      return orders.filter(order => order.brandId === userId);
    }
    
    return [];
  }

  // Admin approves order with final pricing
  async approveOrder(orderId: string, finalPricing?: { subtotal: number; tax: number; shipping: number }): Promise<Order> {
    const order = this.mockOrders.get(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== 'pending') {
      throw new Error('Order must be pending to approve');
    }

    // Update pricing if provided (after negotiation with brand)
    if (finalPricing) {
      order.subtotal = finalPricing.subtotal;
      order.tax = finalPricing.tax;
      order.shipping = finalPricing.shipping;
      order.total = finalPricing.subtotal + finalPricing.tax + finalPricing.shipping;
    }

    order.status = 'confirmed' as OrderStatus;
    order.updatedAt = new Date();

    // In production, this would:
    // 1. Generate invoice
    // 2. Send invoice to retailer
    // 3. Notify brand of confirmed order
    console.log('Order approved:', order);

    return order;
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string): Promise<Order> {
    const order = this.mockOrders.get(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = status;
    order.updatedAt = new Date();

    if (trackingNumber) {
      order.trackingNumber = trackingNumber;
      order.estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    }

    // In production, this would send notifications based on status change
    console.log('Order status updated:', order);

    return order;
  }

  // Add message to order
  async addOrderMessage(orderId: string, message: Omit<OrderMessage, 'id' | 'createdAt'>): Promise<OrderMessage> {
    const order = this.mockOrders.get(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    const newMessage: OrderMessage = {
      ...message,
      id: `msg-${Date.now()}`,
      createdAt: new Date()
    };

    if (!order.messages) {
      order.messages = [];
    }
    order.messages.push(newMessage);

    // In production, this would:
    // 1. Save message to database
    // 2. Send notification to relevant parties
    console.log('Message added to order:', newMessage);

    return newMessage;
  }

  // Get order messages
  async getOrderMessages(orderId: string): Promise<OrderMessage[]> {
    const order = this.mockOrders.get(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    return order.messages || [];
  }
}

// Export singleton instance
export const orderService = new OrderService();