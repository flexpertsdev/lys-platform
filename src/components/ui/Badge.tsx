import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary/20 text-primary',
        secondary: 'bg-secondary/20 text-secondary',
        accent: 'bg-accent/20 text-accent',
        success: 'bg-success/20 text-success',
        warning: 'bg-warning/20 text-warning',
        error: 'bg-error/20 text-error',
        info: 'bg-info/20 text-info',
        ghost: 'bg-base-200 text-base-content',
        outline: 'border border-current',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-sm',
        lg: 'px-3 py-1 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  as?: React.ElementType;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, as: Component = 'span', ...props }, ref) => {
    return (
      <Component
        className={badgeVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Certification Badge Component
export interface CertificationBadgeProps extends BadgeProps {
  certification: 'CPNP_UK' | 'CPNP_EU' | 'CPNP_CH' | 'FDA' | 'KFDA' | 'ORGANIC' | 'VEGAN' | 'CRUELTY_FREE';
}

const certificationConfig = {
  CPNP_UK: { label: 'CPNP UK', variant: 'primary' as const },
  CPNP_EU: { label: 'CPNP EU', variant: 'primary' as const },
  CPNP_CH: { label: 'CPNP CH', variant: 'primary' as const },
  FDA: { label: 'FDA', variant: 'info' as const },
  KFDA: { label: 'KFDA', variant: 'info' as const },
  ORGANIC: { label: 'Organic', variant: 'success' as const },
  VEGAN: { label: 'Vegan', variant: 'success' as const },
  CRUELTY_FREE: { label: 'Cruelty Free', variant: 'success' as const },
};

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({ 
  certification, 
  ...props 
}) => {
  const config = certificationConfig[certification];
  
  return (
    <Badge variant={config.variant} size="sm" {...props}>
      {config.label}
    </Badge>
  );
};

// Status Badge Component
export interface StatusBadgeProps extends BadgeProps {
  status: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK' | 'DISCONTINUED' | 'COMING_SOON';
}

const statusConfig = {
  ACTIVE: { label: 'Active', variant: 'success' as const },
  INACTIVE: { label: 'Inactive', variant: 'ghost' as const },
  OUT_OF_STOCK: { label: 'Out of Stock', variant: 'error' as const },
  DISCONTINUED: { label: 'Discontinued', variant: 'warning' as const },
  COMING_SOON: { label: 'Coming Soon', variant: 'info' as const },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  ...props 
}) => {
  const config = statusConfig[status];
  
  return (
    <Badge variant={config.variant} {...props}>
      {config.label}
    </Badge>
  );
};