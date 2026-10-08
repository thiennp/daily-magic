"use client";

import { useState } from "react";

import { isCostControlAutoIgnoredEmail } from "@/lib/billing/isCostControlAutoIgnoredEmail";
import postAdminSetCostControlExcluded from "@/features/billing/postAdminSetCostControlExcluded";

interface AdminCostControlExcludeCheckboxProps {
  readonly userId: string;
  readonly excluded: boolean;
  readonly email: string;
}

/** Admin-only: ignore this user in the cost-control estimate. */
export default function AdminCostControlExcludeCheckbox({
  userId,
  excluded,
  email,
}: AdminCostControlExcludeCheckboxProps) {
  const autoIgnored = isCostControlAutoIgnoredEmail(email);
  const [checked, setChecked] = useState(excluded);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (next: boolean) => {
    setBusy(true);
    setError(null);
    try {
      await postAdminSetCostControlExcluded({ userId, excluded: next });
      setChecked(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <label className="flex items-center gap-2 text-xs">
      <input
        type="checkbox"
        checked={checked || autoIgnored}
        disabled={busy || autoIgnored}
        onChange={(event) => void handleChange(event.target.checked)}
      />
      Ignore in cost control
      {error ? <span className="text-awc-fg-muted">{error}</span> : null}
    </label>
  );
}
