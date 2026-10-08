export interface ProjectFolderLocalStatus {
  readonly folderFound: boolean;
  readonly isGitRepo: boolean;
  /** `origin` remote, credentials already stripped on the computer. */
  readonly gitRemoteUrl: string | null;
  readonly branch: string | null;
}

export type ProjectFolderStatusResult =
  | { readonly kind: "ready"; readonly status: ProjectFolderLocalStatus | null }
  | { readonly kind: "unreachable" };

export type ProjectFolderLinkResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly code: string | null;
      readonly message: string | null;
    };

const bridgeUrl = (wakePort: number, route: string): string =>
  `http://127.0.0.1:${wakePort}${route}`;

const asRecord = (value: unknown): Record<string, unknown> | null =>
  typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : null;

const nonEmptyString = (value: unknown): string | null =>
  typeof value === "string" && value.trim().length > 0 ? value.trim() : null;

/** GET /projects/folders on the computer's bridge; only answers in a browser on that computer. */
export const fetchProjectFolderStatus = async (
  wakePort: number,
  projectId: string,
): Promise<ProjectFolderStatusResult> => {
  try {
    const response = await fetch(bridgeUrl(wakePort, "/projects/folders"));
    const body = asRecord(await response.json());
    const folders = Array.isArray(body?.folders)
      ? (body.folders as unknown[])
      : [];
    const entry = folders
      .map(asRecord)
      .find((item) => item?.projectId === projectId);
    return {
      kind: "ready",
      status: entry
        ? {
            folderFound: entry.folderFound === true,
            isGitRepo: entry.isGitRepo === true,
            gitRemoteUrl: nonEmptyString(entry.gitRemoteUrl),
            branch: nonEmptyString(entry.branch),
          }
        : null,
    };
  } catch {
    return { kind: "unreachable" };
  }
};

/** POST /projects/link-folder: typed path, validated on the computer, then saved to Cloud. */
export const linkProjectFolderViaBridge = async (input: {
  readonly wakePort: number;
  readonly projectId: string;
  readonly folderPath: string;
  readonly allowOutsideHome: boolean;
}): Promise<ProjectFolderLinkResult> => {
  try {
    const response = await fetch(
      bridgeUrl(input.wakePort, "/projects/link-folder"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: input.projectId,
          folderPath: input.folderPath,
          allowOutsideHome: input.allowOutsideHome,
        }),
      },
    );
    const body = asRecord(await response.json().catch(() => null));
    if (response.ok && body?.ok === true) return { ok: true };
    return {
      ok: false,
      code: typeof body?.error === "string" ? body.error : null,
      message:
        typeof body?.errorMessage === "string" ? body.errorMessage : null,
    };
  } catch {
    return { ok: false, code: "forbidden_origin", message: null };
  }
};
