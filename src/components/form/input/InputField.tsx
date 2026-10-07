import React, { FC } from "react";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  hint?: string; // Optional hint text
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  defaultValue,
  onChange,
  className = "",
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  hint,
}) => {
  const inputClasses = [
    "h-11 w-full appearance-none rounded-lg border px-4 py-2.5 text-sm placeholder:text-awc-fg-muted focus:outline-hidden focus:ring-3",
    disabled
      ? "cursor-not-allowed border-dashed border-gray-400 bg-awc-fill text-awc-fg-muted shadow-none dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300"
      : "shadow-theme-xs dark:placeholder:text-white/30",
    !disabled && error
      ? "border-error-500 text-error-800 focus:ring-3 focus:ring-error-500/10 dark:border-error-500 dark:bg-gray-800 dark:text-error-400"
      : "",
    !disabled && !error && success
      ? "border-success-400 text-success-500 focus:border-success-300 focus:ring-success-500/10 dark:border-success-500 dark:bg-gray-800 dark:text-success-400"
      : "",
    !disabled && !error && !success
      ? "border-awc-border-strong bg-transparent text-awc-fg focus:border-awc-blue-300 focus:ring-3 focus:ring-awc-blue-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:focus:border-brand-800"
      : "",
    className,
  ]
    .filter((value) => value.length > 0)
    .join(" ");

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
      />

      {/* Optional Hint Text */}
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error
              ? "text-error-500"
              : success
                ? "text-success-500"
                : "text-awc-fg-muted"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
