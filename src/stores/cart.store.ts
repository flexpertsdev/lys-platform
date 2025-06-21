import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, CartSummary, CartValidation } from '../types';
import { cartService } from '../services/cart.service';

interface CartStore {
  cart: Cart | null;
  summary: CartSummary | null;
  validation: CartValidation | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  initCart: (userId: string) => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  removeItem: (itemId: string) => void;
  addItem: (item: { productId: string; variantId?: string; quantity: number; price: number }) => void;
  clearCart: () => Promise<void>;
  refreshSummary: () => Promise<void>;
  validateCart: () => Promise<CartValidation>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      // Initial state
      cart: null,
      summary: null,
      validation: null,
      isLoading: false,
      error: null,

      // Actions
      initCart: async (userId) => {
        set({ isLoading: true, error: null });
        try {
          cartService.setCurrentUser(userId);
          const cart = await cartService.getCart(userId);
          const summary = cart ? await cartService.getCartSummary(userId) : null;
          set({ 
            cart, 
            summary,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to initialize cart' 
          });
        }
      },

      addToCart: async (productId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.addToCart(productId, quantity);
          const cart = await cartService.getCart();
          const summary = await cartService.getCartSummary();
          set({ 
            cart, 
            summary,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to add to cart' 
          });
          throw error;
        }
      },

      updateQuantity: async (itemId, quantity) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.updateCartItem(itemId, quantity);
          const cart = await cartService.getCart();
          const summary = await cartService.getCartSummary();
          set({ 
            cart, 
            summary,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to update quantity' 
          });
        }
      },

      removeFromCart: async (itemId) => {
        set({ isLoading: true, error: null });
        try {
          await cartService.removeFromCart(itemId);
          const cart = await cartService.getCart();
          const summary = await cartService.getCartSummary();
          set({ 
            cart, 
            summary,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to remove item' 
          });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });
        try {
          await cartService.clearCart();
          const cart = await cartService.getCart();
          set({ 
            cart, 
            summary: null,
            validation: null,
            isLoading: false,
            error: null 
          });
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to clear cart' 
          });
        }
      },

      removeItem: (itemId) => {
        // Synchronous version for immediate UI updates
        const cart = useCartStore.getState().cart;
        if (cart) {
          cart.items = cart.items.filter(item => item.id !== itemId);
          set({ cart });
        }
      },

      addItem: (item) => {
        // Synchronous version for immediate UI updates
        const productId = item.productId;
        const quantity = item.quantity;
        // For demo purposes, just call addToCart
        useCartStore.getState().addToCart(productId, quantity);
      },

      refreshSummary: async () => {
        try {
          const summary = await cartService.getCartSummary();
          set({ summary });
        } catch (error) {
          console.error('Failed to refresh cart summary:', error);
        }
      },

      validateCart: async () => {
        set({ isLoading: true, error: null });
        try {
          const validation = await cartService.validateCart();
          set({ 
            validation,
            isLoading: false,
            error: null 
          });
          return validation;
        } catch (error) {
          set({ 
            isLoading: false, 
            error: error instanceof Error ? error.message : 'Failed to validate cart' 
          });
          throw error;
        }
      }
    }),
    {
      name: 'lys-cart-store',
      partialize: (state) => ({ 
        cart: state.cart
      })
    }
  )
);