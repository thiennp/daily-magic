"use client";

import EntitlementLimitNote from "@/features/billing/components/EntitlementLimitNote";
import useBillingEntitlements from "@/features/billing/hooks/useBillingEntitlements";
import {
  isAtOrOverLimit,
  resolveComputerLimitMessage,
} from "@/features/billing/resolveEntitlementLimitMessage";
import { countLinkedAgentWitchComputers } from "@/features/home/utils/isAgentWitchConnectInstallPlaceholderDevice";

interface ComputerEntitlementLimitNoteProps {
  readonly devices: readonly {
    readonly installBundleVersion?: string | null;
    readonly deviceLabel?: string | null;
    readonly displayName?: string | null;
  }[];
}

/** Shows when linked computers hit entitlements.maxComputers. Never hides Connect. */
export default function ComputerEntitlementLimitNote({
  devices,
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
      message={resolveComputerLimitMessage(entitlements.maxComputers)}
    />
  );
}
