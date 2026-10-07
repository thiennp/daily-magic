"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { BILLING_COPY } from "@/features/billing/billingCopy.constant";
import postAdminSetFree from "@/features/billing/postAdminSetFree";

interface AdminSetFreeButtonProps {
  readonly userId: string;
  readonly adminFree: boolean;
  readonly onUpdated?: () => void;
}

/** Admin-only permanent Free toggle. Not self-serve. */
export default function AdminSetFreeButton({
  userId,
  adminFree,
  onUpdated,
}: AdminSetFreeButtonProps) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    setBusy(true);
    setMessage(null);
    try {
      await postAdminSetFree({ userId, adminFree: !adminFree });
      setMessage(BILLING_COPY.adminSetFreeDone);
      onUpdated?.();
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : BILLING_COPY.adminSetFreeError,
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-1">
      <Button
        size="sm"
        variant="outline"
        disabled={busy}
        onClick={() => void handleClick()}
      >
        {adminFree ? BILLING_COPY.adminSetFreeOff : BILLING_COPY.adminSetFreeOn}
      </Button>
      {message ? <p className="text-xs text-gray-500">{message}</p> : null}
    </div>
  );
}
