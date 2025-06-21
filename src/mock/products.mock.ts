import type { Product, Brand, Category } from '../types';
import { ProductStatus } from '../types';

export const mockBrands: Brand[] = [
  {
    id: 'brand-1',
    name: 'Seoul Glow',
    logo: 'https://via.placeholder.com/200x100',
    description: 'Premium K-beauty brand specializing in innovative skincare solutions',
    country: 'KR',
    website: 'https://seoulglowbeauty.com',
    moq: 5000,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15')
      },
      {
        type: 'CPNP_EU',
        issuedDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15')
      }
    ],
    isVerified: true,
    createdAt: new Date('2023-01-01')
  },
  {
    id: 'brand-2',
    name: 'Hanbok Beauty',
    logo: 'https://via.placeholder.com/200x100',
    description: 'Traditional Korean beauty secrets meets modern science',
    country: 'KR',
    website: 'https://hanbokbeauty.kr',
    moq: 3000,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-03-20'),
        expiryDate: new Date('2026-03-20')
      },
      {
        type: 'VEGAN',
        issuedDate: new Date('2023-01-01')
      },
      {
        type: 'CRUELTY_FREE',
        issuedDate: new Date('2023-01-01')
      }
    ],
    isVerified: true,
    createdAt: new Date('2023-02-15')
  },
  {
    id: 'brand-3',
    name: 'Jeju Essence',
    logo: 'https://via.placeholder.com/200x100',
    description: 'Natural beauty products from Jeju Island',
    country: 'KR',
    website: 'https://jejuessence.com',
    moq: 4000,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-06-01'),
        expiryDate: new Date('2026-06-01')
      },
      {
        type: 'ORGANIC',
        issuedDate: new Date('2023-06-01')
      }
    ],
    isVerified: true,
    createdAt: new Date('2023-03-10')
  }
];

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Skincare',
    slug: 'skincare',
    level: 0,
    translations: [
      { categoryId: 'cat-1', languageCode: 'en', name: 'Skincare' },
      { categoryId: 'cat-1', languageCode: 'ko', name: '스킨케어' },
      { categoryId: 'cat-1', languageCode: 'zh', name: '护肤' }
    ]
  },
  {
    id: 'cat-1-1',
    name: 'Cleansers',
    slug: 'cleansers',
    parentId: 'cat-1',
    level: 1,
    translations: [
      { categoryId: 'cat-1-1', languageCode: 'en', name: 'Cleansers' },
      { categoryId: 'cat-1-1', languageCode: 'ko', name: '클렌저' },
      { categoryId: 'cat-1-1', languageCode: 'zh', name: '洁面' }
    ]
  },
  {
    id: 'cat-1-2',
    name: 'Moisturizers',
    slug: 'moisturizers',
    parentId: 'cat-1',
    level: 1,
    translations: [
      { categoryId: 'cat-1-2', languageCode: 'en', name: 'Moisturizers' },
      { categoryId: 'cat-1-2', languageCode: 'ko', name: '모이스처라이저' },
      { categoryId: 'cat-1-2', languageCode: 'zh', name: '保湿霜' }
    ]
  },
  {
    id: 'cat-1-3',
    name: 'Serums',
    slug: 'serums',
    parentId: 'cat-1',
    level: 1,
    translations: [
      { categoryId: 'cat-1-3', languageCode: 'en', name: 'Serums' },
      { categoryId: 'cat-1-3', languageCode: 'ko', name: '세럼' },
      { categoryId: 'cat-1-3', languageCode: 'zh', name: '精华' }
    ]
  },
  {
    id: 'cat-1-4',
    name: 'Masks',
    slug: 'masks',
    parentId: 'cat-1',
    level: 1,
    translations: [
      { categoryId: 'cat-1-4', languageCode: 'en', name: 'Masks' },
      { categoryId: 'cat-1-4', languageCode: 'ko', name: '마스크' },
      { categoryId: 'cat-1-4', languageCode: 'zh', name: '面膜' }
    ]
  }
];

export const mockProducts: Product[] = [
  // Seoul Glow Products
  {
    id: 'prod-1',
    brandId: 'brand-1',
    brand: mockBrands[0],
    sku: 'SG-CLN-001',
    status: ProductStatus.ACTIVE,
    moq: 100,
    cartonQuantity: 24,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15'),
        documentUrl: 'https://example.com/cert1.pdf'
      }
    ],
    images: [
      {
        id: 'img-1',
        url: 'https://via.placeholder.com/400x400',
        alt: 'Glass Skin Cleanser',
        isPrimary: true,
        order: 0
      }
    ],
    pricing: [
      { minQuantity: 100, maxQuantity: 499, price: 12.50, currency: 'GBP' },
      { minQuantity: 500, maxQuantity: 999, price: 11.00, currency: 'GBP' },
      { minQuantity: 1000, price: 9.50, currency: 'GBP' }
    ],
    category: mockCategories[1],
    subcategory: mockCategories[1],
    tags: ['cleanser', 'glass-skin', 'gentle'],
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2024-01-15'),
    translations: [
      {
        productId: 'prod-1',
        languageCode: 'en',
        name: 'Glass Skin Gentle Foam Cleanser',
        description: 'A luxurious foam cleanser that gently removes impurities while maintaining skin\'s moisture barrier. Formulated with green tea extract and hyaluronic acid.',
        ingredients: 'Water, Glycerin, Sodium Cocoyl Isethionate, Green Tea Extract, Hyaluronic Acid, Niacinamide',
        howToUse: 'Apply to wet face, massage gently, rinse with lukewarm water.',
        benefits: ['Deep cleansing', 'Hydrating', 'Suitable for sensitive skin']
      },
      {
        productId: 'prod-1',
        languageCode: 'ko',
        name: '글래스 스킨 젠틀 폼 클렌저',
        description: '피부의 수분 장벽을 유지하면서 부드럽게 불순물을 제거하는 고급 폼 클렌저. 녹차 추출물과 히알루론산 함유.',
        ingredients: '정제수, 글리세린, 소듐코코일이세티오네이트, 녹차추출물, 히알루론산, 나이아신아마이드',
        howToUse: '젖은 얼굴에 바르고 부드럽게 마사지한 후 미온수로 헹구세요.',
        benefits: ['딥 클렌징', '수분 공급', '민감성 피부 적합']
      }
    ],
    stock: {
      available: 5000,
      reserved: 200,
      incoming: {
        quantity: 10000,
        expectedDate: new Date('2024-02-01')
      }
    }
  },
  {
    id: 'prod-2',
    brandId: 'brand-1',
    brand: mockBrands[0],
    sku: 'SG-SRM-002',
    status: ProductStatus.ACTIVE,
    moq: 100,
    cartonQuantity: 48,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15')
      },
      {
        type: 'CPNP_EU',
        issuedDate: new Date('2023-01-15'),
        expiryDate: new Date('2026-01-15')
      }
    ],
    images: [
      {
        id: 'img-2',
        url: 'https://via.placeholder.com/400x400',
        alt: 'Vitamin C Serum',
        isPrimary: true,
        order: 0
      }
    ],
    pricing: [
      { minQuantity: 100, maxQuantity: 499, price: 18.00, currency: 'GBP' },
      { minQuantity: 500, maxQuantity: 999, price: 16.50, currency: 'GBP' },
      { minQuantity: 1000, price: 15.00, currency: 'GBP' }
    ],
    category: mockCategories[3],
    tags: ['serum', 'vitamin-c', 'brightening'],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2024-01-20'),
    translations: [
      {
        productId: 'prod-2',
        languageCode: 'en',
        name: 'Radiance Boost Vitamin C Serum',
        description: 'Powerful brightening serum with 20% Vitamin C complex and ferulic acid for maximum antioxidant protection.',
        ingredients: 'Water, L-Ascorbic Acid (20%), Ferulic Acid, Vitamin E, Hyaluronic Acid',
        howToUse: 'Apply 2-3 drops to clean face morning and evening. Follow with moisturizer and SPF.',
        benefits: ['Brightening', 'Anti-aging', 'Antioxidant protection', 'Even skin tone']
      }
    ],
    stock: {
      available: 3000,
      reserved: 500
    }
  },
  // Hanbok Beauty Products
  {
    id: 'prod-3',
    brandId: 'brand-2',
    brand: mockBrands[1],
    sku: 'HB-MSK-001',
    status: ProductStatus.ACTIVE,
    moq: 200,
    cartonQuantity: 100,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-03-20'),
        expiryDate: new Date('2026-03-20')
      },
      {
        type: 'VEGAN',
        issuedDate: new Date('2023-01-01')
      }
    ],
    images: [
      {
        id: 'img-3',
        url: 'https://via.placeholder.com/400x400',
        alt: 'Royal Honey Mask',
        isPrimary: true,
        order: 0
      }
    ],
    pricing: [
      { minQuantity: 200, maxQuantity: 999, price: 2.80, currency: 'GBP' },
      { minQuantity: 1000, maxQuantity: 4999, price: 2.50, currency: 'GBP' },
      { minQuantity: 5000, price: 2.20, currency: 'GBP' }
    ],
    category: mockCategories[4],
    tags: ['mask', 'honey', 'hydrating', 'vegan'],
    createdAt: new Date('2023-03-25'),
    updatedAt: new Date('2024-01-10'),
    translations: [
      {
        productId: 'prod-3',
        languageCode: 'en',
        name: 'Royal Honey Hydrating Sheet Mask',
        description: 'Intensely hydrating sheet mask infused with royal honey and propolis extract for deep nourishment.',
        ingredients: 'Water, Honey Extract, Propolis Extract, Hyaluronic Acid, Centella Asiatica',
        howToUse: 'Apply mask to clean face, leave for 15-20 minutes, remove and pat remaining essence.',
        benefits: ['Deep hydration', 'Nourishing', 'Soothing', 'Radiance boost']
      }
    ],
    stock: {
      available: 20000,
      reserved: 2000
    }
  },
  {
    id: 'prod-4',
    brandId: 'brand-2',
    brand: mockBrands[1],
    sku: 'HB-MOI-002',
    status: ProductStatus.ACTIVE,
    moq: 150,
    cartonQuantity: 36,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-03-20'),
        expiryDate: new Date('2026-03-20')
      },
      {
        type: 'VEGAN',
        issuedDate: new Date('2023-01-01')
      },
      {
        type: 'CRUELTY_FREE',
        issuedDate: new Date('2023-01-01')
      }
    ],
    images: [
      {
        id: 'img-4',
        url: 'https://via.placeholder.com/400x400',
        alt: 'Ginseng Cream',
        isPrimary: true,
        order: 0
      }
    ],
    pricing: [
      { minQuantity: 150, maxQuantity: 499, price: 22.00, currency: 'GBP' },
      { minQuantity: 500, maxQuantity: 999, price: 20.00, currency: 'GBP' },
      { minQuantity: 1000, price: 18.50, currency: 'GBP' }
    ],
    category: mockCategories[2],
    tags: ['moisturizer', 'ginseng', 'anti-aging', 'vegan'],
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2024-01-05'),
    translations: [
      {
        productId: 'prod-4',
        languageCode: 'en',
        name: 'Red Ginseng Anti-Aging Cream',
        description: 'Luxurious anti-aging cream with 6-year-old red ginseng extract to improve elasticity and reduce wrinkles.',
        ingredients: 'Water, Red Ginseng Extract, Shea Butter, Ceramides, Peptides, Adenosine',
        howToUse: 'Apply to face and neck morning and evening after serum.',
        benefits: ['Anti-aging', 'Firming', 'Wrinkle reduction', 'Deep moisturizing']
      }
    ],
    stock: {
      available: 4500,
      reserved: 300
    }
  },
  // Jeju Essence Products
  {
    id: 'prod-5',
    brandId: 'brand-3',
    brand: mockBrands[2],
    sku: 'JE-CLN-001',
    status: ProductStatus.ACTIVE,
    moq: 120,
    cartonQuantity: 24,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-06-01'),
        expiryDate: new Date('2026-06-01')
      },
      {
        type: 'ORGANIC',
        issuedDate: new Date('2023-06-01')
      }
    ],
    images: [
      {
        id: 'img-5',
        url: 'https://via.placeholder.com/400x400',
        alt: 'Volcanic Clay Cleanser',
        isPrimary: true,
        order: 0
      }
    ],
    pricing: [
      { minQuantity: 120, maxQuantity: 499, price: 14.00, currency: 'GBP' },
      { minQuantity: 500, maxQuantity: 999, price: 12.50, currency: 'GBP' },
      { minQuantity: 1000, price: 11.00, currency: 'GBP' }
    ],
    category: mockCategories[1],
    tags: ['cleanser', 'volcanic-clay', 'pore-care', 'organic'],
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2024-01-12'),
    translations: [
      {
        productId: 'prod-5',
        languageCode: 'en',
        name: 'Jeju Volcanic Clay Deep Cleanser',
        description: 'Deep pore cleansing foam with Jeju volcanic clay to remove impurities and control excess sebum.',
        ingredients: 'Water, Volcanic Clay, Green Tea Extract, Aloe Vera, Salicylic Acid',
        howToUse: 'Lather with water and massage onto face, focusing on T-zone. Rinse thoroughly.',
        benefits: ['Deep cleansing', 'Pore tightening', 'Oil control', 'Gentle exfoliation']
      }
    ],
    stock: {
      available: 6000,
      reserved: 400
    }
  },
  {
    id: 'prod-6',
    brandId: 'brand-3',
    brand: mockBrands[2],
    sku: 'JE-SRM-002',
    status: ProductStatus.COMING_SOON,
    moq: 100,
    cartonQuantity: 48,
    certifications: [
      {
        type: 'CPNP_UK',
        issuedDate: new Date('2023-06-01'),
        expiryDate: new Date('2026-06-01')
      }
    ],
    images: [
      {
        id: 'img-6',
        url: 'https://via.placeholder.com/400x400',
        alt: 'Green Tea Serum',
        isPrimary: true,
        order: 0
      }
    ],
    pricing: [
      { minQuantity: 100, maxQuantity: 499, price: 16.00, currency: 'GBP' },
      { minQuantity: 500, maxQuantity: 999, price: 14.50, currency: 'GBP' },
      { minQuantity: 1000, price: 13.00, currency: 'GBP' }
    ],
    category: mockCategories[3],
    tags: ['serum', 'green-tea', 'antioxidant', 'coming-soon'],
    createdAt: new Date('2023-07-01'),
    updatedAt: new Date('2024-01-18'),
    translations: [
      {
        productId: 'prod-6',
        languageCode: 'en',
        name: 'Jeju Green Tea Antioxidant Serum',
        description: 'Lightweight serum with Jeju green tea extract for antioxidant protection and hydration.',
        ingredients: 'Water, Green Tea Extract, Niacinamide, Hyaluronic Acid, Centella Asiatica',
        howToUse: 'Apply 2-3 drops to face and neck after cleansing.',
        benefits: ['Antioxidant protection', 'Hydrating', 'Brightening', 'Soothing']
      }
    ],
    stock: {
      available: 0,
      reserved: 0,
      incoming: {
        quantity: 5000,
        expectedDate: new Date('2024-02-15')
      }
    }
  }
];