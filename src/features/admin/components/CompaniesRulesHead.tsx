import type { ReactNode } from "react";

import InfoTip from "@/components/ui/infoTip/InfoTip";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  PROJECT_V5_BREADCRUMB_CLASS,
  PROJECT_V5_H1_CLASS,
} from "@/features/projects/public-api/types";

interface CompaniesRulesHeadProps {
  readonly crumbs: ReactNode;
  readonly title: string;
  readonly tip?: string;
  readonly tipLabel?: string;
  readonly lede?: string;
}

export const COMPANIES_RULES_CRUMB_SEP = <span aria-hidden="true">›</span>;

export const COMPANIES_RULES_HUB_CRUMBS = (
  <>
    <span>{C.crumbManage}</span>
    {COMPANIES_RULES_CRUMB_SEP}
    <span aria-current="page">{C.crumbHub}</span>
  </>
);

export default function CompaniesRulesHead({
  crumbs,
  title,
  tip,
  tipLabel = "More info",
  lede,
}: CompaniesRulesHeadProps) {
  return (
    <header className="space-y-3">
      <nav aria-label="Breadcrumb" className={PROJECT_V5_BREADCRUMB_CLASS}>
        {crumbs}
      </nav>
      <div className="flex flex-wrap items-center gap-3">
        <h1 id="page-h" tabIndex={-1} className={PROJECT_V5_H1_CLASS}>
          {title}
        </h1>
        {tip ? <InfoTip text={tip} label={tipLabel} /> : null}
      </div>
      {lede ? (
        <p className="max-w-2xl text-sm text-awc-fg-muted">{lede}</p>
      ) : null}
    </header>
  );
}
