import { BILLING_COPY } from "@/features/billing/billingCopy.constant";

export function resolveComputerLimitMessage(maxComputers: number): string {
  return BILLING_COPY.computerLimit.replace("{max}", String(maxComputers));
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
