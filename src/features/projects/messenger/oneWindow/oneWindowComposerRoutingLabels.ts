import {
  formatChipLabel,
  formatPlaceholderKept,
  formatPlaceholderSingle,
} from "@/features/projects/messenger/oneWindow/formatOneWindowComposerCopy";
import { ONE_WINDOW_COMPOSER_COPY } from "@/features/projects/messenger/oneWindow/oneWindowComposerCopy.constant";
import type { OneWindowComposerMode } from "@/features/projects/messenger/oneWindow/resolveOneWindowComposerMode";
import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

/** Composer placeholder for the routing mode (SINGLE / KEPT / everyone). */
export const formatOneWindowRoutingPlaceholder = (input: {
  readonly mode: OneWindowComposerMode;
  readonly kept: MessengerKeptRecipient | null;
  readonly singleName: string | null;
  readonly firstAssistantName: string | undefined;
  readonly nameById: ReadonlyMap<string, string>;
}): string => {
  const { mode, kept, nameById } = input;
  if (mode === "SINGLE") {
    return formatPlaceholderSingle(
      input.singleName ?? input.firstAssistantName ?? "assistant",
    );
  }
  if (mode === "KEPT" && kept !== null) {
    if (kept.kind !== "assistant")
      return ONE_WINDOW_COMPOSER_COPY.placeholderEveryone;
    const name = nameById.get(kept.membershipId) ?? "assistant";
    return formatPlaceholderKept(name);
  }
  return ONE_WINDOW_COMPOSER_COPY.placeholderEveryone;
};

/** Kept-recipient chip label; null when nothing is kept. */
export const formatOneWindowRoutingChipLabel = (
  kept: MessengerKeptRecipient | null,
  nameById: ReadonlyMap<string, string>,
): string | null => {
  if (kept === null || kept.kind !== "assistant") return null;
  const name = nameById.get(kept.membershipId) ?? "assistant";
  return formatChipLabel(name);
};
