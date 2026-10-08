"use client";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import formatCostControlStatus from "@/features/billing/formatCostControlStatus";
import useAdminCostControl from "@/features/billing/hooks/useAdminCostControl";

/** Admin-only cost control. Never mount on customer Pricing. */
export default function AdminCostControlPanel() {
  const { data, isLoading, error, refresh } = useAdminCostControl();

  if (isLoading) {
    return (
      <p className="text-sm text-awc-fg-muted">
        {BILLING_COPY.adminCostLoading}
      </p>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-awc-bad">
          {error ?? BILLING_COPY.adminCostError}
        </p>
        <Button size="sm" variant="outline" onClick={() => void refresh()}>
          {BILLING_COPY.tryAgain}
        </Button>
      </div>
    );
  }

  const { signals } = data;
  const excludedUsers = signals.eligibleUsers - signals.countedUsers;

  return (
    <AppPanel>
      <h1 className="text-xl font-semibold text-awc-fg">
        {BILLING_COPY.adminCostHeading}
      </h1>
      <p className="mt-1 text-sm text-awc-fg-muted">Month {data.month}</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-awc-fg-muted">{BILLING_COPY.adminSpendLabel}</dt>
          <dd className="font-medium">
            €{data.trialPlusAdminFreeSpendEur.toFixed(2)}
          </dd>
        </div>
        <div>
          <dt className="text-awc-fg-muted">{BILLING_COPY.adminBudgetLabel}</dt>
          <dd className="font-medium">€{data.budgetEur.toFixed(2)}</dd>
        </div>
        <div>
          <dt className="text-awc-fg-muted">{BILLING_COPY.adminStatusLabel}</dt>
          <dd className="font-medium">
            {formatCostControlStatus(data.status)}
          </dd>
        </div>
        <div>
          <dt className="text-awc-fg-muted">{BILLING_COPY.adminGateLabel}</dt>
          <dd className="font-medium">{data.trialGate}</dd>
        </div>
      </dl>
      <h2 className="mt-6 text-sm font-semibold text-awc-fg">
        {BILLING_COPY.adminSignalsHeading}
      </h2>
      <ul className="mt-2 space-y-1 text-sm text-awc-fg">
        <li>Railway: €{signals.railwaySpendEur.toFixed(2)}</li>
        <li>Neon: €{signals.neonSpendEur.toFixed(2)}</li>
        <li>Related infra: €{signals.relatedInfraSpendEur.toFixed(2)}</li>
        <li>
          Estimated users: €{signals.estimatedUserSpendEur.toFixed(2)} (
          {signals.countedUsers} counted; bots, test and excluded users ignored)
        </li>
        <li>
          If every user counted: €{signals.estimatedAllUsersSpendEur.toFixed(2)}{" "}
          ({signals.eligibleUsers} trial/free users, {excludedUsers} excluded)
        </li>
      </ul>
    </AppPanel>
  );
}
