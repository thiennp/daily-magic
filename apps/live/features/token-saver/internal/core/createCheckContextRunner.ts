import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type {
  CheckContextInput,
  CheckContextResult,
} from "../../public-api/types";
import { checkContext } from "./checkContext";
import { createPitfallRegistry } from "./createPitfallRegistry";
import { parseCheckContextArgs } from "./parseCheckContextArgs";
import { resolveProjectIdFromCwd } from "./resolveProjectIdFromCwd";

export interface CheckContextRunnerDeps {
  readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  readonly isDeclined?: (cwd: string) => boolean;
  readonly logError?: (error: unknown) => void;
}

/**
 * Build a check_context runner that opens the profile registry per call
 * and always closes it (DB errors → none + log).
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

  return (raw: unknown): CheckContextResult => {
    const input: CheckContextInput = parseCheckContextArgs(raw);
    let registry: ReturnType<typeof createPitfallRegistry> | null = null;
    try {
      registry = createPitfallRegistry({ layout: deps.layout });
      return checkContext(
        {
          registry,
          resolveProjectId: resolveProjectIdFromCwd,
          isDeclined: deps.isDeclined,
          logError,
        },
        input,
      );
    } catch (error) {
      logError(error);
      return { status: "none" };
    } finally {
      registry?.close();
    }
  };
};
