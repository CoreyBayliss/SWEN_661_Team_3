import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import { Loader2 } from "lucide-react";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  leftIcon,
  rightIcon,
  loading,
  fullWidth,
  asChild = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> & {
    variant?:
      | VariantProps<typeof buttonVariants>["variant"]
      | "primary"
      | "danger";
    size?:
      | VariantProps<typeof buttonVariants>["size"]
      | "md"
      | "touch";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
    fullWidth?: boolean;
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  let normalizedVariant = variant;
  if (variant === "primary") normalizedVariant = "default";
  if (variant === "danger") normalizedVariant = "destructive";

  let normalizedSize = size;
  if (size === "md") normalizedSize = "default";
  if (size === "touch") normalizedSize = "lg";

  const legacyVariantClass =
    variant === "secondary"
      ? "bg-[var(--color-secondary)]"
      : variant === "outline"
        ? "border-2"
        : variant === "ghost"
          ? "text-[var(--color-primary)]"
          : variant === "danger" || variant === "destructive"
            ? "bg-[var(--color-error)]"
            : "bg-[var(--color-primary)]";

  const legacySizeClass =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : size === "lg"
        ? "px-6 py-3 text-lg"
        : size === "touch"
          ? "px-6 py-3 text-lg min-h-[56px]"
          : "px-4 py-2 text-base";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant: normalizedVariant as VariantProps<typeof buttonVariants>["variant"],
          size: normalizedSize as VariantProps<typeof buttonVariants>["size"],
          className,
        }),
        legacyVariantClass,
        legacySizeClass,
        "focus-visible:ring-2 focus-visible:ring-offset-2",
        fullWidth && "w-full",
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </Comp>
  );
}

function IconButton({
  icon,
  label,
  className,
  ...props
}: Omit<React.ComponentProps<typeof Button>, "children"> & {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      type="button"
      size="icon"
      aria-label={label}
      title={label}
      className={className}
      {...props}
    >
      {icon}
    </Button>
  );
}

export { Button, IconButton, buttonVariants };
