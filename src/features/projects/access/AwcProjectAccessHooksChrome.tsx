"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

/** Minimal hooks/dispatch status chrome (Working UI > Storybook). No fake live state. */
export default function AwcProjectAccessHooksChrome() {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <div
      id="project-access-hooks"
      className="rounded-md border border-dashed border-gray-300 bg-gray-50/60 px-3 py-2 dark:border-gray-700 dark:bg-gray-950/30"
    >
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.hooksHeading}
      </h3>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        {copy.hooksStatus}
      </p>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
        {copy.hooksPendingNote}
      </p>
    </div>
  );
}
