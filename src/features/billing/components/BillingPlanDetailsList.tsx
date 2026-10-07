import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import type { BillingPlanSummaryPayload } from "@/features/billing/billingPlan.types";
import formatBillingPlanLabel from "@/features/billing/formatBillingPlanLabel";

interface BillingPlanDetailsListProps {
  readonly plan: BillingPlanSummaryPayload;
}

export default function BillingPlanDetailsList({
  plan,
}: BillingPlanDetailsListProps) {
  const trialEnds =
    plan.plan === "trial" && plan.trialEndsAt
      ? new Date(plan.trialEndsAt).toLocaleDateString()
      : null;

  return (
    <dl className="mt-3 grid gap-2 text-sm text-awc-fg sm:grid-cols-2">
      <div>
        <dt className="text-awc-fg-muted">Plan</dt>
        <dd className="font-medium">{formatBillingPlanLabel(plan.plan)}</dd>
      </div>
      {trialEnds ? (
        <div>
          <dt className="text-awc-fg-muted">{BILLING_COPY.trialEndsPrefix}</dt>
          <dd className="font-medium">{trialEnds}</dd>
        </div>
      ) : null}
      <div>
        <dt className="text-awc-fg-muted">{BILLING_COPY.seatsLabel}</dt>
        <dd className="font-medium">{plan.seats}</dd>
      </div>
      <div>
        <dt className="text-awc-fg-muted">{BILLING_COPY.computersLabel}</dt>
        <dd className="font-medium">Up to {plan.maxComputers}</dd>
      </div>
      <div>
        <dt className="text-awc-fg-muted">{BILLING_COPY.assistantsLabel}</dt>
        <dd className="font-medium">Up to {plan.maxAssistantConnects}</dd>
      </div>
      <div>
        <dt className="text-awc-fg-muted">Cloud message storage</dt>
        <dd className="font-medium">
          {plan.cloudMessageStorage
            ? BILLING_COPY.cloudStorageOn
            : BILLING_COPY.cloudStorageOff}
        </dd>
      </div>
    </dl>
  );
}
