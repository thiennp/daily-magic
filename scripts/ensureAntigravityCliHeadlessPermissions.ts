import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";
import { mergeAntigravityCliHeadlessPermissions } from "./mergeAntigravityCliHeadlessPermissions";

/** Merge agy headless allow rules before spawning Antigravity in pipe/headless mode. */
export const ensureAntigravityCliHeadlessPermissionsBeforeRun = (
  writerAgent: HarnessWriterAgentId,
): void => {
  if (writerAgent !== "antigravity") {
    return;
  }

  mergeAntigravityCliHeadlessPermissions();
};
