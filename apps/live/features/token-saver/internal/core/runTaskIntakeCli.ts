import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  findValidFolderClaim,
  forgetTaskIntake,
  rememberTaskIntakeYes,
  type TaskIntakeFolderClaim,
} from "./taskIntakePrefsStore";

export interface TaskIntakeCliDeps {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly resolveProjectId: (cwd: string) => string | null;
  readonly readClaims: () => readonly TaskIntakeFolderClaim[];
  readonly writeStdout: (text: string) => void;
  readonly writeStderr: (text: string) => void;
  readonly defaultCwd: string;
}

const readFlag = (
  argv: readonly string[],
  flag: string,
): string | undefined => {
  const index = argv.indexOf(flag);
  const value = index >= 0 ? argv[index + 1] : undefined;
  return value !== undefined && value.trim().length > 0 ? value : undefined;
};

/**
 * `agent-witch task-intake remember|forget [--cwd <dir>]`. Saves the choice
 * outside the repo, and only for a project that is valid for that folder.
 * Returns the process exit code.
 */
export const runTaskIntakeCli = (
  argv: readonly string[],
  deps: TaskIntakeCliDeps,
): 0 | 1 => {
  const action = argv[0];
  const cwd = readFlag(argv, "--cwd") ?? deps.defaultCwd;
  if (action !== "remember" && action !== "forget") {
    deps.writeStderr(
      "usage: agent-witch task-intake remember|forget [--cwd <dir>]\n",
    );
    return 1;
  }
  const projectId = deps.resolveProjectId(cwd);
  if (projectId === null) {
    deps.writeStderr(
      "task-intake: this folder is not an AgentWitch project.\n",
    );
    return 1;
  }
  if (action === "forget") {
    const removed = forgetTaskIntake({ layout: deps.layout, projectId });
    deps.writeStdout(
      removed
        ? "task-intake: forgot the saved choice.\n"
        : "task-intake: nothing was saved.\n",
    );
    return 0;
  }
  const claim = findValidFolderClaim({
    claims: deps.readClaims(),
    projectId,
    profileEmail: deps.layout.profileEmail,
    cwd,
  });
  if (claim === null) {
    deps.writeStderr(
      "task-intake: this project is not valid for this folder on this computer.\n",
    );
    return 1;
  }
  rememberTaskIntakeYes({
    layout: deps.layout,
    projectId,
    folderRealPath: claim.folderRealPath,
  });
  deps.writeStdout(
    "task-intake: saved. Tasks will be created without asking in this project.\n",
  );
  return 0;
};
