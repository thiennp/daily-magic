import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { createNodeCliIo } from "./createNodeCliFs";
import { writeClaudeGlobalClaudeMd } from "./writeClaudeGlobalClaudeMd";
import { writeClaudeGlobalHook } from "./writeClaudeGlobalHook";
import { writeCodexGlobalAgents } from "./writeCodexGlobalAgents";
import { writeCodexGlobalConfig } from "./writeCodexGlobalConfig";
import { writeCursorGlobalKnowledgeRule } from "./writeCursorGlobalKnowledgeRule";
import { writeCursorGlobalTaskIntakeRule } from "./writeCursorGlobalTaskIntakeRule";
import { writeCursorGlobalMcp } from "./writeCursorGlobalMcp";

export interface WriteGlobalTriggersResult {
  readonly ok: true;
  readonly cursorMcp: CliWriteResult;
  readonly cursorKnowledgeRule: CliWriteResult;
  readonly cursorTaskIntakeRule: CliWriteResult;
  readonly codexConfig: CliWriteResult;
  readonly codexAgents: CliWriteResult;
  readonly claudeClaudeMd: CliWriteResult;
  readonly claudeHook: CliWriteResult;
}

/**
 * Install-time GlobalTriggersWritten writers (Lead v1 lock).
 * TODO: Cursor sessionStart hook — UNVERIFIED, do not implement.
 * TODO: Codex project-scoped MCP — UNVERIFIED, do not implement.
 */
export const writeGlobalTriggers = (input?: {
  readonly io?: CliIo;
}): WriteGlobalTriggersResult => {
  const io = input?.io ?? createNodeCliIo();
  return {
    ok: true,
    cursorMcp: writeCursorGlobalMcp({ io }),
    cursorKnowledgeRule: writeCursorGlobalKnowledgeRule({ io }),
    cursorTaskIntakeRule: writeCursorGlobalTaskIntakeRule({ io }),
    codexConfig: writeCodexGlobalConfig({ io }),
    codexAgents: writeCodexGlobalAgents({ io }),
    claudeClaudeMd: writeClaudeGlobalClaudeMd({ io }),
    claudeHook: writeClaudeGlobalHook({ io }),
  };
};
