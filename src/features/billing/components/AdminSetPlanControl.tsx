"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import type { BillingPlanId } from "@/features/billing/billingPlan.types";
import formatBillingPlanLabel from "@/features/billing/formatBillingPlanLabel";
import postAdminSetPlan from "@/features/billing/postAdminSetPlan";

const PLAN_OPTIONS: readonly BillingPlanId[] = [
  "trial",
  "pro",
  "team",
  "admin_free",
];

interface AdminSetPlanControlProps {
  readonly userId: string;
  readonly plan: BillingPlanId;
  readonly onUpdated?: (next: {
    readonly plan: BillingPlanId;
    readonly adminFree: boolean;
  }) => void;
}

/** Admin-only plan override (trial / pro / team / permanent Free). No Stripe. */
export default function AdminSetPlanControl({
  userId,
  plan,
  onUpdated,
}: AdminSetPlanControlProps) {
  const [selected, setSelected] = useState<BillingPlanId>(plan);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleApply = async () => {
    if (selected === plan) return;
    setBusy(true);
    setMessage(null);
    try {
      const result = await postAdminSetPlan({ userId, plan: selected });
      setMessage(BILLING_COPY.adminSetPlanDone);
      onUpdated?.(result);
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : BILLING_COPY.adminSetPlanError,
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <select
          className="h-9 min-w-[10rem] appearance-none rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-theme-xs focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
          value={selected}
          disabled={busy}
          aria-label="User plan"
          onChange={(event) => {
            setSelected(event.target.value as BillingPlanId);
            setMessage(null);
          }}
        >
          {PLAN_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {formatBillingPlanLabel(option)}
            </option>
          ))}
        </select>
        <Button
          size="sm"
          variant="outline"
          disabled={busy || selected === plan}
          onClick={() => void handleApply()}
        >
          {BILLING_COPY.adminSetPlanApply}
        </Button>
      </div>
      {message ? <p className="text-xs text-gray-500">{message}</p> : null}
    </div>
  );
}
