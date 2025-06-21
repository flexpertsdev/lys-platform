import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Package,
  ChevronRight,
  Sparkles,
  Building
} from 'lucide-react';

interface Brand {
  id: string;
  name: string;
  logo?: string;
  description: string;
  location: string;
  rating: number;
  productCount: number;
  certifications: string[];
  featured: boolean;
  category: string;
}

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'Seoul Beauty Co.',
    description: 'Premium K-beauty skincare focused on natural ingredients',
    location: 'Seoul, Korea',
    rating: 4.8,
    productCount: 45,
    certifications: ['CPNP', 'Vegan', 'Cruelty-Free'],
    featured: true,
    category: 'skincare'
  },
  {
    id: '2',
    name: 'K-Glow Beauty',
    description: 'Innovative cosmetics with cutting-edge K-beauty technology',
    location: 'Busan, Korea',
    rating: 4.6,
    productCount: 32,
    certifications: ['CPNP', 'Organic'],
    featured: false,
    category: 'makeup'
  },
  {
    id: '3',
    name: 'Pure Seoul',
    description: 'Minimalist skincare for sensitive skin types',
    location: 'Seoul, Korea',
    rating: 4.9,
    productCount: 28,
    certifications: ['CPNP', 'Hypoallergenic', 'Dermatologist Tested'],
    featured: true,
    category: 'skincare'
  },
  {
    id: '4',
    name: 'Jeju Natural',
    description: 'Natural beauty products sourced from Jeju Island',
    location: 'Jeju, Korea',
    rating: 4.7,
    productCount: 38,
    certifications: ['CPNP', 'Natural', 'Eco-Friendly'],
    featured: false,
    category: 'skincare'
  },
  {
    id: '5',
    name: 'K-Shield',
    description: 'Sun protection specialists with advanced UV technology',
    location: 'Seoul, Korea',
    rating: 4.5,
    productCount: 15,
    certifications: ['CPNP', 'SPF Certified'],
    featured: false,
    category: 'suncare'
  },
  {
    id: '6',
    name: 'Hanbok Beauty',
    description: 'Traditional Korean beauty secrets in modern formulations',
    location: 'Gyeongju, Korea',
    rating: 4.8,
    productCount: 52,
    certifications: ['CPNP', 'Traditional', 'Organic'],
    featured: true,
    category: 'skincare'
  }
];

export const BrandShop: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCertification, setSelectedCertification] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'suncare', label: 'Sun Care' },
    { value: 'haircare', label: 'Hair Care' }
  ];

  const certifications = [
    { value: 'all', label: 'All Certifications' },
    { value: 'CPNP', label: 'CPNP Certified' },
    { value: 'Vegan', label: 'Vegan' },
    { value: 'Cruelty-Free', label: 'Cruelty-Free' },
    { value: 'Organic', label: 'Organic' },
    { value: 'Natural', label: 'Natural' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'products', label: 'Most Products' }
  ];

  // Filter and sort brands
  const filteredBrands = mockBrands
    .filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          brand.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || brand.category === selectedCategory;
      const matchesCertification = selectedCertification === 'all' || 
                                  brand.certifications.includes(selectedCertification);
      return matchesSearch && matchesCategory && matchesCertification;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'products':
          return b.productCount - a.productCount;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-light mb-4">Discover Korean Beauty Brands</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our curated selection of authentic K-beauty brands, all CPNP certified for UK/EU markets
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input input-bordered w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            {/* Category Filter */}
            <select 
              className="select select-bordered w-full"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            {/* Certification Filter */}
            <select 
              className="select select-bordered w-full"
              value={selectedCertification}
              onChange={(e) => setSelectedCertification(e.target.value)}
            >
              {certifications.map(cert => (
                <option key={cert.value} value={cert.value}>{cert.label}</option>
              ))}
            </select>

            {/* Sort */}
            <select 
              className="select select-bordered w-full"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>Sort: {option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredBrands.length} brands
        </p>
        <button className="btn btn-ghost btn-sm">
          <Filter className="h-4 w-4 mr-1" />
          More Filters
        </button>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map(brand => (
          <div key={brand.id} className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="card-body">
              {/* Featured Badge */}
              {brand.featured && (
                <div className="absolute top-4 right-4">
                  <span className="badge badge-primary gap-1">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </span>
                </div>
              )}

              {/* Brand Logo/Placeholder */}
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Building className="h-10 w-10 text-gray-400" />
              </div>

              {/* Brand Info */}
              <h2 className="card-title text-xl font-medium mb-2">{brand.name}</h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{brand.description}</p>

              {/* Location and Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {brand.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-warning fill-warning" />
                  <span className="text-sm font-medium">{brand.rating}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="stats stats-horizontal bg-soft-pink rounded-lg mb-4">
                <div className="stat px-3 py-2">
                  <div className="stat-title text-xs">Products</div>
                  <div className="stat-value text-lg">{brand.productCount}</div>
                </div>
                <div className="stat px-3 py-2">
                  <div className="stat-title text-xs">Certified</div>
                  <div className="stat-value text-lg">{brand.certifications.length}</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-1 mb-4">
                {brand.certifications.map(cert => (
                  <span key={cert} className="badge badge-outline badge-sm">
                    {cert}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="card-actions">
                <Link 
                  to={`/brands/${brand.id}`} 
                  className="btn btn-primary btn-block"
                >
                  View Products
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredBrands.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No brands found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Load More */}
      {filteredBrands.length > 6 && (
        <div className="text-center">
          <button className="btn btn-outline">
            Load More Brands
          </button>
        </div>
      )}
    </div>
  );
};