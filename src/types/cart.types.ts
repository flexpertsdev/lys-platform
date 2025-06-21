import type { Product } from './product.types';

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  product?: Product;
  quantity: number;
  addedAt: Date;
  updatedAt: Date;
}

export interface CartSummary {
  items: CartItemSummary[];
  brandSummaries: BrandCartSummary[];
  subtotal: number;
  estimatedShipping: number;
  estimatedTax: number;
  total: number;
  currency: string;
  hasValidMOQ: boolean;
  invalidMOQBrands: string[];
}

export interface CartItemSummary extends CartItem {
  unitPrice: number;
  totalPrice: number;
  brandId: string;
  brandName: string;
}

export interface BrandCartSummary {
  brandId: string;
  brandName: string;
  items: CartItemSummary[];
  subtotal: number;
  moq: number;
  currentQuantity: number;
  moqStatus: MOQStatus;
}

export interface MOQStatus {
  isValid: boolean;
  currentQuantity: number;
  requiredQuantity: number;
  percentageComplete: number;
  missingQuantity: number;
}

export interface CartValidation {
  isValid: boolean;
  errors: CartValidationError[];
  warnings: CartValidationWarning[];
}

export interface CartValidationError {
  type: 'MOQ_NOT_MET' | 'PRODUCT_UNAVAILABLE' | 'INSUFFICIENT_STOCK';
  brandId?: string;
  productId?: string;
  message: string;
  details?: any;
}

export interface CartValidationWarning {
  type: 'LOW_STOCK' | 'PRICE_CHANGED' | 'PRODUCT_UPDATED';
  productId?: string;
  message: string;
  details?: any;
}