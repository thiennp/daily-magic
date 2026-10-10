import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import { recordKnowledgeHookRun } from "@agent-witch/live-knowledge";
import { resolveAgentWitchProjectIdFromCwd } from "@agent-witch/live-projects";

import type {
  CheckContextInput,
  CheckContextResult,
} from "../../public-api/types";
import { checkContext } from "./checkContext";
import { createPitfallRegistry } from "./createPitfallRegistry";
import { isDeclinedCwd } from "./declinedProjectsStore";
import { parseCheckContextArgs } from "./parseCheckContextArgs";

export interface CheckContextRunnerDeps {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly isDeclined?: (cwd: string) => boolean;
  readonly logError?: (error: unknown) => void;
}

/**
 * Build a check_context runner that opens the profile registry per call
 * and always closes it (DB errors → none + log).
 * Default isDeclined reads the D2 decline store.
 */
export const createCheckContextRunner = (
  deps: CheckContextRunnerDeps,
): ((raw: unknown) => CheckContextResult) => {
  const logError =
    deps.logError ??
    ((error: unknown): void => {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[agent-witch] check_context: ${message}`);
    });
  const isDeclined =
    deps.isDeclined ??
    ((cwd: string): boolean => isDeclinedCwd({ layout: deps.layout, cwd }));

  return (raw: unknown): CheckContextResult => {
    const input: CheckContextInput = parseCheckContextArgs(raw);
    let registry: ReturnType<typeof createPitfallRegistry> | null = null;
    try {
      registry = createPitfallRegistry({ layout: deps.layout });
      const result = checkContext(
        {
          registry,
          resolveProjectId: resolveAgentWitchProjectIdFromCwd,
          isDeclined,
          logError,
        },
        input,
      );
      const notes =
        result.projectId !== undefined
          ? recordKnowledgeHookRun({
              layout: deps.layout,
              projectKey: result.projectId,
              message: input.message ?? "",
              ...(input.cwd !== undefined
                ? { projectFolderPath: input.cwd }
                : {}),
              ...(input.sessionId !== undefined
                ? { sessionId: input.sessionId }
                : {}),
            })
          : "";
      return notes.length > 0 ? { ...result, notes } : result;
    } catch (error) {
      logError(error);
      return { status: "none" };
    } finally {
      registry?.close();
    }
  };
};
