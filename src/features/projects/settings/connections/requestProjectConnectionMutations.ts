import type { ProjectConnectionProvider } from "@/features/projects/settings/connections/projectConnection.types";

const connectionUrl = (
  projectId: string,
  provider: ProjectConnectionProvider,
): string =>
  `/api/projects/${encodeURIComponent(projectId)}/connections/${encodeURIComponent(provider)}`;

/** POST …/connections/:provider/start → provider sign-in URL (owner only). */
export const requestStartProjectConnection = async (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
}): Promise<
  { readonly ok: true; readonly url: string } | { readonly ok: false }
> => {
  try {
    const response = await fetch(
      `${connectionUrl(input.projectId, input.provider)}/start`,
      { method: "POST" },
    );
    const data: unknown = await response.json().catch(() => null);
    const url =
      typeof data === "object" && data !== null && "url" in data
        ? (data as { url: unknown }).url
        : null;
    return response.ok && typeof url === "string" && url !== ""
      ? { ok: true, url }
      : { ok: false };
  } catch {
    return { ok: false };
  }
};

/** DELETE …/connections/:provider (owner only). */
export const requestDisconnectProjectConnection = async (input: {
  readonly projectId: string;
  readonly provider: ProjectConnectionProvider;
}): Promise<boolean> => {
  try {
    const response = await fetch(
      connectionUrl(input.projectId, input.provider),
      { method: "DELETE" },
    );
    return response.ok;
  } catch {
    return false;
  }
};
