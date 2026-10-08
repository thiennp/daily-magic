"use client";

import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import BillingPlanDetailsList from "@/features/billing/components/BillingPlanDetailsList";
import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import useBillingPlan from "@/features/billing/hooks/useBillingPlan";
import postBillingPortalStub from "@/features/billing/postBillingPortalStub";

/** Customer Account → Billing summary. Never calls admin cost-control. */
export default function BillingPlanSummary() {
  const { plan, isLoading, error, refresh } = useBillingPlan();
  const [portalNote, setPortalNote] = useState<string | null>(null);

  if (isLoading) {
    return (
      <p role="status" className="mb-10 text-sm text-awc-fg-muted">
        {BILLING_COPY.loading}
      </p>
    );
  }

  if (error || !plan) {
    return (
      <div
        role="alert"
        className="mb-10 flex flex-col items-center gap-3 rounded-lg border border-dashed border-awc-border-strong bg-awc-surface-2 px-4 py-6 text-center"
      >
        <h2 className="text-base font-semibold text-awc-fg">
          Could not load plans
        </h2>
        <p className="text-sm text-awc-bad">
          {error ?? BILLING_COPY.loadError}
        </p>
        <Button size="sm" onClick={() => void refresh()}>
          {BILLING_COPY.tryAgain}
        </Button>
      </div>
    );
  }

  const showPortal = plan.plan === "pro" || plan.plan === "team";

  return (
    <AppPanel padding="compact" className="mb-10">
      <h2 className="text-lg font-semibold text-awc-fg">
        {BILLING_COPY.planHeading}
      </h2>
      <BillingPlanDetailsList plan={plan} />
      {plan.adminFree || plan.plan === "admin_free" ? (
        <p className="mt-3 text-sm text-awc-warn">
          {BILLING_COPY.adminFreeEdge}
        </p>
      ) : null}
      {plan.trialGate === "closed" ? (
        <p className="mt-3 text-sm text-awc-warn">
          {plan.trialGateReason ?? BILLING_COPY.trialGateClosed}
        </p>
      ) : null}
      {plan.cancelAnytime ? (
        <p className="mt-3 text-sm text-awc-fg-muted">
          {BILLING_COPY.cancelAnytime}
        </p>
      ) : null}
      {showPortal ? (
        <div className="mt-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              void postBillingPortalStub().then((result) => {
                setPortalNote(result.message ?? BILLING_COPY.portalStubPending);
              });
            }}
          >
            Manage billing
          </Button>
          {portalNote ? (
            <p className="mt-2 text-xs text-awc-fg-muted">{portalNote}</p>
          ) : null}
        </div>
      ) : null}
    </AppPanel>
  );
}
