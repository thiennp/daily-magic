import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // Button text or content
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  className?: string; // Disabled state
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary: [
      "bg-brand-600 text-white shadow-sm",
      "hover:bg-brand-700",
      "dark:bg-brand-500 dark:hover:bg-brand-400",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/40 focus-visible:ring-offset-2",
      "dark:focus-visible:ring-brand-400/40 dark:focus-visible:ring-offset-gray-900",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ].join(" "),
    outline: [
      "border border-gray-200 bg-white text-gray-800 shadow-sm",
      "hover:border-gray-300 hover:bg-gray-50",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300/60 focus-visible:ring-offset-2",
      "dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-white/[0.03]",
    ].join(" "),
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${className} ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {children}
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
