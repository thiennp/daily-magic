export interface HarnessCatalogStatus {
  readonly isAgentOnline: boolean;
  readonly catalog: {
    readonly hostname: string;
    readonly reportedAt: string;
    readonly updatedAt: string;
  } | null;
}

export async function fetchHarnessCatalogStatus(): Promise<HarnessCatalogStatus | null> {
  const response = await fetch("/api/agent-witch/harness-catalog");
  if (!response.ok) {
    return null;
  }

  const data: unknown = await response.json();
  if (typeof data !== "object" || data === null) {
    return null;
  }

  return {
    isAgentOnline:
      "isAgentOnline" in data &&
      (data as { isAgentOnline: boolean }).isAgentOnline === true,
    catalog:
      "catalog" in data &&
      (data as { catalog: HarnessCatalogStatus["catalog"] }).catalog !== null &&
      typeof (data as { catalog: HarnessCatalogStatus["catalog"] }).catalog ===
        "object"
        ? (data as { catalog: HarnessCatalogStatus["catalog"] }).catalog
        : null,
  };
}

export async function publishHarnessCatalog(): Promise<{
  readonly ok: boolean;
  readonly errorMessage?: string;
}> {
  const response = await fetch("/api/agent-witch/harness-catalog", {
    method: "POST",
  });

  if (response.ok) {
    return { ok: true };
  }

  const data: unknown = await response.json();
  return {
    ok: false,
    errorMessage:
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof (data as { error: string }).error === "string"
        ? (data as { error: string }).error
        : "Could not publish harness catalog.",
  };
}
