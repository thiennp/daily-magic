import type { ComposerBlockedAction } from "@/features/agent/utils/composerBlockedAction.types";

export const withComposerCopyFlag = (
  action: Omit<ComposerBlockedAction, "showCopy"> & {
    readonly showCopy?: boolean;
  },
  canCopyPrompt: boolean,
): ComposerBlockedAction => ({
  ...action,
  showCopy: action.showCopy ?? canCopyPrompt,
});
