"use client";

import { useCallback, useEffect, useState } from "react";

import type { BillingEntitlements } from "@/features/billing/billingPlan.types";
import fetchBillingEntitlements from "@/features/billing/fetchBillingEntitlements";

interface UseBillingEntitlementsResult {
  readonly entitlements: BillingEntitlements | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
}

export default function useBillingEntitlements(): UseBillingEntitlementsResult {
  const [entitlements, setEntitlements] =
    useState<BillingEntitlements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setEntitlements(await fetchBillingEntitlements());
    } catch (err) {
      setEntitlements(null);
      setError(
        err instanceof Error ? err.message : "Could not load entitlements.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Mount/refresh bootstrap: load remote billing snapshot once per hook identity.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Soft cost-control fetch-on-mount
    void refresh();
  }, [refresh]);

  return { entitlements, isLoading, error, refresh };
}
