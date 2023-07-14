'use client';

import { cn } from '@/libs/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { IconType } from 'react-icons';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:ring-2 focus:ring-black focus:ring-offset-[3px] rounded-lg transition disabled:cursor-not-allowed disabled:pointer-events-none relative disabled:opacity-50 cursor-pointer h-10 py-2 px-4',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-orange-700 to-orange-500 text-white focus:outline-none',
        outline:
          'outline outline-1 outline-neutral-400 bg-transparent hover:outline-black',
        link: 'bg-transparent underline-offset-4 hover:underline text-orange-500',
        ghost:
          'focus:ring-offset-0 focus:outline-none focus:outline-transparent focus:ring-0 focus:  ring-transparent bg-transparent hover:bg-neutral-100 focus:bg-neutral-100',
        circle:
          'outline outline-1 outline-neutral-400 bg-transparent hover:outline-black flex h-8 w-8 items-center justify-center rounded-full border-neutral-400 py-0 px-0 text-neutral-600 hover:border-black',
      },
      size: {
        sm: 'h-9 px-2 rounded-md',
        xs: 'h-8 px-1.5 rounded-sm',
        lg: 'h-12 px-8 rounded-lg text-md',
      },
    },
    defaultVariants: {
      variant: 'default',
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
