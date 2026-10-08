import type { OneWindowApprovalCardModel } from "@/features/projects/messenger/oneWindow/AwcOneWindowApprovalCard";

/** Composer text for "Ask {name} again": an @mention the owner finishes. */
export const askAgainDraftText = (name: string): string => `@${name} `;

/** Card callback → hands the card's assistant name to `onAskAgain` (undefined when unwired). */
export const buildAskAgainHandler = (
  model: OneWindowApprovalCardModel,
  onAskAgain: ((name: string) => void) | undefined,
): ((id: string) => void) | undefined => {
  const name = model.whoName?.trim();
  return onAskAgain === undefined || !name ? undefined : () => onAskAgain(name);
};
