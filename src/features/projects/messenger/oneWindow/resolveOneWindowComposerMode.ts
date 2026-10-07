import type { MessengerKeptRecipient } from "@/features/projects/messenger/types/messengerChatStore.type";

/** COMPOSER-LOCK visible modes (PICKING is transient UI overlay). */
export type OneWindowComposerMode = "EVERYONE" | "KEPT" | "SINGLE";

export type OneWindowComposerModeInput = {
  readonly assistantCount: number;
  readonly kept: MessengerKeptRecipient | null;
  /** Transient: picker open. */
  readonly picking: boolean;
};

export type OneWindowComposerModeResult = {
  readonly mode: OneWindowComposerMode;
  readonly picking: boolean;
  readonly hideAllRoutingUi: boolean;
};

/**
 * Resolve chrome mode from assistant count + kept sticky.
 * PICKING is overlay on EVERYONE (picker open); SINGLE hides all routing.
 */
export const resolveOneWindowComposerMode = (
  input: OneWindowComposerModeInput,
): OneWindowComposerModeResult => {
  if (input.assistantCount === 1) {
    return { mode: "SINGLE", picking: false, hideAllRoutingUi: true };
  }
  if (input.kept !== null) {
    return { mode: "KEPT", picking: false, hideAllRoutingUi: false };
  }
  return {
    mode: "EVERYONE",
    picking: input.picking,
    hideAllRoutingUi: false,
  };
};
