import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const gridVariants = cva(
  'grid',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
        12: 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-xs',
        sm: 'gap-sm',
        md: 'gap-md',
        lg: 'gap-lg',
        xl: 'gap-xl',
        '2xl': 'gap-2xl',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justify: {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
      },
    },
    defaultVariants: {
      cols: 1,
      gap: 'md',
      align: 'stretch',
      justify: 'start',
    },
  }
);

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  as?: React.ElementType;
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, align, justify, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={gridVariants({ cols, gap, align, justify, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Grid.displayName = 'Grid';

// Grid Item component with span utilities
const gridItemVariants = cva(
  '',
  {
    variants: {
      colSpan: {
        1: 'col-span-1',
        2: 'col-span-2',
        3: 'col-span-3',
        4: 'col-span-4',
        5: 'col-span-5',
        6: 'col-span-6',
        7: 'col-span-7',
        8: 'col-span-8',
        9: 'col-span-9',
        10: 'col-span-10',
        11: 'col-span-11',
        12: 'col-span-12',
        full: 'col-span-full',
      },
      rowSpan: {
        1: 'row-span-1',
        2: 'row-span-2',
        3: 'row-span-3',
        4: 'row-span-4',
        5: 'row-span-5',
        6: 'row-span-6',
        full: 'row-span-full',
      },
    },
  }
);

export interface GridItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridItemVariants> {
  as?: React.ElementType;
}

export const GridItem = React.forwardRef<HTMLDivElement, GridItemProps>(
  ({ className, colSpan, rowSpan, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={gridItemVariants({ colSpan, rowSpan, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

GridItem.displayName = 'GridItem';

// Responsive Container component
const containerVariants = cva(
  'w-full mx-auto px-md',
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full',
        fluid: '',
      },
    },
    defaultVariants: {
      size: 'xl',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={containerVariants({ size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';

// Stack component for vertical layouts
const stackVariants = cva(
  'flex flex-col',
  {
    variants: {
      spacing: {
        none: '',
        xs: 'space-y-xs',
        sm: 'space-y-sm',
        md: 'space-y-md',
        lg: 'space-y-lg',
        xl: 'space-y-xl',
        '2xl': 'space-y-2xl',
      },
      align: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
    },
    defaultVariants: {
      spacing: 'md',
      align: 'stretch',
    },
  }
);

export interface StackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {
  as?: React.ElementType;
}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, spacing, align, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        className={stackVariants({ spacing, align, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Stack.displayName = 'Stack';