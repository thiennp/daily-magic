/**
 * Shared 501 body for feature-off / missing AUTH_SECRET / missing provider env.
 * UI copy matches projectConnectionsCopy.unavailable.
 */
export const projectConnectionsUnavailableJson = (): Response =>
  Response.json(
    {
      ok: false,
      code: "unavailable",
      errorMessage: "Connections are not available on this deploy yet.",
    },
    { status: 501 },
  );
