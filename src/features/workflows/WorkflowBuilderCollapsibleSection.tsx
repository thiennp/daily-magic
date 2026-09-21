"use client";

import { useState } from "react";

interface WorkflowBuilderCollapsibleSectionProps {
  readonly title: string;
  readonly description?: string;
  readonly defaultExpanded?: boolean;
  readonly children: React.ReactNode;
}

export default function WorkflowBuilderCollapsibleSection({
  title,
  description,
  defaultExpanded = true,
  children,
}: WorkflowBuilderCollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <section className="rounded-xl border border-gray-100 dark:border-gray-800">
      <button
        type="button"
        onClick={() => {
          setIsExpanded((current) => !current);
        }}
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={isExpanded}
      >
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-gray-900 dark:text-white/90">
            {title}
          </span>
          {description !== undefined && description.length > 0 ? (
            <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
              {description}
            </span>
          ) : null}
        </span>
        <span
          className="shrink-0 text-lg leading-none text-gray-500 dark:text-gray-400"
          aria-hidden
        >
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      {isExpanded ? (
        <div className="space-y-4 border-t border-gray-100 px-4 py-4 dark:border-gray-800">
          {children}
        </div>
      ) : null}
    </section>
  );
}
