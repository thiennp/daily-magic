import type { ReactElement, ReactNode } from "react";

export const PROMPT_SDLC_FIELD_CLASS =
  "mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm dark:border-gray-700 dark:bg-gray-800";

interface PromptSdlcFieldProps {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
}

export default function PromptSdlcField({
  id,
  label,
  children,
}: PromptSdlcFieldProps): ReactElement {
  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-800 dark:text-white/90"
        htmlFor={id}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
