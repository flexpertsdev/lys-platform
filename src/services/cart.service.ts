import { 
  Cart, 
  CartItem, 
  CartSummary, 
  BrandCartSummary, 
  MOQStatus,
  CartValidation,
  CartValidationError 
} from '../types';
import { productService } from './product.service';

class CartService {
  private carts: Map<string, Cart> = new Map();
  private currentUserId: string | null = null;

  setCurrentUser(userId: string | null) {
    this.currentUserId = userId;
  }

  async getCart(userId?: string): Promise<Cart | null> {
    const uid = userId || this.currentUserId;
    if (!uid) return null;

    let cart = this.carts.get(uid);
    
    if (!cart) {
      // Create new cart
      cart = {
        id: `cart-${uid}`,
        userId: uid,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.carts.set(uid, cart);
    }

    return cart;
  }

  async addToCart(productId: string, quantity: number, userId?: string): Promise<CartItem> {
    const uid = userId || this.currentUserId;
    if (!uid) throw new Error('No user specified');

    const cart = await this.getCart(uid);
    if (!cart) throw new Error('Cart not found');

    const product = await productService.getProductById(productId);
    if (!product) throw new Error('Product not found');

    // Check if item already exists
    const existingItem = cart.items.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.updatedAt = new Date();
      cart.updatedAt = new Date();
      return existingItem;
    }

    // Create new item
    const newItem: CartItem = {
      id: `item-${Date.now()}`,
      cartId: cart.id,
      productId,
      product,
      quantity,
      addedAt: new Date(),
      updatedAt: new Date()
    };

    cart.items.push(newItem);
    cart.updatedAt = new Date();

    return newItem;
  }

  async updateCartItem(itemId: string, quantity: number, userId?: string): Promise<CartItem> {
    const uid = userId || this.currentUserId;
    if (!uid) throw new Error('No user specified');

    const cart = await this.getCart(uid);
    if (!cart) throw new Error('Cart not found');

    const item = cart.items.find(i => i.id === itemId);
    if (!item) throw new Error('Cart item not found');

    if (quantity <= 0) {
      // Remove item
      cart.items = cart.items.filter(i => i.id !== itemId);
    } else {
      item.quantity = quantity;
      item.updatedAt = new Date();
    }

    cart.updatedAt = new Date();
    return item;
  }

  async removeFromCart(itemId: string, userId?: string): Promise<void> {
    const uid = userId || this.currentUserId;
    if (!uid) throw new Error('No user specified');

    const cart = await this.getCart(uid);
    if (!cart) throw new Error('Cart not found');

    cart.items = cart.items.filter(item => item.id !== itemId);
    cart.updatedAt = new Date();
  }

  async clearCart(userId?: string): Promise<void> {
    const uid = userId || this.currentUserId;
    if (!uid) throw new Error('No user specified');

    const cart = await this.getCart(uid);
    if (!cart) return;

    cart.items = [];
    cart.updatedAt = new Date();
  }

  async getCartSummary(userId?: string): Promise<CartSummary | null> {
    const uid = userId || this.currentUserId;
    if (!uid) return null;

    const cart = await this.getCart(uid);
    if (!cart || cart.items.length === 0) return null;

    // Fetch all products
    const productIds = cart.items.map(item => item.productId);
    const products = await Promise.all(
      productIds.map(id => productService.getProductById(id))
    );

    // Build cart item summaries
    const itemSummaries = await Promise.all(
      cart.items.map(async (item) => {
        const product = products.find(p => p?.id === item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);

        // Calculate price based on quantity
        const applicableTier = product.pricing
          .filter(tier => item.quantity >= tier.minQuantity)
          .sort((a, b) => b.minQuantity - a.minQuantity)[0];
        
        const unitPrice = applicableTier?.price || product.pricing[0].price;
        const totalPrice = unitPrice * item.quantity;

        return {
          ...item,
          product,
          unitPrice,
          totalPrice,
          brandId: product.brandId,
          brandName: product.brand?.name || ''
        };
      })
    );

    // Group by brand
    const brandGroups = itemSummaries.reduce((acc, item) => {
      if (!acc[item.brandId]) {
        acc[item.brandId] = [];
      }
      acc[item.brandId].push(item);
      return acc;
    }, {} as Record<string, typeof itemSummaries>);

    // Build brand summaries
    const brandSummaries: BrandCartSummary[] = await Promise.all(
      Object.entries(brandGroups).map(async ([brandId, items]) => {
        const brand = await productService.getBrandById(brandId);
        if (!brand) throw new Error(`Brand ${brandId} not found`);

        const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
        const currentQuantity = items.reduce((sum, item) => sum + (item.totalPrice), 0);
        
        const moqStatus: MOQStatus = {
          isValid: currentQuantity >= brand.moq,
          currentQuantity,
          requiredQuantity: brand.moq,
          percentageComplete: Math.min(100, (currentQuantity / brand.moq) * 100),
          missingQuantity: Math.max(0, brand.moq - currentQuantity)
        };

        return {
          brandId,
          brandName: brand.name,
          items,
          subtotal,
          moq: brand.moq,
          currentQuantity,
          moqStatus
        };
      })
    );

    // Calculate totals
    const subtotal = itemSummaries.reduce((sum, item) => sum + item.totalPrice, 0);
    const estimatedShipping = subtotal > 500 ? 0 : 25; // Free shipping over £500
    const estimatedTax = subtotal * 0.20; // 20% VAT
    const total = subtotal + estimatedShipping + estimatedTax;

    // Check MOQ validity
    const hasValidMOQ = brandSummaries.every(brand => brand.moqStatus.isValid);
    const invalidMOQBrands = brandSummaries
      .filter(brand => !brand.moqStatus.isValid)
      .map(brand => brand.brandId);

    return {
      items: itemSummaries,
      brandSummaries,
      subtotal,
      estimatedShipping,
      estimatedTax,
      total,
      currency: 'GBP',
      hasValidMOQ,
      invalidMOQBrands
    };
  }

  async validateCart(userId?: string): Promise<CartValidation> {
    const uid = userId || this.currentUserId;
    if (!uid) throw new Error('No user specified');

    const summary = await this.getCartSummary(uid);
    if (!summary) {
      return {
        isValid: false,
        errors: [{ type: 'PRODUCT_UNAVAILABLE', message: 'Cart is empty' }],
        warnings: []
      };
    }

    const errors: CartValidationError[] = [];
    const warnings = [];

    // Check MOQ requirements
    summary.brandSummaries.forEach(brand => {
      if (!brand.moqStatus.isValid) {
        errors.push({
          type: 'MOQ_NOT_MET',
          brandId: brand.brandId,
          message: `Minimum order quantity not met for ${brand.brandName}. Required: £${brand.moq}, Current: £${brand.currentQuantity.toFixed(2)}`,
          details: brand.moqStatus
        });
      }
    });

    // Check product availability
    for (const item of summary.items) {
      if (item.product) {
        const isAvailable = await productService.checkProductAvailability(
          item.productId,
          item.quantity
        );
        
        if (!isAvailable) {
          errors.push({
            type: 'INSUFFICIENT_STOCK',
            productId: item.productId,
            message: `Insufficient stock for ${item.product.translations[0]?.name}`,
            details: { requestedQuantity: item.quantity }
          });
        }
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  async getMOQSuggestions(brandId: string, currentTotal: number, userId?: string): Promise<any[]> {
    const brand = await productService.getBrandById(brandId);
    if (!brand) return [];

    const missingAmount = brand.moq - currentTotal;
    if (missingAmount <= 0) return [];

    // Get brand products not in cart
    const brandProducts = await productService.getProductsByBrand(brandId);
    const cart = await this.getCart(userId || this.currentUserId || '');
    const cartProductIds = cart?.items.map(item => item.productId) || [];
    
    const availableProducts = brandProducts
      .filter(p => !cartProductIds.includes(p.id) && p.status === 'ACTIVE')
      .sort((a, b) => a.pricing[0].price - b.pricing[0].price);

    // Suggest products that would help reach MOQ
    const suggestions = availableProducts.slice(0, 3).map(product => {
      const minPrice = product.pricing[0].price;
      const quantityNeeded = Math.ceil(missingAmount / minPrice);
      
      return {
        product,
        suggestedQuantity: Math.max(product.moq, quantityNeeded),
        totalValue: minPrice * Math.max(product.moq, quantityNeeded)
      };
    });

    return suggestions;
  }
}

export const cartService = new CartService();