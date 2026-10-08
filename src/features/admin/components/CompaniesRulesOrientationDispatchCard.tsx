"use client";

import InfoTip from "@/components/ui/infoTip/InfoTip";
import Button from "@/components/ui/button/Button";
import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  DispatchPolicy,
  type DispatchPolicyValue,
} from "@/lib/dispatch/DispatchPolicy.constant";

interface CompaniesRulesOrientationDispatchCardProps {
  readonly groupId: string | null;
  readonly policy: DispatchPolicyValue | null;
  readonly canConfigureDispatchPolicy: boolean;
  readonly onOpenCompanySettings: () => void;
}

export default function CompaniesRulesOrientationDispatchCard({
  groupId,
  policy,
  canConfigureDispatchPolicy,
  onOpenCompanySettings,
}: CompaniesRulesOrientationDispatchCardProps) {
  const policyLabel =
    policy === DispatchPolicy.OPEN
      ? C.openLabel
      : policy === DispatchPolicy.APPROVAL
        ? C.approvalLabel
        : null;
  const policyHelper =
    policy === DispatchPolicy.OPEN
      ? C.openHelper
      : policy === DispatchPolicy.APPROVAL
        ? C.approvalHelper
        : null;

  return (
    <section
      aria-labelledby="pol-k"
      className="rounded-xl border border-awc-border bg-awc-surface p-4"
    >
      <p
        id="pol-k"
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-awc-fg-muted"
      >
        {C.dispatchSectionTitle}
        <InfoTip text={C.dispatchTip} label="About dispatch policy" />
      </p>
      {groupId && policyLabel ? (
        <>
          <p className="mt-3 text-sm font-semibold text-awc-fg">
            {policyLabel}
          </p>
          {policyHelper ? (
            <p className="mt-1 text-sm text-awc-fg-muted">{policyHelper}</p>
          ) : null}
          <div className="mt-3">
            <Button size="sm" variant="outline" onClick={onOpenCompanySettings}>
              {canConfigureDispatchPolicy ? C.changePolicy : C.viewPolicy}
            </Button>
          </div>
        </>
      ) : (
        <p className="mt-3 text-sm text-awc-fg-muted">
          {groupId ? C.policyLoading : C.createNoCompany}
        </p>
      )}
    </section>
  );
}
