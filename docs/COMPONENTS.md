# LYS Platform Component Library

## Table of Contents
1. [UI Components](#ui-components)
2. [Layout Components](#layout-components)
3. [Feature Components](#feature-components)
4. [Component Usage Examples](#component-usage-examples)

## UI Components

### Button

A versatile button component with multiple variants, sizes, and states.

#### Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'outline' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### Examples
```tsx
// Primary button
<Button variant="primary" size="lg">
  Submit Order
</Button>

// Loading state
<Button isLoading>
  Processing...
</Button>

// With icons
<Button leftIcon={<ShoppingCart />} rightIcon={<ArrowRight />}>
  Add to Cart
</Button>

// Full width
<Button fullWidth variant="accent">
  Continue to Checkout
</Button>

// Icon only
<Button variant="ghost" size="icon">
  <Heart />
</Button>
```

### Card

Container component with optional header and footer sections.

#### Props
```typescript
interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}

// Sub-components
CardHeader, CardBody, CardFooter
```

#### Examples
```tsx
// Basic card
<Card>
  <CardBody>
    Simple card content
  </CardBody>
</Card>

// With header and footer
<Card variant="bordered">
  <CardHeader>
    <h3>Product Details</h3>
  </CardHeader>
  <CardBody>
    Product information here
  </CardBody>
  <CardFooter>
    <Button>Add to Cart</Button>
  </CardFooter>
</Card>

// Product card
<ProductCard
  image="/product.jpg"
  imageAlt="Product name"
  badge={<StatusBadge status="ACTIVE" />}
  onImageClick={() => navigate('/product/123')}
>
  <h3>Product Name</h3>
  <p>$99.99</p>
</ProductCard>
```

### Input

Form input component with label, error, and helper text support.

#### Props
```typescript
interface InputProps {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}
```

#### Examples
```tsx
// Basic input
<Input 
  label="Email Address" 
  placeholder="you@example.com"
  type="email"
/>

// With validation
<Input 
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  variant="error"
/>

// With icons
<Input 
  label="Search Products"
  leftIcon={<Search />}
  placeholder="Search..."
/>

// Textarea variant
<Textarea
  label="Order Notes"
  helperText="Optional notes for your order"
  rows={4}
/>
```

### Badge

Small status indicators for various states and certifications.

#### Props
```typescript
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

#### Examples
```tsx
// Status badges
<StatusBadge status="ACTIVE" />
<StatusBadge status="OUT_OF_STOCK" />

// Certification badges
<CertificationBadge certification="CPNP_UK" />
<CertificationBadge certification="VEGAN" />

// Custom badges
<Badge variant="success">New</Badge>
<Badge variant="warning" size="lg">Limited Stock</Badge>
```

### Grid System

Responsive grid layout components.

#### Props
```typescript
interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

interface GridItemProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full';
  rowSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 'full';
}
```

#### Examples
```tsx
// Basic grid
<Grid cols={3} gap="lg">
  <GridItem>Column 1</GridItem>
  <GridItem>Column 2</GridItem>
  <GridItem>Column 3</GridItem>
</Grid>

// Responsive grid
<Grid cols={1} className="md:grid-cols-2 lg:grid-cols-3">
  {products.map(product => (
    <ProductCard key={product.id} {...product} />
  ))}
</Grid>

// Complex layout
<Grid cols={12} gap="xl">
  <GridItem colSpan={3}>Sidebar</GridItem>
  <GridItem colSpan={9}>Main Content</GridItem>
</Grid>

// Container
<Container size="xl">
  <h1>Page Title</h1>
</Container>

// Stack (vertical layout)
<Stack spacing="lg" align="center">
  <h2>Title</h2>
  <p>Description</p>
  <Button>Action</Button>
</Stack>
```

## Layout Components

### Navbar

Main navigation component with responsive mobile menu.

#### Features
- Logo/brand area
- Navigation links
- Search functionality
- Cart indicator
- User menu/auth buttons
- Mobile hamburger menu

#### Structure
```tsx
<Navbar>
  <NavbarBrand />
  <NavbarLinks />
  <NavbarActions>
    <SearchButton />
    <NotificationBell />
    <CartButton />
    <UserMenu />
  </NavbarActions>
</Navbar>
```

### Footer

Site footer with company information and links.

#### Sections
- Company info with social links
- Quick links
- Support links
- Contact information
- Copyright and legal links

#### Structure
```tsx
<Footer>
  <FooterSection title="Company">
    {/* Company info */}
  </FooterSection>
  <FooterSection title="Support">
    {/* Support links */}
  </FooterSection>
  <FooterBottom>
    {/* Copyright and legal */}
  </FooterBottom>
</Footer>
```

### Layout

Main layout wrapper component.

#### Features
- Navbar integration
- Footer integration
- Main content area with outlet
- Toast notifications
- Loading states

#### Usage
```tsx
<Layout>
  <Outlet /> {/* Router outlet for page content */}
</Layout>
```

## Feature Components

### ProductCard

Specialized card for product display.

#### Props
```typescript
interface ProductCardProps extends CardProps {
  image: string;
  imageAlt?: string;
  badge?: React.ReactNode;
  onImageClick?: () => void;
  children: React.ReactNode;
}
```

#### Features
- Image with hover effect
- Badge overlay
- Structured content area
- Quick actions

### MOQIndicator

Visual indicator for MOQ progress.

#### Props
```typescript
interface MOQIndicatorProps {
  current: number;
  required: number;
  currency?: string;
  showSuggestions?: boolean;
}
```

#### Example
```tsx
<MOQIndicator 
  current={3500}
  required={5000}
  currency="GBP"
  showSuggestions
/>
```

### CertificationList

Display product certifications.

#### Props
```typescript
interface CertificationListProps {
  certifications: Certification[];
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
}
```

### PricingTiers

Display volume-based pricing.

#### Props
```typescript
interface PricingTiersProps {
  tiers: PriceTier[];
  currentQuantity?: number;
  highlight?: boolean;
}
```

## Component Usage Examples

### Product Listing Page

```tsx
const ProductCatalog = () => {
  return (
    <Container>
      <Grid cols={4} gap="xl">
        {/* Filters Sidebar */}
        <GridItem colSpan={1}>
          <Card variant="bordered">
            <CardHeader>Filters</CardHeader>
            <CardBody>
              <Stack spacing="md">
                <FilterGroup title="Brands" />
                <FilterGroup title="Categories" />
                <FilterGroup title="Certifications" />
              </Stack>
            </CardBody>
          </Card>
        </GridItem>
        
        {/* Product Grid */}
        <GridItem colSpan={3}>
          <Grid cols={3} gap="lg">
            {products.map(product => (
              <ProductCard
                key={product.id}
                image={product.image}
                badge={<StatusBadge status={product.status} />}
              >
                <Stack spacing="sm">
                  <Badge variant="ghost" size="sm">
                    {product.brand}
                  </Badge>
                  <h3>{product.name}</h3>
                  <CertificationList 
                    certifications={product.certifications}
                    maxVisible={3}
                  />
                  <div>
                    <p className="text-lg font-bold">
                      From £{product.minPrice}
                    </p>
                    <p className="text-sm text-gray-600">
                      MOQ: {product.moq} units
                    </p>
                  </div>
                  <Button fullWidth>Add to Cart</Button>
                </Stack>
              </ProductCard>
            ))}
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
};
```

### Shopping Cart

```tsx
const ShoppingCart = () => {
  return (
    <Container size="lg">
      <h1>Shopping Cart</h1>
      
      <Grid cols={3} gap="xl">
        <GridItem colSpan={2}>
          <Stack spacing="lg">
            {brandGroups.map(brand => (
              <Card key={brand.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <h3>{brand.name}</h3>
                    <MOQIndicator 
                      current={brand.currentTotal}
                      required={brand.moq}
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  {brand.items.map(item => (
                    <CartItem key={item.id} {...item} />
                  ))}
                </CardBody>
                {!brand.moqMet && (
                  <CardFooter>
                    <MOQSuggestions brandId={brand.id} />
                  </CardFooter>
                )}
              </Card>
            ))}
          </Stack>
        </GridItem>
        
        <GridItem colSpan={1}>
          <Card variant="bordered" className="sticky top-20">
            <CardHeader>Order Summary</CardHeader>
            <CardBody>
              <OrderSummary />
            </CardBody>
            <CardFooter>
              <Button fullWidth size="lg" variant="primary">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
};
```

### Form Example

```tsx
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <h2>Sign In</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="md">
            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            
            <Input
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register('password')}
            />
            
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Button variant="link" size="sm">
                Forgot password?
              </Button>
            </div>
            
            <Button type="submit" fullWidth>
              Sign In
            </Button>
          </Stack>
        </form>
      </CardBody>
      <CardFooter className="text-center">
        <span className="text-sm">
          Don't have an account?{' '}
          <Button variant="link" size="sm">
            Request Access
          </Button>
        </span>
      </CardFooter>
    </Card>
  );
};
```

## Component Best Practices

### Accessibility
- All interactive elements have proper ARIA labels
- Focus states are clearly visible
- Keyboard navigation is supported
- Color contrast meets WCAG standards

### Performance
- Components use React.memo where appropriate
- Large lists use virtualization
- Images are lazy loaded
- Animations use CSS transforms

### Responsive Design
- Mobile-first approach
- Touch targets minimum 44px
- Breakpoint-specific props
- Fluid typography and spacing

### Customization
- Components accept className prop
- Style overrides via Tailwind utilities
- Variant system for common patterns
- Composition over configuration