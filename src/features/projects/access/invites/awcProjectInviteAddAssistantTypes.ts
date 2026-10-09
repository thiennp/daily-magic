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
  /** Checkbox: the assistant may not message other people's assistants. */
  readonly isolateBots?: boolean;
};

/** Picker choices: every types[] entry, in types[] order, with its exact label. */
export const AWC_PROJECT_INVITE_TYPE_OPTIONS: readonly AwcProjectInviteTypeOption[] =
  PROJECT_INVITE_JOIN_TYPES.map((type) => ({ id: type.id, label: type.label }));

/** Single source: each stored invite platform (server allowlist grok | muse) and its types[] id. Both lookups below derive from it. */
const INVITE_PLATFORM_JOIN_TYPES: readonly {
  readonly platform: ProjectInvitePlatform;
  readonly joinTypeId: string;
}[] = [
  { platform: "grok", joinTypeId: "grok-bot" },
  { platform: "muse", joinTypeId: "muse" },
];

export const toAwcProjectInviteAddSelection = (
  joinTypeId: string | null,
  isolateBots = false,
): AwcProjectInviteAddSelection => {
  const known = AWC_PROJECT_INVITE_TYPE_OPTIONS.some(
    (o) => o.id === joinTypeId,
  );
  const id = known ? joinTypeId : null;
  return {
    platform:
      INVITE_PLATFORM_JOIN_TYPES.find((p) => p.joinTypeId === id)?.platform ??
      null,
    joinTypeId: id,
    ...(isolateBots ? { isolateBots: true } : {}),
  };
};

/** Default types[] id for a create call that only names a platform. */
export const joinTypeIdForInvitePlatform = (
  platform: ProjectInvitePlatform | null,
): string | null =>
  INVITE_PLATFORM_JOIN_TYPES.find((p) => p.platform === platform)?.joinTypeId ??
  null;

export const awcProjectInviteTypeLabel = (
  joinTypeId: string | null,
): string | null =>
  AWC_PROJECT_INVITE_TYPE_OPTIONS.find((o) => o.id === joinTypeId)?.label ??
  null;
