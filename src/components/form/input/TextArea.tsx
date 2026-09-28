import React from "react";

interface TextareaProps {
  placeholder?: string; // Placeholder text
  rows?: number; // Number of rows
  value?: string; // Current value
  onChange?: (value: string) => void; // Change handler
  className?: string; // Additional CSS classes
  disabled?: boolean; // Disabled state
  error?: boolean; // Error state
  hint?: string; // Hint text to display
}

const TextArea: React.FC<TextareaProps> = ({
  placeholder = "Enter your message", // Default placeholder
  rows = 3, // Default number of rows
  value = "", // Default value
  onChange, // Callback for changes
  className = "", // Additional custom styles
  disabled = false, // Disabled state
  error = false, // Error state
  hint = "", // Default hint text
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const textareaClasses = [
    "w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-hidden",
    disabled
      ? "cursor-not-allowed border-dashed border-gray-400 bg-gray-100 text-gray-600 shadow-none dark:border-gray-600 dark:bg-gray-950 dark:text-gray-300"
      : "border-gray-300 bg-transparent text-gray-400 shadow-theme-xs focus:ring-3 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90",
    !disabled && error
      ? "focus:border-error-300 focus:ring-error-500/10 dark:focus:border-error-800"
      : "",
    !disabled && !error
      ? "focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800"
      : "",
    className,
  ]
    .filter((value) => value.length > 0)
    .join(" ");

  return (
    <div className="relative">
      <textarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={textareaClasses}
      />
      {hint && (
        <p
          className={`mt-2 text-sm ${
            error ? "text-error-500" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default TextArea;
