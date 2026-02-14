"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { classNames } from "@/lib/utils/cn";

const inputVariants = cva(
  "border transition-all focus:outline-none focus:ring-2 disabled:opacity-50",
  {
    variants: {
      inputSize: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-base",
        lg: "h-12 px-5 text-lg",
      },

      radius: {
        sm: "rounded-md",
        md: "rounded-xl",
        lg: "rounded-2xl",
      },

      state: {
        default: "border-gray-300 focus:border-cyan-500 focus:ring-cyan-500",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      inputSize: "md",
      radius: "md",
      state: "default",
    },
  },
);

/**
 * حذف prop های تداخلی HTML
 */
type NativeInputProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "size" | "color"
>;

export interface InputProps
  extends NativeInputProps, VariantProps<typeof inputVariants> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize, radius, state, fullWidth, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={classNames(
          inputVariants({
            inputSize,
            radius,
            state,
            fullWidth,
          }),
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
