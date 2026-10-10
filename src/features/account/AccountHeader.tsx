import InfoTip from "@/components/ui/infoTip/InfoTip";
import { ACCOUNT_BREADCRUMB_CLASS } from "@/features/account/accountClasses.constant";
import {
  ACCOUNT_COPY,
  ACCOUNT_TABS,
  type AccountTabId,
} from "@/features/account/accountCopy.constant";
import { PROJECT_V5_H1_CLASS } from "@/features/projects/public-api/types";

interface AccountHeaderProps {
  readonly tab?: AccountTabId;
}

export default function AccountHeader({ tab }: AccountHeaderProps) {
  const tabLabel = ACCOUNT_TABS.find((t) => t.id === tab)?.label;
  return (
    <header className="space-y-3">
      <nav aria-label="Breadcrumb" className={ACCOUNT_BREADCRUMB_CLASS}>
        <span>{ACCOUNT_COPY.breadcrumbRoot}</span>
        {tabLabel ? (
          <>
            <span aria-hidden>›</span>
            <span aria-current="page">{tabLabel}</span>
          </>
        ) : null}
      </nav>
      <div className="flex flex-wrap items-center gap-3">
        <h1 id="page-h" tabIndex={-1} className={PROJECT_V5_H1_CLASS}>
          {ACCOUNT_COPY.h1}
        </h1>
        <InfoTip text={ACCOUNT_COPY.tip} label="About your account" />
      </div>
    </header>
  );
}
