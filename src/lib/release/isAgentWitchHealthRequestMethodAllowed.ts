/** Methods the server.ts /api/health short-circuit answers; others get 405. */
export const AGENT_WITCH_HEALTH_ALLOWED_METHODS = ["GET", "HEAD"] as const;

export const isAgentWitchHealthRequestMethodAllowed = (
  method: string | undefined,
): boolean =>
  (AGENT_WITCH_HEALTH_ALLOWED_METHODS as readonly string[]).includes(
    (method ?? "GET").toUpperCase(),
  );
