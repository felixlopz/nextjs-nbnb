'use client';

import { cn } from '@/src/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';

const buttonVariants = cva(
  'active:scale-95 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none relative',
  {
    variants: {
      variant: {
        default: 'bg-rose-500 border-rose-500 text-white',
        outline:
          'bg-white border-black text-black hover:bg-zinc-200 outline outline-2 outline-black',
        link: 'bg-transparent underline-offset-4 hover:underline text-rose-500',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-2 rounded-md',
        xs: 'h-8 px-1.5 rounded-sm',
        lg: 'h-12 px-8 rounded-lg text-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  icon?: IconType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, children, variant, isLoading, size, icon: Icon, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}

        {Icon != null ? (
          <Icon
            size={24}
            className="
            absolute
            left-4
            top-3
          "
          />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

export default Button;