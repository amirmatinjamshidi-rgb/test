import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { radiusTokens, colorTokens } from "@/Design-System/tokens";
import { classNames } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors",
  {
    variants: {
      colors: {
        primary: "",
        secondary: "",
        danger: "",
        neutral: "",
      },
      variant: {
        solid: "",
        subtle: "",
        outline: "",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
      },
      rounded: {
        sm: "rounded-md",
        md: radiusTokens.md,
        full: radiusTokens.full,
      },
    },
    defaultVariants: {
      colors: "primary",
      variant: "solid",
      size: "md",
      rounded: "full",
    },
  },
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

interface BadgeProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    BadgeVariantProps {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      colors = "primary",
      variant = "solid",
      size,
      rounded,
      dot,
      children,
      ...props
    },
    ref,
  ) => {
    const resolvedColor = colors ?? "primary";
    const resolvedVariant = variant ?? "solid";

    const colorClasses = colorTokens.badge[resolvedColor][resolvedVariant];

    return (
      <span
        ref={ref}
        className={classNames(
          badgeVariants({ colors, variant, size, rounded }),
          colorClasses,
          className,
        )}
        {...props}
      >
        {dot && (
          <span className="mr-1 h-2 w-2 rounded-full bg-current opacity-80" />
        )}
        {children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
