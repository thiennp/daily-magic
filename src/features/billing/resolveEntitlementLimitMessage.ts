import { BILLING_COPY } from "@/features/billing/billingCopy.constant";

/** Spells out linked vs connected so "4 connected" next to "limit (5)" reads true (offline computers count). */
export function resolveComputerLimitMessage(
  maxComputers: number,
  counts?: { readonly linked: number; readonly connected: number },
): string {
  const linked = counts?.linked ?? maxComputers;
  const connected = Math.min(counts?.connected ?? linked, linked);
  const offline = linked - connected;
  const split =
    offline > 0 ? ` (${connected} connected, ${offline} offline)` : "";
  return BILLING_COPY.computerLimit
    .replace("{linked}", String(linked))
    .replace("{max}", String(maxComputers))
    .replace("{split}", split);
}

export function resolveAssistantLimitMessage(
  maxAssistantConnects: number,
): string {
  return BILLING_COPY.assistantLimit.replace(
    "{max}",
    String(maxAssistantConnects),
  );
}

export function isAtOrOverLimit(
  currentCount: number,
  maxAllowed: number,
): boolean {
  return currentCount >= maxAllowed;
}
