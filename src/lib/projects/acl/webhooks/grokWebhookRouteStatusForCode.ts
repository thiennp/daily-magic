/** Owner grok-webhook route: ACL / write machine code → HTTP status. */
export const grokWebhookRouteStatusForCode = (code: string): number => {
  if (code === "forbidden") return 403;
  if (code === "not_found") return 404;
  if (code === "naming_required") return 409;
  return 400;
};
