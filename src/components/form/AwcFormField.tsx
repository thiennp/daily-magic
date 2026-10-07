import type { ReactElement, ReactNode } from "react";

import Label from "@/components/form/Label";

export const AWC_FORM_CONTROL_CLASS =
  "w-full rounded-lg border border-awc-border bg-white px-4 py-3 text-sm shadow-theme-xs outline-none transition focus:border-awc-blue-300 focus:ring-3 focus:ring-awc-blue-600/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90";

interface AwcFormFieldProps {
  readonly id: string;
  readonly label: string;
  readonly children: ReactNode;
}

export default function AwcFormField({
  id,
  label,
  children,
}: AwcFormFieldProps): ReactElement {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}
