import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { buildTaskIntakeHookContext } from "./buildTaskIntakeHookContext";
import { suggestEffortTier, type EffortSuggestion } from "./suggestEffortTier";
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
  /** Injected in tests; defaults to local Ollama with a title heuristic fallback. */
  readonly suggest?: (input: {
    title: string;
    hasSkill: boolean;
  }) => Promise<EffortSuggestion>;
}

const MAX_ANSWER_CHARS = 200;
const USAGE =
  "usage: agent-witch task-intake remember --answer <reply>|forget|status [--prompt <request>]|suggest --title <t> [--has-skill] [--cwd <dir>]\n";

const readFlag = (
  argv: readonly string[],
  flag: string,
): string | undefined => {
  const index = argv.indexOf(flag);
  const value = index >= 0 ? argv[index + 1] : undefined;
  return value !== undefined && value.trim().length > 0 ? value : undefined;
};

/**
 * `agent-witch task-intake <remember|forget|status|suggest>`.
 * remember saves the always-yes choice outside the repo, only for a project
 * valid for that folder and only with the user's own reply (--answer).
 * status prints what to do for a request (for agents without the Claude hook).
 * suggest prints the cheapest effort tier for a subtask. Returns the exit code.
 */
export const runTaskIntakeCli = async (
  argv: readonly string[],
  deps: TaskIntakeCliDeps,
): Promise<0 | 1> => {
  const action = argv[0];
  const cwd = readFlag(argv, "--cwd") ?? deps.defaultCwd;
  if (action === "suggest") {
    const title = readFlag(argv, "--title");
    if (title === undefined) {
      deps.writeStderr(USAGE);
      return 1;
    }
    const suggest = deps.suggest ?? suggestEffortTier;
    const result = await suggest({
      title,
      hasSkill: argv.includes("--has-skill"),
    });
    deps.writeStdout(`${JSON.stringify(result)}\n`);
    return 0;
  }
  if (action !== "remember" && action !== "forget" && action !== "status") {
    deps.writeStderr(USAGE);
    return 1;
  }
  const projectId = deps.resolveProjectId(cwd);
  if (projectId === null) {
    if (action !== "status") {
      deps.writeStderr(
        "task-intake: this folder is not an AgentWitch project.\n",
      );
    }
    return action === "status" ? 0 : 1;
  }
  if (action === "status") {
    const prompt = readFlag(argv, "--prompt");
    const context = buildTaskIntakeHookContext({
      layout: deps.layout,
      projectId,
      cwd,
      prompt,
      assumeRequest: prompt === undefined,
      readClaims: deps.readClaims,
    });
    if (context !== null) deps.writeStdout(`${context}\n`);
    return 0;
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
  const answer = readFlag(argv, "--answer")?.trim();
  if (answer === undefined || answer.length > MAX_ANSWER_CHARS) {
    deps.writeStderr(
      'task-intake: remember needs the user\'s own reply: --answer "<their exact words>" (max 200 chars).\n',
    );
    return 1;
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
    answer,
  });
  deps.writeStdout(
    "task-intake: saved. Tasks will be created without asking in this project.\n",
  );
  return 0;
};
