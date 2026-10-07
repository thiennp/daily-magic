import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";
import type { ComposerRecipientStickySnapshot } from "@/lib/projects/acl/composer/decideComposerRecipientRouting.types";

/** Server sticky row → messenger IDB kept shape. */
export const stickySnapshotToKept = (
  sticky: ComposerRecipientStickySnapshot | null,
): MessengerKeptRecipient | null => {
  if (sticky === null) return null;
  if (sticky.mode === "all") return { kind: "everyone" };
  if (
    sticky.mode === "membership" &&
    typeof sticky.membershipId === "string" &&
    sticky.membershipId.length > 0
  ) {
    return { kind: "assistants", membershipIds: [sticky.membershipId] };
  }
  return null;
};

/** Kept → PUT body for recipient-sticky API. */
export const keptToStickyPutBody = (
  kept: MessengerKeptRecipient,
): { readonly mode: "all" } | { readonly mode: "membership"; readonly membershipId: string } => {
  if (kept.kind === "everyone") return { mode: "all" };
  const id = kept.membershipIds[0];
  return { mode: "membership", membershipId: id };
};

/** Kept → FSA sticky snapshot (chip checked). */
export const keptToStickySnapshot = (
  kept: MessengerKeptRecipient | null,
): ComposerRecipientStickySnapshot | null => {
  if (kept === null) return null;
  if (kept.kind === "everyone") {
    return { mode: "all", membershipId: null };
  }
  const id = kept.membershipIds[0];
  if (typeof id !== "string" || id.length === 0) return null;
  return { mode: "membership", membershipId: id };
};
