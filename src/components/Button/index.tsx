import type { ButtonHTMLAttributes } from "react";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary/90 disabled:opacity-50",
  outline:
    "border border-gray-300 dark:border-gray-600 bg-transparent text-light-text dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
  danger:
    "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50",
  ghost:
    "bg-transparent text-light-text dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
};

export function Button({
  variant = "primary",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isInteractive = !disabled && !isLoading;

  return (
    <motion.span
      className="inline-flex"
      whileHover={{ scale: isInteractive ? 1.02 : 1 }}
      whileTap={{ scale: isInteractive ? 0.97 : 1 }}
      transition={{ duration: 0.15 }}
    >
      <button
        className={cn(
          "inline-flex w-full items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed",
          variants[variant],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Aguarde...
          </span>
        ) : (
          children
        )}
      </button>
    </motion.span>
  );
}
