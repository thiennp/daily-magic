import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliIo } from "./cliFs.types";
import { buildCheckContextGlobalInstructionLines } from "./agentWitchCheckContextInstruction.constant";
import { buildKnowledgeReportGlobalInstructionLines } from "./agentWitchKnowledgeReportInstruction.constant";
import {
  CODEX_GLOBAL_AGENTS_RELATIVE,
  KNOWLEDGE_MARKER_BEGIN,
  KNOWLEDGE_MARKER_END,
  MARKER_BEGIN,
  MARKER_END,
} from "./tokenSaverMarkers.constants";
import { upsertMarkedInstructionInFile } from "./upsertMarkedInstructionInFile";

/** Upsert check_context + knowledge blocks in `~/.codex/AGENTS.md`. */
export const writeCodexGlobalAgents = (input: {
  readonly io: CliIo;
}): CliWriteResult => {
  const filePath = path.join(input.io.homedir(), CODEX_GLOBAL_AGENTS_RELATIVE);
  const check = upsertMarkedInstructionInFile({
    fs: input.io,
    filePath,
    blockBody: buildCheckContextGlobalInstructionLines().join("\n"),
    begin: MARKER_BEGIN,
    end: MARKER_END,
  });
  const knowledge = upsertMarkedInstructionInFile({
    fs: input.io,
    filePath,
    blockBody: buildKnowledgeReportGlobalInstructionLines().join("\n"),
    begin: KNOWLEDGE_MARKER_BEGIN,
    end: KNOWLEDGE_MARKER_END,
  });
  return {
    ok: true,
    path: filePath,
    wrote: check.wrote || knowledge.wrote,
    ...(check.backupPath !== undefined ? { backupPath: check.backupPath } : {}),
  };
};
