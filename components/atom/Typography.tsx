import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { classNames } from "@/lib/utils/cn";
const textVariants = cva("", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },

    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },

    intent: {
      default: "text-black",
      muted: "text-gray-500",
      primary: "text-cyan-700",
      danger: "text-red-600",
    },
  },

  defaultVariants: {
    size: "md",
    weight: "regular",
    intent: "default",
  },
});

type NativeTextProps = React.ComponentPropsWithoutRef<"span">;

export interface TextProps
  extends Omit<NativeTextProps, "color">, VariantProps<typeof textVariants> {}

export function Text({ className, size, weight, intent, ...props }: TextProps) {
  return (
    <span
      className={classNames(textVariants({ size, weight, intent }), className)}
      {...props}
    />
  );
}
