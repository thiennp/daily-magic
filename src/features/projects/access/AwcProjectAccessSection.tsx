"use client";

import type { ReactNode } from "react";

import AwcProjectMembersInfoTip from "@/features/projects/members/AwcProjectMembersInfoTip";
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
  /** Rail (design v2): show the hint as an (i) tooltip beside the title instead of a visible line. */
  readonly hintAsTip?: boolean;
  /** Rail: icon tile before the title. */
  readonly icon?: ReactNode;
  readonly children: ReactNode;
}

export default function AwcProjectAccessSection({
  id,
  title,
  hint,
  count,
  alertCount = false,
  hintAsTip = false,
  icon,
  children,
}: AwcProjectAccessSectionProps) {
  const badgeClass = alertCount
    ? AWC_PROJECT_ACCESS_BADGE_ALERT_CLASS
    : AWC_PROJECT_ACCESS_BADGE_CLASS;

  return (
    <section id={id} className={AWC_PROJECT_ACCESS_SECTION_CLASS}>
      <header className="space-y-0.5">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className={AWC_PROJECT_ACCESS_SECTION_TITLE_CLASS}>{title}</h3>
          {count !== undefined ? (
            <span className={badgeClass}>{count}</span>
          ) : null}
          {hint && hintAsTip ? (
            <AwcProjectMembersInfoTip id={`${id ?? title}-tip`}>
              {hint}
            </AwcProjectMembersInfoTip>
          ) : null}
        </div>
        {hint && !hintAsTip ? (
          <p className={AWC_PROJECT_ACCESS_SECTION_HINT_CLASS}>{hint}</p>
        ) : null}
      </header>
      {children}
    </section>
  );
}
