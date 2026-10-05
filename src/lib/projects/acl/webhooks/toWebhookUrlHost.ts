/** Host of a stored webhook URL for display (never the path or query). */
export const toWebhookUrlHost = (url: string): string | null => {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
};
