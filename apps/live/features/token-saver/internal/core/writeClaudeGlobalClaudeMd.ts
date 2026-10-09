import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { buildKnowledgeReportGlobalInstructionLines } from "./agentWitchKnowledgeReportInstruction.constant";
import {
  CLAUDE_GLOBAL_CLAUDE_MD_RELATIVE,
  KNOWLEDGE_MARKER_BEGIN,
  KNOWLEDGE_MARKER_END,
} from "./tokenSaverMarkers.constants";
import { upsertMarkedInstructionInFile } from "./upsertMarkedInstructionInFile";

/** Upsert knowledge-report instructions in `~/.claude/CLAUDE.md` (Claude Code global). */
export const writeClaudeGlobalClaudeMd = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(
    input.io.homedir(),
    CLAUDE_GLOBAL_CLAUDE_MD_RELATIVE,
  );
  return upsertMarkedInstructionInFile({
    fs: input.io,
    filePath,
    blockBody: buildKnowledgeReportGlobalInstructionLines().join("\n"),
    begin: KNOWLEDGE_MARKER_BEGIN,
    end: KNOWLEDGE_MARKER_END,
  });
};
