import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";

/** One picker choice: a types[] id and its exact label. */
export type AwcProjectInviteTypeOption = {
  readonly id: string;
  readonly label: string;
};

/** What "Add assistant" creates. joinTypeId null = any assistant (no type picked). */
export type AwcProjectInviteAddSelection = {
  readonly platform: ProjectInvitePlatform | null;
  readonly joinTypeId: string | null;
};

/** Picker choices: every types[] entry, in types[] order, with its exact label. */
export const AWC_PROJECT_INVITE_TYPE_OPTIONS: readonly AwcProjectInviteTypeOption[] =
  PROJECT_INVITE_JOIN_TYPES.map((type) => ({ id: type.id, label: type.label }));

/** Types[] ids the invite create call stores as its platform (server allowlist grok | muse). */
const JOIN_TYPE_TO_INVITE_PLATFORM: Readonly<
  Record<string, ProjectInvitePlatform>
> = {
  "grok-bot": "grok",
  muse: "muse",
};

export const toAwcProjectInviteAddSelection = (
  joinTypeId: string | null,
): AwcProjectInviteAddSelection => {
  const known = AWC_PROJECT_INVITE_TYPE_OPTIONS.some(
    (o) => o.id === joinTypeId,
  );
  const id = known ? joinTypeId : null;
  return {
    platform: id === null ? null : (JOIN_TYPE_TO_INVITE_PLATFORM[id] ?? null),
    joinTypeId: id,
  };
};

/** Default types[] id for a create call that only names a platform. */
export const joinTypeIdForInvitePlatform = (
  platform: ProjectInvitePlatform | null,
): string | null =>
  platform === "grok" ? "grok-bot" : platform === "muse" ? "muse" : null;

export const awcProjectInviteTypeLabel = (
  joinTypeId: string | null,
): string | null =>
  AWC_PROJECT_INVITE_TYPE_OPTIONS.find((o) => o.id === joinTypeId)?.label ??
  null;
