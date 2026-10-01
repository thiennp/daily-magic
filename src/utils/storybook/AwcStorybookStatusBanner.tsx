"use client";

import type { StorybookPageStatus } from "@/utils/storybook/storybookPageStatus.constant";

const STATUS_COPY: Partial<
  Record<
    StorybookPageStatus,
    { readonly title: string; readonly detail: string }
  >
> = {
  loading: {
    title: "Loading preview",
    detail: "Waiting for data to load in this Storybook state.",
  },
  empty: {
    title: "Empty preview",
    detail: "No records yet in this Storybook empty state.",
  },
  error: {
    title: "Error preview",
    detail: "Something failed in this Storybook error state.",
  },
};

export default function AwcStorybookStatusBanner({
  status,
}: {
  readonly status: StorybookPageStatus;
}) {
  const copy = STATUS_COPY[status];
  if (copy === undefined) {
    return null;
  }

  return (
    <div
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
      role="status"
      aria-live="polite"
    >
      <p className="font-medium">{copy.title}</p>
      <p className="text-amber-900/90 dark:text-amber-100/90">{copy.detail}</p>
    </div>
  );
}
