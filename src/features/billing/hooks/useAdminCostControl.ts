"use client";

import { useCallback, useEffect, useState } from "react";

import type { AdminCostControl } from "@/features/billing/billingPlan.types";
import fetchAdminCostControl from "@/features/billing/fetchAdminCostControl";

interface UseAdminCostControlResult {
  readonly data: AdminCostControl | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
}

export default function useAdminCostControl(): UseAdminCostControlResult {
  const [data, setData] = useState<AdminCostControl | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setData(await fetchAdminCostControl());
    } catch (err) {
      setData(null);
      setError(
        err instanceof Error ? err.message : "Could not load cost control.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, isLoading, error, refresh };
}
