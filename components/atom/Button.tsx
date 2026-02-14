"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { classNames } from "@/lib/utils/cn";
const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
      },

      intent: {
        primary: "bg-cyan-700 text-white hover:bg-cyan-800 focus:ring-cyan-500",
        secondary:
          "bg-orange-400 text-black hover:bg-orange-500 focus:ring-orange-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        neutral: "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-400",
      },

      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-6 text-lg",
      },

      radius: {
        sm: "rounded-md",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "solid",
      intent: "primary",
      size: "md",
      radius: "md",
    },
  },
);

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
>;

export interface ButtonProps
  extends NativeButtonProps, VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      intent,
      size,
      radius,
      fullWidth,
      isLoading,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={classNames(
          buttonVariants({
            variant,
            intent,
            size,
            radius,
            fullWidth,
          }),
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <span className="mr-2 animate-spin">⏳</span>}

        {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}

        {children}

        {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
