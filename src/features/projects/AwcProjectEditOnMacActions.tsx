"use client";

import { useId } from "react";

import type { ProjectEditOnMacCta } from "@/features/projects/utils/resolveProjectEditOnMacCta";

interface AwcProjectEditOnMacActionsProps {
  readonly editCta: ProjectEditOnMacCta;
  readonly size?: "compact" | "default";
  readonly layout?: "stacked" | "buttonOnly";
  readonly fullWidthOnMobile?: boolean;
}

export default function AwcProjectEditOnMacActions({
  editCta,
  size = "default",
  layout = "stacked",
  fullWidthOnMobile = false,
}: AwcProjectEditOnMacActionsProps) {
  const helperId = useId();
  const widthClass = fullWidthOnMobile ? " w-full sm:w-auto" : "";
  const buttonClass =
    (size === "compact"
      ? "inline-flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-medium"
      : "inline-flex items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium") +
    widthClass;

  const button =
    editCta.href !== null ? (
      <a
        href={editCta.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonClass} border-brand-200 bg-brand-50 text-brand-700 transition hover:bg-brand-100 dark:border-brand-900/50 dark:bg-brand-950/30 dark:text-brand-300`}
      >
        {editCta.buttonLabel}
      </a>
    ) : (
      <button
        type="button"
        disabled
        aria-describedby={editCta.helperText !== null ? helperId : undefined}
        className={`${buttonClass} cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900/40 dark:text-gray-500`}
      >
        {editCta.buttonLabel}
      </button>
    );

  const helper =
    editCta.helperText !== null ? (
      <p
        id={helperId}
        className={
          size === "compact"
            ? "mt-2 text-xs text-gray-500 dark:text-gray-400"
            : "mt-2 text-sm text-gray-500 dark:text-gray-400"
        }
      >
        {editCta.helperText}
      </p>
    ) : null;

  if (layout === "buttonOnly") {
    return button;
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {button}
      </div>
      {helper}
    </>
  );
}
