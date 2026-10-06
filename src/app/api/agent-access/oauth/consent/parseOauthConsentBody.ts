export type OauthConsentBody = {
  readonly pendingId: string;
  readonly decision: "approve" | "deny";
  readonly acceptTerms: unknown;
  readonly termsVersion: unknown;
};

export const parseOauthConsentBody = async (
  request: Request,
): Promise<OauthConsentBody> => {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    const at = form.get("acceptTerms");
    const tv = form.get("termsVersion");
    return {
      pendingId: String(form.get("pending") ?? ""),
      decision:
        String(form.get("decision") ?? "") === "approve" ? "approve" : "deny",
      acceptTerms:
        at === "true" || at === "on"
          ? true
          : at === "false"
            ? false
            : undefined,
      termsVersion: typeof tv === "string" ? tv : undefined,
    };
  }

  const json: unknown = await request.json().catch(() => null);
  const body =
    json !== null && typeof json === "object"
      ? (json as Record<string, unknown>)
      : {};
  return {
    pendingId: typeof body.pending === "string" ? body.pending : "",
    decision: body.decision === "approve" ? "approve" : "deny",
    acceptTerms: body.acceptTerms,
    termsVersion: body.termsVersion,
  };
};
