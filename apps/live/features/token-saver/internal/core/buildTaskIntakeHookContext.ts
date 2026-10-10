import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { CliFs } from "./cliFs.types";
import {
  buildTaskIntakeAskText,
  buildTaskIntakeAutoText,
  TASK_INTAKE_MIN_REQUEST_CHARS,
  TASK_INTAKE_MIN_REQUEST_WORDS,
} from "./taskIntakeHookText.constant";
import {
  findValidFolderClaim,
  isTaskIntakePrefValid,
  pruneInvalidTaskIntakePrefs,
  readTaskIntakePrefs,
  type TaskIntakeFolderClaim,
} from "./taskIntakePrefsStore";

/** Only a message of reasonable length can be a request ("ok", "thanks", "yes" are not). */
export const isTaskIntakeCandidatePrompt = (
  prompt: string | undefined,
): boolean => {
  const text = prompt?.trim() ?? "";
  return (
    text.length >= TASK_INTAKE_MIN_REQUEST_CHARS &&
    text.split(/\s+/).length >= TASK_INTAKE_MIN_REQUEST_WORDS
  );
};

/**
 * Hook context for the task-intake prompt. Null when the project is not valid
 * for this folder (no claim), so a stale remembered choice never fires.
 */
export const buildTaskIntakeHookContext = (input: {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly projectId: string | undefined;
  readonly cwd: string | undefined;
  readonly prompt?: string | undefined;
  readonly readClaims: () => readonly TaskIntakeFolderClaim[];
  readonly fs?: CliFs;
}): string | null => {
  if (
    input.projectId === undefined ||
    input.cwd === undefined ||
    !isTaskIntakeCandidatePrompt(input.prompt)
  ) {
    return null;
  }
  const claims = input.readClaims();
  pruneInvalidTaskIntakePrefs({
    layout: input.layout,
    claims,
    ...(input.fs !== undefined ? { fs: input.fs } : {}),
  });
  const claim = findValidFolderClaim({
    claims,
    projectId: input.projectId,
    profileEmail: input.layout.profileEmail,
    cwd: input.cwd,
    ...(input.fs !== undefined ? { fs: input.fs } : {}),
  });
  if (claim === null) {
    return null;
  }
  const pref = readTaskIntakePrefs(input.layout, input.fs).byProjectId[
    input.projectId
  ];
  return isTaskIntakePrefValid({ pref, claim })
    ? buildTaskIntakeAutoText(input.cwd)
    : buildTaskIntakeAskText(input.cwd);
};
