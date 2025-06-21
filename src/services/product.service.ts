import type { Product, ProductFilters, Brand, Category, ApiResponse, PaginationParams } from '../types';
import { mockProducts, mockBrands, mockCategories } from '../mock/products.mock';

class ProductService {
  private products: Product[] = [...mockProducts];
  private brands: Brand[] = [...mockBrands];
  private categories: Category[] = [...mockCategories];

  // Product methods
  async getProducts(
    filters?: ProductFilters,
    pagination?: PaginationParams
  ): Promise<ApiResponse<Product[]>> {
    let filteredProducts = [...this.products];

    // Apply filters
    if (filters) {
      if (filters.brandIds?.length) {
        filteredProducts = filteredProducts.filter(p => 
          filters.brandIds!.includes(p.brandId)
        );
      }

      if (filters.categoryIds?.length) {
        filteredProducts = filteredProducts.filter(p => 
          filters.categoryIds!.includes(p.category.id)
        );
      }

      if (filters.certifications?.length) {
        filteredProducts = filteredProducts.filter(p => 
          filters.certifications!.some(cert => 
            p.certifications.some(pCert => pCert.type === cert)
          )
        );
      }

      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(p => {
          const minPrice = Math.min(...p.pricing.map(tier => tier.price));
          return minPrice >= filters.priceRange!.min && 
                 minPrice <= filters.priceRange!.max;
        });
      }

      if (filters.moqRange) {
        filteredProducts = filteredProducts.filter(p => 
          p.moq >= filters.moqRange!.min && 
          p.moq <= filters.moqRange!.max
        );
      }

      if (filters.status?.length) {
        filteredProducts = filteredProducts.filter(p => 
          filters.status!.includes(p.status)
        );
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => {
          const enTranslation = p.translations.find(t => t.languageCode === 'en');
          return enTranslation?.name.toLowerCase().includes(searchLower) ||
                 enTranslation?.description.toLowerCase().includes(searchLower) ||
                 p.sku.toLowerCase().includes(searchLower) ||
                 p.tags.some(tag => tag.toLowerCase().includes(searchLower));
        });
      }
    }

    // Apply sorting
    if (filters?.sortBy) {
      filteredProducts.sort((a, b) => {
        let comparison = 0;
        
        switch (filters.sortBy) {
          case 'price':
            const aMinPrice = Math.min(...a.pricing.map(t => t.price));
            const bMinPrice = Math.min(...b.pricing.map(t => t.price));
            comparison = aMinPrice - bMinPrice;
            break;
          case 'moq':
            comparison = a.moq - b.moq;
            break;
          case 'newest':
            comparison = b.createdAt.getTime() - a.createdAt.getTime();
            break;
          case 'name':
            const aName = a.translations.find(t => t.languageCode === 'en')?.name || '';
            const bName = b.translations.find(t => t.languageCode === 'en')?.name || '';
            comparison = aName.localeCompare(bName);
            break;
        }
        
        return filters.sortOrder === 'desc' ? -comparison : comparison;
      });
    }

    // Apply pagination
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 20;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return {
      success: true,
      data: paginatedProducts,
      metadata: {
        page,
        pageSize,
        totalCount: filteredProducts.length,
        totalPages: Math.ceil(filteredProducts.length / pageSize)
      }
    };
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async getProductsBySku(skus: string[]): Promise<Product[]> {
    return this.products.filter(p => skus.includes(p.sku));
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchLower = query.toLowerCase();
    return this.products.filter(p => {
      const enTranslation = p.translations.find(t => t.languageCode === 'en');
      return enTranslation?.name.toLowerCase().includes(searchLower) ||
             enTranslation?.description.toLowerCase().includes(searchLower) ||
             p.sku.toLowerCase().includes(searchLower) ||
             p.tags.some(tag => tag.toLowerCase().includes(searchLower));
    });
  }

  // Brand methods
  async getBrands(): Promise<Brand[]> {
    return [...this.brands];
  }

  async getBrandById(id: string): Promise<Brand | null> {
    return this.brands.find(b => b.id === id) || null;
  }

  async getProductsByBrand(brandId: string): Promise<Product[]> {
    return this.products.filter(p => p.brandId === brandId);
  }

  // Category methods
  async getCategories(): Promise<Category[]> {
    return [...this.categories];
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.categories.find(c => c.id === id) || null;
  }

  async getCategoryTree(): Promise<Category[]> {
    // Return only root categories with nested structure
    return this.categories.filter(c => !c.parentId);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return this.products.filter(p => 
      p.category.id === categoryId || p.subcategory?.id === categoryId
    );
  }

  // Utility methods
  async getProductRecommendations(productId: string, limit: number = 4): Promise<Product[]> {
    const product = await this.getProductById(productId);
    if (!product) return [];

    // Simple recommendation logic: same category, different product
    const recommendations = this.products
      .filter(p => 
        p.id !== productId && 
        p.category.id === product.category.id &&
        p.status === 'ACTIVE'
      )
      .slice(0, limit);

    return recommendations;
  }

  async checkProductAvailability(productId: string, quantity: number): Promise<boolean> {
    const product = await this.getProductById(productId);
    if (!product || !product.stock) return false;

    return product.stock.available - product.stock.reserved >= quantity;
  }

  // Mock data refresh (for development)
  async refreshMockData(): Promise<void> {
    // Re-import mock data
    const freshMockData = await import('../mock/products.mock');
    const freshProducts = freshMockData.mockProducts;
    const freshBrands = freshMockData.mockBrands;
    const freshCategories = freshMockData.mockCategories;
    
    this.products = [...freshProducts];
    this.brands = [...freshBrands];
    this.categories = [...freshCategories];
  }
}

export const productService = new ProductService();