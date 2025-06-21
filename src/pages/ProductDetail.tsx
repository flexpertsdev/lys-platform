import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
  Truck,
  Shield,
  Info,
  Package,
  Minus,
  Plus
} from 'lucide-react';
import { useCartStore } from '../stores/cart.store';
import toast from 'react-hot-toast';


export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCartStore();
  
  const [selectedVariant, setSelectedVariant] = useState<string>('variant-1');
  const [quantity, setQuantity] = useState(12); // Start at MOQ
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // Mock product data - replace with real data
  const product = {
    id: id || '1',
    name: 'Snail Mucin 96% Power Essence',
    brand: 'Seoul Beauty Co.',
    brandId: '1',
    description: 'A lightweight essence formulated with 96% Snail Secretion Filtrate to hydrate and repair skin. This K-beauty bestseller helps improve skin texture, reduce acne scars, and boost overall radiance.',
    price: 25.00,
    moq: 12,
    category: 'Skincare',
    subcategory: 'Essences',
    rating: 4.8,
    reviewCount: 156,
    ingredients: 'Snail Secretion Filtrate (96%), Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Hyaluronate, Panthenol, Arginine, Allantoin, Ethyl Hexanediol, Phenoxyethanol',
    usage: 'After cleansing and toning, apply a small amount to face and pat gently for absorption. Use morning and evening for best results.',
    certifications: ['CPNP Certified', 'Cruelty-Free', 'EWG Green Grade'],
    images: [
      '/products/snail-essence-1.jpg',
      '/products/snail-essence-2.jpg',
      '/products/snail-essence-3.jpg',
      '/products/snail-essence-4.jpg'
    ],
    variants: [
      { id: 'variant-1', name: '100ml', price: 25.00, inStock: true },
      { id: 'variant-2', name: '60ml', price: 18.00, inStock: true },
      { id: 'variant-3', name: '30ml Travel Size', price: 12.00, inStock: false }
    ],
    shipping: {
      estimatedDays: '3-5',
      cost: 'Free on orders over £500'
    },
    inStock: true,
    stockLevel: 'High'
  };

  const currentVariant = product.variants.find(v => v.id === selectedVariant) || product.variants[0];
  const totalPrice = currentVariant.price * quantity;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= product.moq && newQuantity % product.moq === 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant,
      quantity,
      price: currentVariant.price
    });
    toast.success('Added to cart!');
  };

  const handleSaveProduct = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'Removed from saved items' : 'Added to saved items');
  };

  const relatedProducts = [
    { id: '2', name: 'Advanced Snail 92 Cream', price: 28.00, moq: 12 },
    { id: '3', name: 'Snail Bee Essence', price: 32.00, moq: 6 },
    { id: '4', name: 'Black Snail Collagen Serum', price: 35.00, moq: 12 },
    { id: '5', name: 'Snail Recovery Gel Cream', price: 22.00, moq: 24 }
  ];

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm breadcrumbs">
        <ul>
          <li><Link to="/catalog">Products</Link></li>
          <li><Link to="/catalog?category=skincare">Skincare</Link></li>
          <li>{product.name}</li>
        </ul>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="h-24 w-24 text-gray-300" />
            </div>
            {/* Navigation Arrows */}
            <button 
              className="btn btn-circle btn-sm absolute left-4 top-1/2 -translate-y-1/2"
              onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
              disabled={activeImageIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button 
              className="btn btn-circle btn-sm absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => setActiveImageIndex(Math.min(product.images.length - 1, activeImageIndex + 1))}
              disabled={activeImageIndex === product.images.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                  activeImageIndex === index ? 'border-rose-gold' : 'border-transparent'
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <Link to={`/brands/${product.brandId}`} className="text-sm text-rose-gold hover:text-rose-gold-dark">
              {product.brand}
            </Link>
            <h1 className="text-3xl font-light mt-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-warning fill-warning' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-600">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Price and MOQ */}
          <div className="card bg-soft-pink">
            <div className="card-body">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-3xl font-light">£{currentVariant.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-600 mt-1">per unit</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Min. Order</p>
                  <p className="text-xl font-medium">{product.moq} units</p>
                </div>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h3 className="text-sm font-medium mb-3">Select Size</h3>
            <div className="flex gap-2">
              {product.variants.map(variant => (
                <button
                  key={variant.id}
                  className={`btn ${selectedVariant === variant.id ? 'btn-primary' : 'btn-outline'} ${!variant.inStock ? 'btn-disabled' : ''}`}
                  onClick={() => setSelectedVariant(variant.id)}
                  disabled={!variant.inStock}
                >
                  {variant.name}
                  {!variant.inStock && <span className="text-xs ml-1">(Out of Stock)</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity (multiples of {product.moq})</h3>
            <div className="flex items-center gap-4">
              <div className="join">
                <button 
                  className="btn join-item"
                  onClick={() => handleQuantityChange(-product.moq)}
                  disabled={quantity <= product.moq}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  readOnly
                  className="input input-bordered join-item w-24 text-center"
                />
                <button 
                  className="btn join-item"
                  onClick={() => handleQuantityChange(product.moq)}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="text-right flex-1">
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="text-2xl font-light">£{totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button 
              className="btn btn-primary flex-1"
              onClick={handleAddToCart}
              disabled={!currentVariant.inStock}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button 
              className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'}`}
              onClick={handleSaveProduct}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button className="btn btn-outline">
              <Share2 className="h-5 w-5" />
            </button>
          </div>

          {/* Shipping Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-sm text-gray-600">{product.shipping.estimatedDays} business days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium">Authentic Product Guarantee</p>
                <p className="text-sm text-gray-600">All products are verified and CPNP certified</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-wrap gap-2">
            {product.certifications.map(cert => (
              <span key={cert} className="badge badge-outline">
                <Check className="h-3 w-3 mr-1" />
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="product-tabs" role="tab" className="tab" aria-label="Description" defaultChecked />
            <div role="tabpanel" className="tab-content pt-6">
              <h3 className="text-lg font-medium mb-3">Product Description</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              <h4 className="font-medium mb-2">Key Benefits:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Hydrates and repairs damaged skin</li>
                <li>Improves skin texture and elasticity</li>
                <li>Helps fade acne scars and hyperpigmentation</li>
                <li>Suitable for all skin types</li>
              </ul>
            </div>

            <input type="radio" name="product-tabs" role="tab" className="tab" aria-label="Ingredients" />
            <div role="tabpanel" className="tab-content pt-6">
              <h3 className="text-lg font-medium mb-3">Full Ingredients</h3>
              <p className="text-gray-600 mb-4">{product.ingredients}</p>
              
              <div className="alert alert-info">
                <Info className="h-4 w-4" />
                <span>This product is free from parabens, sulfates, and artificial fragrances</span>
              </div>
            </div>

            <input type="radio" name="product-tabs" role="tab" className="tab" aria-label="How to Use" />
            <div role="tabpanel" className="tab-content pt-6">
              <h3 className="text-lg font-medium mb-3">How to Use</h3>
              <p className="text-gray-600">{product.usage}</p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Pro Tips:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Layer with other essences for enhanced benefits</li>
                  <li>Pat gently instead of rubbing for better absorption</li>
                  <li>Can be mixed with foundation for a dewy glow</li>
                </ul>
              </div>
            </div>

            <input type="radio" name="product-tabs" role="tab" className="tab" aria-label="Shipping" />
            <div role="tabpanel" className="tab-content pt-6">
              <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <strong>Estimated Delivery:</strong> {product.shipping.estimatedDays} business days after order confirmation
                </p>
                <p className="text-gray-600">
                  <strong>Shipping Cost:</strong> {product.shipping.cost}
                </p>
                <p className="text-gray-600">
                  <strong>Bulk Orders:</strong> Contact us for special rates on orders over 500 units
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-2xl font-light mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedProducts.map(related => (
            <Link 
              key={related.id} 
              to={`/products/${related.id}`}
              className="card card-compact bg-base-100 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <figure className="aspect-square bg-gray-100">
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="h-12 w-12 text-gray-300" />
                </div>
              </figure>
              <div className="card-body">
                <h3 className="text-sm font-medium line-clamp-2">{related.name}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-light">£{related.price.toFixed(2)}</p>
                  <p className="text-xs text-gray-500">MOQ: {related.moq}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};