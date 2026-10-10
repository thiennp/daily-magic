"use client";

import EntitlementLimitNote from "@/features/billing/components/EntitlementLimitNote";
import useBillingEntitlements from "@/features/billing/hooks/useBillingEntitlements";
import {
  isAtOrOverLimit,
  resolveComputerLimitMessage,
} from "@/features/billing/resolveEntitlementLimitMessage";
import { countLinkedAgentWitchComputers } from "@/features/home/utils/public-api/presentation";

interface ComputerEntitlementLimitNoteProps {
  readonly devices: readonly {
    readonly installBundleVersion?: string | null;
    readonly deviceLabel?: string | null;
    readonly displayName?: string | null;
  }[];
  /** Same number as the Computers header ("N connected"). */
  readonly connectedCount: number;
}

/** Shows when linked computers hit entitlements.maxComputers. Never hides Connect. */
export default function ComputerEntitlementLimitNote({
  devices,
  connectedCount,
}: ComputerEntitlementLimitNoteProps) {
  const { entitlements } = useBillingEntitlements();
  if (!entitlements) {
    return null;
  }
  const linked = countLinkedAgentWitchComputers(devices);
  if (!isAtOrOverLimit(linked, entitlements.maxComputers)) {
    return null;
  }
  return (
    <EntitlementLimitNote
      message={resolveComputerLimitMessage(entitlements.maxComputers, {
        linked,
        connected: connectedCount,
      })}
    />
  );
}
