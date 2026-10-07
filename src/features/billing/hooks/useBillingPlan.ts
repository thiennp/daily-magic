"use client";

import { useCallback, useEffect, useState } from "react";

import type { BillingPlanSummaryPayload } from "@/features/billing/billingPlan.types";
import fetchBillingPlan from "@/features/billing/fetchBillingPlan";

interface UseBillingPlanResult {
  readonly plan: BillingPlanSummaryPayload | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
}

export default function useBillingPlan(): UseBillingPlanResult {
  const [plan, setPlan] = useState<BillingPlanSummaryPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setPlan(await fetchBillingPlan());
    } catch (err) {
      setPlan(null);
      setError(err instanceof Error ? err.message : "Could not load plan.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Mount/refresh bootstrap: load remote billing snapshot once per hook identity.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Soft cost-control fetch-on-mount
    void refresh();
  }, [refresh]);

  return { plan, isLoading, error, refresh };
}
