import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { openSkillIndexDb } from "./createDefaultSkillToolDeps";
import { settleSkillCallsForRun } from "./settleSkillCalls";

const CHARS_PER_TOKEN = 4;

/**
 * Run-finished hook. `reportedTokens` is the writer's usage when it reported
 * one; otherwise the figure is estimated from prompt + output length and the
 * savings stay flagged as estimates. Never throws.
 */
export const settleRunSkillCalls = (
  layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">,
  input: {
    readonly runId: string;
    readonly reportedTokens: number | null;
    readonly prompt: string;
    readonly output: string;
  },
): void => {
  try {
    const db = openSkillIndexDb(layout);
    if (db === null) {
      return;
    }
    const estimate = input.reportedTokens === null;
    settleSkillCallsForRun(db, {
      runId: input.runId,
      tokens:
        input.reportedTokens ??
        Math.ceil(
          (input.prompt.length + input.output.length) / CHARS_PER_TOKEN,
        ),
      estimate,
    });
  } catch {
    // savings accounting must never break a run
  }
};
