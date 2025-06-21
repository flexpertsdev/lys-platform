export interface Product {
  id: string;
  brandId: string;
  brand?: Brand;
  sku: string;
  status: ProductStatus;
  moq: number;
  cartonQuantity: number;
  certifications: Certification[];
  images: ProductImage[];
  pricing: PriceTier[];
  category: Category;
  subcategory?: Category;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  translations: ProductTranslation[];
  stock?: StockInfo;
}

export interface ProductTranslation {
  productId: string;
  languageCode: 'en' | 'ko' | 'zh';
  name: string;
  description: string;
  ingredients?: string;
  howToUse?: string;
  benefits?: string[];
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  country: string;
  website?: string;
  moq: number;
  certifications: Certification[];
  isVerified: boolean;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  level: number;
  translations: CategoryTranslation[];
}

export interface CategoryTranslation {
  categoryId: string;
  languageCode: 'en' | 'ko' | 'zh';
  name: string;
  description?: string;
}

export interface Certification {
  type: 'CPNP_UK' | 'CPNP_EU' | 'CPNP_CH' | 'FDA' | 'KFDA' | 'ORGANIC' | 'VEGAN' | 'CRUELTY_FREE';
  documentUrl?: string;
  expiryDate?: Date;
  issuedDate: Date;
  verificationId?: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface PriceTier {
  minQuantity: number;
  maxQuantity?: number;
  price: number;
  currency: 'USD' | 'EUR' | 'GBP' | 'KRW';
}

export interface StockInfo {
  available: number;
  reserved: number;
  incoming?: {
    quantity: number;
    expectedDate: Date;
  };
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
  COMING_SOON = 'COMING_SOON'
}

export interface ProductFilters {
  brandIds?: string[];
  categoryIds?: string[];
  certifications?: Certification['type'][];
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  moqRange?: {
    min: number;
    max: number;
  };
  search?: string;
  status?: ProductStatus[];
  sortBy?: 'price' | 'moq' | 'newest' | 'name';
  sortOrder?: 'asc' | 'desc';
}