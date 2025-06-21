import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'card-base overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-base-100 shadow-sm hover:shadow-md',
        bordered: 'bg-base-100 border-2 border-base-200',
        elevated: 'bg-base-100 shadow-lg hover:shadow-xl',
        ghost: 'bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-sm',
        md: 'p-md',
        lg: 'p-lg',
        xl: 'p-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'lg',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={cardVariants({ variant, padding, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// Card subcomponents
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`px-lg py-md border-b border-base-200 ${className || ''}`}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`p-lg ${className || ''}`}
        {...props}
      />
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`px-lg py-md border-t border-base-200 ${className || ''}`}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

// Product Card Component
export interface ProductCardProps extends CardProps {
  image: string;
  imageAlt?: string;
  badge?: React.ReactNode;
  onImageClick?: () => void;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ image, imageAlt, badge, onImageClick, children, ...props }, ref) => {
    return (
      <Card ref={ref} padding="none" {...props}>
        <div className="relative aspect-square overflow-hidden bg-base-200">
          <img
            src={image}
            alt={imageAlt || ''}
            className="h-full w-full object-cover transition-transform hover:scale-105 cursor-pointer"
            onClick={onImageClick}
          />
          {badge && (
            <div className="absolute top-2 right-2">
              {badge}
            </div>
          )}
        </div>
        <div className="p-lg">
          {children}
        </div>
      </Card>
    );
  }
);

ProductCard.displayName = 'ProductCard';