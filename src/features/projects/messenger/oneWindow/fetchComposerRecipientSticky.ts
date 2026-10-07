import type { ComposerRecipientStickySnapshot } from "@/lib/projects/acl/composer/decideComposerRecipientRouting.types";

export type ComposerStickyGetOk = {
  readonly ok: true;
  readonly sticky: ComposerRecipientStickySnapshot | null;
  readonly cleared: boolean;
  readonly singleAssistant: {
    readonly membershipId: string;
    readonly displayName: string | null;
  } | null;
};

export type ComposerStickyGetResult =
  | ComposerStickyGetOk
  | { readonly ok: false };

const stickyUrl = (projectId: string): string =>
  `/api/projects/${encodeURIComponent(projectId)}/composer/recipient-sticky`;

const parseSticky = (raw: unknown): ComposerRecipientStickySnapshot | null => {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const row = raw as Record<string, unknown>;
  if (row.mode === "all") return { mode: "all", membershipId: null };
  if (
    row.mode === "membership" &&
    typeof row.membershipId === "string" &&
    row.membershipId.length > 0
  ) {
    return { mode: "membership", membershipId: row.membershipId };
  }
  return null;
};

const parseSingleAssistant = (
  raw: unknown,
): ComposerStickyGetOk["singleAssistant"] => {
  if (raw === null || typeof raw !== "object" || Array.isArray(raw)) return null;
  const s = raw as Record<string, unknown>;
  if (typeof s.membershipId !== "string" || s.membershipId.length === 0) return null;
  return {
    membershipId: s.membershipId,
    displayName: typeof s.displayName === "string" ? s.displayName : null,
  };
};

/** GET — server sticky wins; includes singleAssistant hint. */
export const fetchComposerRecipientSticky = async (
  projectId: string,
  signal?: AbortSignal,
): Promise<ComposerStickyGetResult> => {
  // Aborted (or network error) → { ok: false }; callers check their signal.
  const response = await fetch(stickyUrl(projectId), {
    method: "GET",
    cache: "no-store",
    signal,
  }).catch(() => null);
  if (response === null || !response.ok) return { ok: false };
  const payload: unknown = await response.json().catch(() => null);
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false };
  }
  const body = payload as Record<string, unknown>;
  if (body.ok !== true) return { ok: false };
  return {
    ok: true,
    sticky: parseSticky(body.sticky),
    cleared: body.cleared === true,
    singleAssistant: parseSingleAssistant(body.singleAssistant),
  };
};

export const putComposerRecipientSticky = async (
  projectId: string,
  body: { readonly mode: "all" } | { readonly mode: "membership"; readonly membershipId: string },
): Promise<boolean> => {
  const response = await fetch(stickyUrl(projectId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  }).catch(() => null);
  return response !== null && response.ok;
};

export const deleteComposerRecipientSticky = async (
  projectId: string,
): Promise<boolean> => {
  const response = await fetch(stickyUrl(projectId), {
    method: "DELETE",
    cache: "no-store",
  }).catch(() => null);
  return response !== null && response.ok;
};
