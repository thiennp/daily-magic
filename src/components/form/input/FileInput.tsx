import React, { FC } from "react";

interface FileInputProps {
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ className, onChange }) => {
  return (
    <input
      type="file"
      className={`focus:border-ring-brand-300 h-11 w-full overflow-hidden rounded-lg border border-awc-border-strong bg-transparent text-sm text-awc-fg-muted shadow-theme-xs transition-colors file:mr-5 file:border-collapse file:cursor-pointer file:rounded-l-lg file:border-0 file:border-r file:border-solid file:border-awc-border file:bg-awc-surface-2 file:py-3 file:pl-3.5 file:pr-3 file:text-sm file:text-awc-fg placeholder:text-awc-fg-muted hover:file:bg-awc-tile focus:outline-hidden focus:file:ring-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:text-white/90 dark:file:border-gray-800 dark:file:bg-white/[0.03] dark:file:text-gray-400 dark:placeholder:text-gray-400 ${className}`}
      onChange={onChange}
    />
  );
};

export default FileInput;
