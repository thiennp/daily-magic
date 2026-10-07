import { BILLING_COPY } from "@/features/billing/billingCopy.constant";

/** Signed-out blocking banner after OAuth/signup when trialGate is closed. */
export default function PricingTrialClosedBanner() {
  return (
    <div
      role="status"
      className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      {BILLING_COPY.trialGateClosed}
    </div>
  );
}
