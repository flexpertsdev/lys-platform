# LYS Platform Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Design System](#design-system)
3. [State Management](#state-management)
4. [Services Layer](#services-layer)
5. [Component Architecture](#component-architecture)
6. [Type System](#type-system)
7. [Development Guidelines](#development-guidelines)

## Architecture Overview

### Technology Stack

```
Frontend Framework:     React 18 + TypeScript
Build Tool:            Vite
CSS Framework:         Tailwind CSS + DaisyUI
State Management:      Zustand
Data Fetching:         React Query (TanStack Query)
Form Handling:         React Hook Form + Zod
Routing:              React Router v6
Icons:                Lucide React
Animations:           Framer Motion
Notifications:        React Hot Toast
```

### Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base components (Button, Card, Input, etc.)
│   ├── layout/        # Layout components (Navbar, Footer, Layout)
│   └── features/      # Feature-specific components
├── pages/             # Page components (routes)
├── types/             # TypeScript type definitions
├── services/          # API services and business logic
├── stores/            # Zustand state stores
├── mock/              # Mock data for development
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
└── contexts/          # React contexts (if needed)
```

## Design System

### Core Principles

1. **8px Grid System**: All spacing based on 8px unit
2. **Mobile-First**: Responsive design starting from mobile
3. **Accessibility**: WCAG 2.1 AA compliance
4. **Component-Based**: Reusable, composable components

### Spacing System

```css
/* Base unit: 8px */
--space-xs: 4px;   /* 0.5 * unit */
--space-sm: 8px;   /* 1 * unit */
--space-md: 16px;  /* 2 * unit */
--space-lg: 24px;  /* 3 * unit */
--space-xl: 32px;  /* 4 * unit */
--space-2xl: 48px; /* 6 * unit */
--space-3xl: 64px; /* 8 * unit */
```

### Typography Scale

```css
/* 1.25 ratio (Major Third) */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.25rem;    /* 20px */
--text-xl: 1.563rem;   /* 25px */
--text-2xl: 1.953rem;  /* 31px */
--text-3xl: 2.441rem;  /* 39px */
--text-4xl: 3.052rem;  /* 49px */
```

### Color System

```javascript
// Primary (Pink/Magenta)
primary: {
  50: '#fdf2f8',
  100: '#fce7f3',
  200: '#fbcfe8',
  300: '#f9a8d4',
  400: '#f472b6',
  500: '#ec4899',
  600: '#db2777',
  700: '#be185d',
  800: '#9d174d',
  900: '#831843',
}

// Secondary (Slate)
secondary: {
  50: '#f8fafc',
  100: '#f1f5f9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#1e293b',
  900: '#0f172a',
}

// Semantic Colors
success: '#10b981'
warning: '#f59e0b'
error: '#ef4444'
info: '#3b82f6'
```

### Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
2xl: 1536px /* Extra large screens */
```

### Component Styling Pattern

```typescript
// Using CVA (Class Variance Authority)
const buttonVariants = cva(
  'base-classes',
  {
    variants: {
      variant: {
        primary: 'primary-classes',
        secondary: 'secondary-classes',
      },
      size: {
        sm: 'small-classes',
        md: 'medium-classes',
        lg: 'large-classes',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);
```

## State Management

### Zustand Stores

#### Auth Store (`auth.store.ts`)
```typescript
interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}
```

#### Cart Store (`cart.store.ts`)
```typescript
interface CartStore {
  // State
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
  clearCart: () => Promise<void>;
  refreshSummary: () => Promise<void>;
  validateCart: () => Promise<CartValidation>;
}
```

#### UI Store (`ui.store.ts`)
```typescript
interface UIStore {
  // Sidebar & Navigation
  isSidebarOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Modals
  activeModal: string | null;
  modalData: any;
  
  // Loading & Theme
  pageLoading: boolean;
  theme: 'light' | 'dark';
  language: 'en' | 'ko' | 'zh';
  
  // Notifications
  toasts: Toast[];
  
  // Actions
  toggleSidebar: () => void;
  openModal: (modalId: string, data?: any) => void;
  closeModal: () => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  // ... more actions
}
```

### Store Usage Pattern

```typescript
// In components
const MyComponent = () => {
  const { user, login, isLoading } = useAuthStore();
  const { cart, addToCart } = useCartStore();
  
  // Use store state and actions
};
```

## Services Layer

### Architecture Pattern

All services follow a singleton pattern with mock data that mirrors Firebase API structure:

```typescript
class ServiceName {
  private data: Map<string, Entity> = new Map();
  
  constructor() {
    this.initializeMockData();
  }
  
  // CRUD operations
  async create(data: CreateDTO): Promise<Entity> { }
  async getById(id: string): Promise<Entity | null> { }
  async update(id: string, updates: UpdateDTO): Promise<Entity> { }
  async delete(id: string): Promise<void> { }
  
  // Query operations
  async query(filters: FilterDTO): Promise<Entity[]> { }
}

export const serviceName = new ServiceName();
```

### Auth Service

```typescript
class AuthService {
  // Authentication
  async signIn(credentials: LoginCredentials): Promise<User>
  async signUp(data: RegisterData): Promise<User>
  async signOut(): Promise<void>
  
  // User Management
  async getCurrentUser(): Promise<User | null>
  async updateProfile(updates: Partial<User>): Promise<User>
  async sendPasswordResetEmail(email: string): Promise<void>
  async verifyEmail(): Promise<void>
  
  // Invitation System
  async validateInvitation(token: string): Promise<Invitation | null>
  async createInvitation(email: string, role: UserRole): Promise<Invitation>
  
  // Firebase-ready methods
  async onAuthStateChanged(callback: (user: User | null) => void): Promise<() => void>
  async refreshToken(): Promise<string>
}
```

### Product Service

```typescript
class ProductService {
  // Product Operations
  async getProducts(filters?: ProductFilters, pagination?: PaginationParams): Promise<ApiResponse<Product[]>>
  async getProductById(id: string): Promise<Product | null>
  async searchProducts(query: string): Promise<Product[]>
  
  // Brand Operations
  async getBrands(): Promise<Brand[]>
  async getBrandById(id: string): Promise<Brand | null>
  async getProductsByBrand(brandId: string): Promise<Product[]>
  
  // Category Operations
  async getCategories(): Promise<Category[]>
  async getCategoryTree(): Promise<Category[]>
  async getProductsByCategory(categoryId: string): Promise<Product[]>
  
  // Utility Methods
  async getProductRecommendations(productId: string, limit?: number): Promise<Product[]>
  async checkProductAvailability(productId: string, quantity: number): Promise<boolean>
}
```

### Cart Service

```typescript
class CartService {
  // Cart Management
  async getCart(userId?: string): Promise<Cart | null>
  async addToCart(productId: string, quantity: number, userId?: string): Promise<CartItem>
  async updateCartItem(itemId: string, quantity: number, userId?: string): Promise<CartItem>
  async removeFromCart(itemId: string, userId?: string): Promise<void>
  async clearCart(userId?: string): Promise<void>
  
  // Cart Analysis
  async getCartSummary(userId?: string): Promise<CartSummary | null>
  async validateCart(userId?: string): Promise<CartValidation>
  async getMOQSuggestions(brandId: string, currentTotal: number, userId?: string): Promise<any[]>
}
```

## Component Architecture

### Component Categories

#### UI Components (`/components/ui/`)
Base components following design system:
- **Button**: Multiple variants, sizes, loading states
- **Card**: Container with header, body, footer
- **Input**: Text input with validation states
- **Badge**: Status indicators, certifications
- **Grid**: Layout system with responsive columns

#### Layout Components (`/components/layout/`)
- **Layout**: Main app wrapper with outlet
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Company info and links

### Component Patterns

#### Variant-based Components
```typescript
<Button 
  variant="primary" 
  size="lg" 
  isLoading={loading}
  leftIcon={<Icon />}
>
  Click Me
</Button>
```

#### Compound Components
```typescript
<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

#### Responsive Components
```typescript
<Grid cols={4} gap="lg">
  <GridItem colSpan={4} className="lg:col-span-1">
    Sidebar
  </GridItem>
  <GridItem colSpan={4} className="lg:col-span-3">
    Main Content
  </GridItem>
</Grid>
```

## Type System

### Core Types Organization

```typescript
// User Types
export enum UserRole {
  RETAILER = 'RETAILER',
  BRAND_REP = 'BRAND_REP',
  ADMIN = 'ADMIN',
  TEAM_MEMBER = 'TEAM_MEMBER'
}

// Product Types
export interface Product {
  id: string;
  brandId: string;
  sku: string;
  status: ProductStatus;
  moq: number;
  cartonQuantity: number;
  certifications: Certification[];
  pricing: PriceTier[];
  translations: ProductTranslation[];
  // ... more fields
}

// Cart Types
export interface CartSummary {
  items: CartItemSummary[];
  brandSummaries: BrandCartSummary[];
  subtotal: number;
  hasValidMOQ: boolean;
  invalidMOQBrands: string[];
}

// Order Types
export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  // ... more fields
}
```

### Type Import Pattern

```typescript
// Always use type-only imports when possible
import type { User, Product, Cart } from '../types';

// Import enums separately
import { UserRole, ProductStatus } from '../types';
```

## Development Guidelines

### Code Style

1. **TypeScript First**: Always use proper types
2. **Functional Components**: Use hooks, no class components
3. **Named Exports**: Prefer named over default exports
4. **Async/Await**: Use over promises chains
5. **Early Returns**: Reduce nesting

### File Naming

- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `entity.types.ts`
- Services: `entity.service.ts`
- Stores: `entity.store.ts`

### Git Workflow

```bash
# Feature branch
git checkout -b feature/description

# Commit message format
type(scope): subject

# Types: feat, fix, docs, style, refactor, test, chore
```

### Testing Strategy

```typescript
// Component tests
describe('Button', () => {
  it('renders with correct variant', () => {
    // Test implementation
  });
});

// Service tests
describe('AuthService', () => {
  it('signs in user successfully', async () => {
    // Test implementation
  });
});
```

### Performance Optimization

1. **Code Splitting**: Route-based splitting
2. **Lazy Loading**: Components and images
3. **Memoization**: React.memo for expensive components
4. **Virtual Scrolling**: For long lists
5. **Image Optimization**: WebP format, responsive images

### Security Considerations

1. **Input Validation**: Zod schemas for all forms
2. **XSS Protection**: Sanitize user content
3. **CSRF Protection**: Token validation
4. **Secure Storage**: No sensitive data in localStorage
5. **API Security**: JWT tokens with refresh

### Deployment

#### Environment Variables
```env
VITE_API_URL=https://api.example.com
VITE_FIREBASE_CONFIG={}
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
```

#### Build Configuration
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit"
  }
}
```

#### Netlify Configuration
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```