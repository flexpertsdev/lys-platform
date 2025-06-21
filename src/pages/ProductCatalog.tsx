import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Container, Grid, GridItem, Stack } from '../components/ui/Grid';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ProductCard, Card, CardBody } from '../components/ui/Card';
import { Badge, CertificationBadge, StatusBadge } from '../components/ui/Badge';
import { productService } from '../services/product.service';
import { Product, ProductFilters, Brand, Category } from '../types';
import toast from 'react-hot-toast';
import { useCartStore } from '../stores/cart.store';

export const ProductCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProductFilters>({
    brandIds: [],
    categoryIds: [],
    certifications: [],
    sortBy: 'newest',
    sortOrder: 'desc',
  });
  const [showFilters, setShowFilters] = useState(false);

  const { addToCart } = useCartStore();

  // Fetch products
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', filters, searchQuery],
    queryFn: () => productService.getProducts({ ...filters, search: searchQuery }),
  });

  // Fetch brands and categories for filters
  const { data: brands } = useQuery({
    queryKey: ['brands'],
    queryFn: () => productService.getBrands(),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productService.getCategories(),
  });

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id, product.moq);
      toast.success(`Added ${product.translations[0]?.name} to cart`);
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  const toggleBrandFilter = (brandId: string) => {
    setFilters(prev => ({
      ...prev,
      brandIds: prev.brandIds?.includes(brandId)
        ? prev.brandIds.filter(id => id !== brandId)
        : [...(prev.brandIds || []), brandId],
    }));
  };

  const toggleCategoryFilter = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categoryIds: prev.categoryIds?.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...(prev.categoryIds || []), categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-xl">
        <Container>
          <Stack spacing="lg" align="center" className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-base-content">
              Premium K-Beauty Products
            </h1>
            <p className="text-lg text-base-content/70 max-w-2xl">
              Discover authentic Korean beauty brands with verified CPNP certifications.
              All products meet minimum order quantities for B2B wholesale.
            </p>
            
            {/* Search Bar */}
            <div className="w-full max-w-2xl mt-lg">
              <Input
                type="search"
                placeholder="Search products, brands, or ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="h-5 w-5 text-base-content/50" />}
                size="lg"
              />
            </div>
          </Stack>
        </Container>
      </section>

      {/* Filters and Products */}
      <Container className="py-2xl">
        <Grid cols={4} gap="xl">
          {/* Filters Sidebar */}
          <GridItem colSpan={4} className="lg:col-span-1">
            <div className="lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-lg">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide' : 'Show'}
                </Button>
              </div>

              <div className={`space-y-lg ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Brands Filter */}
                <Card variant="bordered" padding="md">
                  <h3 className="font-medium mb-md">Brands</h3>
                  <Stack spacing="sm">
                    {brands?.map((brand: Brand) => (
                      <label key={brand.id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm mr-2"
                          checked={filters.brandIds?.includes(brand.id) || false}
                          onChange={() => toggleBrandFilter(brand.id)}
                        />
                        <span className="text-sm">{brand.name}</span>
                      </label>
                    ))}
                  </Stack>
                </Card>

                {/* Categories Filter */}
                <Card variant="bordered" padding="md">
                  <h3 className="font-medium mb-md">Categories</h3>
                  <Stack spacing="sm">
                    {categories?.map((category: Category) => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary checkbox-sm mr-2"
                          checked={filters.categoryIds?.includes(category.id) || false}
                          onChange={() => toggleCategoryFilter(category.id)}
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </Stack>
                </Card>

                {/* Sort Options */}
                <Card variant="bordered" padding="md">
                  <h3 className="font-medium mb-md">Sort By</h3>
                  <select
                    className="select select-bordered select-sm w-full"
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                  >
                    <option value="newest">Newest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="moq">MOQ: Low to High</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </Card>
              </div>
            </div>
          </GridItem>

          {/* Products Grid */}
          <GridItem colSpan={4} className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-lg">
              <p className="text-sm text-base-content/70">
                {productsData?.metadata?.totalCount || 0} products found
              </p>
              <div className="flex items-center space-x-sm">
                <span className="text-sm text-base-content/70">View:</span>
                <div className="btn-group">
                  <button className="btn btn-sm btn-active">Grid</button>
                  <button className="btn btn-sm">List</button>
                </div>
              </div>
            </div>

            {/* Products */}
            {productsLoading ? (
              <div className="flex items-center justify-center py-3xl">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : productsData?.data?.length === 0 ? (
              <Card className="text-center py-3xl">
                <CardBody>
                  <p className="text-lg text-base-content/70">No products found</p>
                  <p className="text-sm text-base-content/50 mt-sm">
                    Try adjusting your filters or search query
                  </p>
                </CardBody>
              </Card>
            ) : (
              <Grid cols={3} gap="lg">
                {productsData?.data?.map((product: Product) => {
                  const translation = product.translations.find(t => t.languageCode === 'en');
                  const minPrice = Math.min(...product.pricing.map(p => p.price));
                  
                  return (
                    <ProductCard
                      key={product.id}
                      image={product.images[0]?.url || 'https://via.placeholder.com/400x400'}
                      imageAlt={translation?.name}
                      badge={<StatusBadge status={product.status} />}
                      onImageClick={() => window.location.href = `/products/${product.id}`}
                    >
                      <Stack spacing="sm">
                        {/* Brand */}
                        <p className="text-xs text-base-content/70">{product.brand?.name}</p>
                        
                        {/* Product Name */}
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-medium text-base hover:text-primary transition-colors line-clamp-2">
                            {translation?.name}
                          </h3>
                        </Link>

                        {/* Certifications */}
                        <div className="flex flex-wrap gap-xs">
                          {product.certifications.slice(0, 3).map((cert, idx) => (
                            <CertificationBadge key={idx} certification={cert.type} />
                          ))}
                          {product.certifications.length > 3 && (
                            <Badge variant="ghost" size="sm">
                              +{product.certifications.length - 3}
                            </Badge>
                          )}
                        </div>

                        {/* Price and MOQ */}
                        <div className="space-y-xs">
                          <p className="text-lg font-semibold">
                            From £{minPrice.toFixed(2)}
                          </p>
                          <p className="text-sm text-base-content/70">
                            MOQ: {product.moq} units
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="pt-sm space-y-sm">
                          <Button
                            variant="primary"
                            size="sm"
                            fullWidth
                            onClick={() => handleAddToCart(product)}
                            disabled={product.status !== 'ACTIVE'}
                          >
                            Add to Cart
                          </Button>
                          <Link to={`/products/${product.id}`}>
                            <Button variant="outline" size="sm" fullWidth>
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </Stack>
                    </ProductCard>
                  );
                })}
              </Grid>
            )}

            {/* Pagination */}
            {productsData?.metadata && productsData.metadata.totalPages > 1 && (
              <div className="flex justify-center mt-2xl">
                <div className="btn-group">
                  {Array.from({ length: productsData.metadata.totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`btn btn-sm ${
                        productsData.metadata.page === i + 1 ? 'btn-active' : ''
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </GridItem>
        </Grid>
      </Container>
    </div>
  );
};