"use client";

import type { ReactNode } from "react";

import {
  AWC_PROJECT_DETAIL_SECTION_CLASS,
  AWC_PROJECT_DETAIL_SECTION_TITLE_CLASS,
} from "@/features/projects/awcProjectDetailSection.constant";

interface AwcProjectDetailSectionProps {
  readonly title: string;
  readonly hint?: string;
  readonly children: ReactNode;
}

export default function AwcProjectDetailSection({
  title,
  hint,
  children,
}: AwcProjectDetailSectionProps) {
  return (
    <section className={AWC_PROJECT_DETAIL_SECTION_CLASS}>
      <header className="space-y-0.5">
        <h3 className={AWC_PROJECT_DETAIL_SECTION_TITLE_CLASS}>{title}</h3>
        {hint ? (
          <p className="text-xs text-gray-500 dark:text-gray-400">{hint}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
