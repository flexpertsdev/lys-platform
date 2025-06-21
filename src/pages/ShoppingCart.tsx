import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart as CartIcon, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  ArrowRight,
  Package,
  Info,
  Tag
} from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface CartItemData {
  id: string;
  productId: string;
  productName: string;
  brandName: string;
  variantName: string;
  price: number;
  quantity: number;
  moq: number;
  image?: string;
}

// Mock cart items - replace with real data
const mockCartItems: CartItemData[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Snail Mucin 96% Power Essence',
    brandName: 'Seoul Beauty Co.',
    variantName: '100ml',
    price: 25.00,
    quantity: 24,
    moq: 12
  },
  {
    id: '2',
    productId: '2',
    productName: 'Vitamin C Brightening Serum',
    brandName: 'K-Glow Beauty',
    variantName: '30ml',
    price: 35.00,
    quantity: 12,
    moq: 6
  },
  {
    id: '3',
    productId: '3',
    productName: 'Green Tea Seed Cream',
    brandName: 'Pure Seoul',
    variantName: '50ml',
    price: 42.00,
    quantity: 12,
    moq: 12
  }
];

export const ShoppingCart: React.FC = () => {
  const [promoCode, setPromoCode] = React.useState('');
  const [cartItems, setCartItems] = React.useState(mockCartItems);

  const handleQuantityChange = (itemId: string, delta: number, moq: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= moq && newQuantity % moq === 0) {
          return { ...item, quantity: newQuantity };
        }
      }
      return item;
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over £500
  const tax = subtotal * 0.20; // 20% VAT
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <CartIcon className="h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-light mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Start adding products to your cart to see them here. Remember to meet the minimum order quantities!
        </p>
        <Link to="/catalog" className="btn btn-primary">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-light">Shopping Cart</h1>
        <Link to="/catalog" className="btn btn-ghost btn-sm">
          <ArrowLeft className="h-4 w-4" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="h-12 w-12 text-gray-300" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/products/${item.productId}`} className="hover:text-rose-gold">
                            {item.productName}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600">{item.brandName}</p>
                        <p className="text-sm text-gray-500">{item.variantName}</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="btn btn-ghost btn-circle btn-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      {/* Quantity Controls */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Quantity (MOQ: {item.moq})</p>
                        <div className="join">
                          <button 
                            className="btn btn-sm join-item"
                            onClick={() => handleQuantityChange(item.id, -item.moq, item.moq)}
                            disabled={item.quantity <= item.moq}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <div className="join-item px-4 flex items-center bg-base-200 text-sm">
                            {item.quantity}
                          </div>
                          <button 
                            className="btn btn-sm join-item"
                            onClick={() => handleQuantityChange(item.id, item.moq, item.moq)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-gray-500">£{item.price.toFixed(2)} each</p>
                        <p className="text-lg font-medium">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Promo Code */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h3 className="font-medium mb-3">Have a promo code?</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input input-bordered flex-1"
                />
                <button className="btn btn-primary">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-sm sticky top-20">
            <div className="card-body">
              <h2 className="card-title text-xl font-light mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="alert alert-info py-2">
                    <Info className="h-4 w-4" />
                    <span className="text-xs">
                      Add £{(500 - subtotal).toFixed(2)} more for free shipping
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (20%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                <div className="divider my-2"></div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-2xl font-light">{formatCurrency(total)}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn btn-primary w-full mt-6">
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package className="h-4 w-4" />
                  <span>Estimated delivery: 3-5 business days</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Tag className="h-4 w-4" />
                  <span>Bulk discounts available on large orders</span>
                </div>
              </div>
            </div>
          </div>

          {/* Help Card */}
          <div className="card bg-soft-pink mt-4">
            <div className="card-body">
              <h3 className="font-medium mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Our B2B specialists are here to assist with your order
              </p>
              <button className="btn btn-sm btn-outline">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};