import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'touch-target inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-content hover:bg-primary-focus focus:ring-primary',
        secondary: 'bg-secondary text-secondary-content hover:bg-secondary-focus focus:ring-secondary',
        accent: 'bg-accent text-accent-content hover:bg-accent-focus focus:ring-accent',
        ghost: 'hover:bg-base-200 hover:text-base-content focus:ring-base-300',
        link: 'text-primary hover:text-primary-focus underline-offset-4 hover:underline',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-content focus:ring-primary',
        error: 'bg-error text-error-content hover:bg-error-focus focus:ring-error',
        success: 'bg-success text-success-content hover:bg-success-focus focus:ring-success',
      },
      size: {
        sm: 'px-sm py-xs text-sm min-h-[36px]',
        md: 'px-lg py-sm text-base min-h-[44px]',
        lg: 'px-xl py-md text-lg min-h-[52px]',
        xl: 'px-2xl py-lg text-xl min-h-[60px]',
        icon: 'h-[44px] w-[44px]',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth,
    isLoading,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props 
  }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, fullWidth, className })}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : leftIcon ? (
          <span className="mr-2">{leftIcon}</span>
        ) : null}
        {children}
        {rightIcon && !isLoading && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';