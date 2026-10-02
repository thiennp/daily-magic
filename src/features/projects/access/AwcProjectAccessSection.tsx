"use client";

import type { ReactNode } from "react";

import {
  AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS,
  AWC_PROJECT_ACCESS_BADGE_CLASS,
  AWC_PROJECT_ACCESS_SECTION_CLASS,
  AWC_PROJECT_ACCESS_SECTION_HINT_CLASS,
  AWC_PROJECT_ACCESS_SECTION_TITLE_CLASS,
} from "@/features/projects/access/awcProjectAccessSection.constant";

interface AwcProjectAccessSectionProps {
  readonly id?: string;
  readonly title: string;
  readonly hint?: string;
  readonly count?: number;
  readonly alertCount?: boolean;
  readonly children: ReactNode;
}

export default function AwcProjectAccessSection({
  id,
  title,
  hint,
  count,
  alertCount = false,
  children,
}: AwcProjectAccessSectionProps) {
  const badgeClass = alertCount
    ? AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS
    : AWC_PROJECT_ACCESS_BADGE_CLASS;

  return (
    <section id={id} className={AWC_PROJECT_ACCESS_SECTION_CLASS}>
      <header className="space-y-0.5">
        <div className="flex items-center gap-2">
          <h3 className={AWC_PROJECT_ACCESS_SECTION_TITLE_CLASS}>{title}</h3>
          {count !== undefined ? (
            <span className={badgeClass}>{count}</span>
          ) : null}
        </div>
        {hint ? (
          <p className={AWC_PROJECT_ACCESS_SECTION_HINT_CLASS}>{hint}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
