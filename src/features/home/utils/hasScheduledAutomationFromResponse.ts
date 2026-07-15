export const hasScheduledAutomationFromResponse = (payload: unknown): boolean =>
  typeof payload === "object" &&
  payload !== null &&
  "automations" in payload &&
  Array.isArray((payload as { automations: unknown[] }).automations) &&
  (payload as { automations: unknown[] }).automations.length > 0;
