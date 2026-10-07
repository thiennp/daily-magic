"use client";

import EntitlementLimitNote from "@/features/billing/components/EntitlementLimitNote";
import useBillingEntitlements from "@/features/billing/hooks/useBillingEntitlements";
import {
  isAtOrOverLimit,
  resolveAssistantLimitMessage,
} from "@/features/billing/resolveEntitlementLimitMessage";

interface AssistantEntitlementLimitNoteProps {
  readonly connectedCount: number;
}

/** Shows when assistants hit entitlements.maxAssistantConnects. Never hides Connect. */
export default function AssistantEntitlementLimitNote({
  connectedCount,
}: AssistantEntitlementLimitNoteProps) {
  const { entitlements } = useBillingEntitlements();
  if (!entitlements) {
    return null;
  }
  if (!isAtOrOverLimit(connectedCount, entitlements.maxAssistantConnects)) {
    return null;
  }
  return (
    <EntitlementLimitNote
      message={resolveAssistantLimitMessage(entitlements.maxAssistantConnects)}
    />
  );
}
