# LYS Platform User Guide

## Table of Contents
1. [Platform Overview](#platform-overview)
2. [User Roles](#user-roles)
3. [User Journeys](#user-journeys)
4. [Features by Role](#features-by-role)
5. [Page Documentation](#page-documentation)

## Platform Overview

Loving Your Skin (LYS) is an exclusive B2B marketplace connecting international retailers with premium Korean beauty brands. The platform ensures all products meet CPNP certification requirements for UK/EU markets.

## User Roles

### 1. Retailer
- International businesses purchasing K-beauty products wholesale
- Access to full product catalog
- Can place orders meeting MOQ requirements
- Direct messaging with brand representatives

### 2. Brand Representative
- Korean beauty brand staff managing products and orders
- Product listing and inventory management
- Order fulfillment and tracking
- Customer communication

### 3. Administrator
- Platform operators managing the marketplace
- User verification and approval
- System monitoring and analytics
- Compliance oversight

### 4. Team Member
- Support staff with limited access
- Order assistance
- Basic customer service functions

## User Journeys

### Retailer Journey: First Purchase

1. **Invitation & Registration**
   - Receive invitation email with unique token
   - Complete registration with company details
   - Email verification
   - Account approval by admin

2. **Product Discovery**
   - Browse product catalog
   - Filter by brand, category, certifications
   - View detailed product information
   - Check MOQ requirements

3. **Cart Management**
   - Add products to cart
   - Monitor MOQ progress per brand
   - Receive suggestions to meet MOQ
   - Review bulk pricing tiers

4. **Checkout Process**
   - Verify MOQ compliance
   - Enter shipping information
   - Select payment method
   - Accept terms and conditions
   - Place order

5. **Post-Order**
   - Receive order confirmation
   - Track order status
   - Communicate with brand via messaging
   - Receive shipping updates

### Brand Representative Journey: Order Management

1. **Login & Dashboard**
   - Access brand dashboard
   - View pending orders
   - Check inventory levels
   - Monitor performance metrics

2. **Order Processing**
   - Review new orders
   - Confirm inventory availability
   - Process payment
   - Arrange shipping

3. **Communication**
   - Respond to retailer inquiries
   - Provide order updates
   - Handle special requests
   - Resolve issues

4. **Product Management**
   - Update product information
   - Manage inventory levels
   - Set pricing tiers
   - Upload certifications

## Features by Role

### Retailer Features

#### Product Browsing
- **Search**: Full-text search across products, brands, ingredients
- **Filters**: Brand, category, certification, price range, MOQ
- **Sort Options**: Price, MOQ, newest, name
- **View Modes**: Grid/list view toggle

#### Cart Management
- **Multi-Brand Cart**: Consolidated cart across brands
- **MOQ Tracking**: Visual progress indicators
- **MOQ Suggestions**: Product recommendations to meet minimums
- **Quick Actions**: Update quantities, remove items
- **Save for Later**: Wishlist functionality

#### Order Management
- **Order History**: Complete purchase history
- **Quick Reorder**: One-click reorder previous purchases
- **Order Tracking**: Real-time status updates
- **Invoices**: Download PDF invoices
- **Returns**: Initiate return requests

### Brand Representative Features

#### Dashboard
- **Sales Overview**: Revenue, orders, top products
- **Inventory Alerts**: Low stock warnings
- **Order Queue**: Pending orders requiring action
- **Performance Metrics**: Conversion rates, average order value

#### Product Management
- **Bulk Upload**: CSV import for products
- **Translation Management**: Multi-language support
- **Certification Tracking**: Upload and manage certificates
- **Pricing Tiers**: Configure volume discounts
- **Stock Management**: Update availability

#### Order Processing
- **Order Review**: Detailed order information
- **Inventory Allocation**: Reserve stock
- **Shipping Integration**: Generate labels
- **Status Updates**: Notify customers
- **Bulk Actions**: Process multiple orders

### Administrator Features

#### User Management
- **Verification Queue**: Approve new registrations
- **Role Assignment**: Manage user permissions
- **Activity Monitoring**: Track user actions
- **Account Management**: Suspend/reactivate accounts

#### Platform Analytics
- **Revenue Reports**: GMV, commission tracking
- **User Analytics**: Registration, activity, retention
- **Product Performance**: Best sellers, trends
- **Compliance Monitoring**: Certification status

#### System Management
- **Health Monitoring**: Server status, performance
- **Error Tracking**: System errors, user reports
- **Announcement System**: Platform-wide messages
- **Configuration**: Platform settings

## Page Documentation

### Home Page (`/`)
**Purpose**: Landing page showcasing platform value proposition

**Sections**:
1. Hero banner with CTA
2. Platform statistics
3. Feature highlights
4. Trust indicators (certifications, partners)
5. Call-to-action for registration

**User Actions**:
- Browse as guest
- Request invitation
- Login

### Product Catalog (`/catalog`)
**Purpose**: Browse and search all available products

**Features**:
- Search bar with autocomplete
- Filter sidebar (collapsible on mobile)
- Product grid with cards
- Pagination
- Sort options

**Product Card Elements**:
- Product image
- Brand name
- Product name
- Certification badges
- Price range
- MOQ indicator
- Quick add to cart
- View details link

### Product Detail (`/products/:id`)
**Purpose**: Detailed product information and purchasing

**Sections**:
1. Image gallery
2. Product information
   - Name and description
   - Ingredients
   - How to use
   - Benefits
3. Certifications with documents
4. Pricing tiers table
5. Stock availability
6. Add to cart with quantity
7. Brand information
8. Related products

### Shopping Cart (`/cart`)
**Purpose**: Review and manage cart items

**Features**:
- Items grouped by brand
- MOQ progress bars
- Quantity adjustments
- Remove items
- MOQ suggestions panel
- Price breakdown
- Proceed to checkout

### Checkout (`/checkout`)
**Purpose**: Complete purchase process

**Steps**:
1. **Shipping Information**
   - Address selection/entry
   - Delivery preferences

2. **Payment Method**
   - Saved payment methods
   - Add new payment method

3. **Review & Confirm**
   - Order summary
   - Terms acceptance
   - Place order

### Orders (`/orders`)
**Purpose**: View and manage orders

**Features**:
- Order list with filters
- Status indicators
- Quick actions (reorder, track, message)
- Order detail modal

### Messages (`/messages`)
**Purpose**: Communication center

**Features**:
- Thread list
- Order context
- File attachments
- Read receipts
- Search messages

### Profile (`/profile`)
**Purpose**: User account management

**Sections**:
- Personal information
- Company details
- Addresses
- Payment methods
- Preferences
- Security settings

### Brand Dashboard (`/brand/dashboard`)
**Purpose**: Brand representative control center

**Widgets**:
- Sales metrics
- Recent orders
- Low stock alerts
- Message notifications
- Quick actions

## Navigation Structure

### Main Navigation
- **Logo**: Links to home
- **Products**: Dropdown with categories
- **Brands**: Brand directory
- **Orders**: Order history (authenticated)
- **Messages**: Message center (authenticated)

### User Menu
- Profile
- Settings
- Dashboard (role-specific)
- Help & Support
- Logout

### Footer
- About Us
- Help Center
- Terms & Conditions
- Privacy Policy
- Contact Information
- Social Media Links

## Mobile Experience

### Responsive Breakpoints
- **Mobile**: 0-767px
- **Tablet**: 768-1023px
- **Desktop**: 1024px+

### Mobile Optimizations
- Hamburger menu
- Bottom navigation bar
- Touch-optimized controls
- Simplified layouts
- Gesture support

## Accessibility Features
- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus indicators
- Alt text for images

## Help & Support
- In-app help tooltips
- FAQ section
- Video tutorials
- Live chat support
- Email support
- Phone support (business hours)