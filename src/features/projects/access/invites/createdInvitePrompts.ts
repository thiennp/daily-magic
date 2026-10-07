import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

/**
 * Copy-prompt source for an invite this owner tab created (from the POST
 * create response). Used first so Copy needs no round trip; other devices /
 * tabs fetch the prompt from the owner-only reveal endpoint (107).
 */
export type CreatedInvitePrompt = {
  readonly inviteId: string;
  readonly url: string;
  readonly token: string | null;
  readonly platform: ProjectInvitePlatform | null;
  readonly joinTypeId: string | null;
  /** Client clock at create; guards against stale in-flight snapshots. */
  readonly createdAtMs: number;
};

export type CreatedInvitePrompts = Readonly<
  Record<string, CreatedInvitePrompt>
>;

/**
 * A snapshot fetched before (or racing) the create can miss the new invite.
 * Keep a just-created invite this long even when the list does not show it yet.
 */
export const CREATED_INVITE_PROMPT_GRACE_MS = 30_000;

const STORAGE_PREFIX = "awc.inviteCopyPrompts.";

/** True while the invite is listed as usable, or was created moments ago. */
export const isCreatedInviteStillUsable = (input: {
  readonly inviteId: string;
  readonly createdAtMs: number | null;
  readonly invites: readonly { readonly inviteId: string }[];
  readonly nowMs: number;
}): boolean =>
  input.invites.some((invite) => invite.inviteId === input.inviteId) ||
  (input.createdAtMs !== null &&
    input.nowMs - input.createdAtMs < CREATED_INVITE_PROMPT_GRACE_MS);

/** Drop prompts for invites that are no longer usable (used, expired, revoked). */
export const pruneCreatedInvitePrompts = (input: {
  readonly prompts: CreatedInvitePrompts;
  readonly invites: readonly { readonly inviteId: string }[];
  readonly nowMs: number;
}): CreatedInvitePrompts =>
  Object.fromEntries(
    Object.values(input.prompts)
      .filter((prompt) =>
        isCreatedInviteStillUsable({
          inviteId: prompt.inviteId,
          createdAtMs: prompt.createdAtMs,
          invites: input.invites,
          nowMs: input.nowMs,
        }),
      )
      .map((prompt) => [prompt.inviteId, prompt]),
  );

const isPrompt = (value: unknown): value is CreatedInvitePrompt => {
  if (value === null || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.inviteId === "string" &&
    v.inviteId.length > 0 &&
    typeof v.url === "string" &&
    v.url.length > 0 &&
    (v.token === null || typeof v.token === "string") &&
    typeof v.createdAtMs === "number"
  );
};

const sessionStore = (): Storage | null => {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
};

/** Owner tab only (sessionStorage): survives reload, never leaves the browser. */
export const readCreatedInvitePrompts = (
  projectId: string,
): CreatedInvitePrompts => {
  const store = sessionStore();
  if (store === null) return {};
  try {
    const parsed: unknown = JSON.parse(
      store.getItem(STORAGE_PREFIX + projectId) ?? "[]",
    );
    if (!Array.isArray(parsed)) return {};
    return Object.fromEntries(
      parsed.filter(isPrompt).map((prompt) => [
        prompt.inviteId,
        {
          ...prompt,
          platform: prompt.platform ?? null,
          joinTypeId: prompt.joinTypeId ?? null,
        },
      ]),
    );
  } catch {
    return {};
  }
};

export const writeCreatedInvitePrompts = (
  projectId: string,
  prompts: CreatedInvitePrompts,
): void => {
  const store = sessionStore();
  if (store === null) return;
  try {
    const list = Object.values(prompts);
    if (list.length === 0) {
      store.removeItem(STORAGE_PREFIX + projectId);
      return;
    }
    store.setItem(STORAGE_PREFIX + projectId, JSON.stringify(list));
  } catch {
    // Storage full / blocked: in-memory prompts still work for this render tree.
  }
};
