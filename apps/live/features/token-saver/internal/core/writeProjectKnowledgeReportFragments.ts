import path from "node:path";

import type { CliWriteResult } from "../../public-api/setupProject.types";
import type { CliFs } from "./cliFs.types";
import { buildKnowledgeReportProjectInstructionLines } from "./agentWitchKnowledgeReportInstruction.constant";
import {
  KNOWLEDGE_MARKER_BEGIN,
  KNOWLEDGE_MARKER_END,
  PROJECT_REPO_AGENTS_MD,
  PROJECT_REPO_CLAUDE_MD,
} from "./tokenSaverMarkers.constants";
import { upsertMarkedInstructionInFile } from "./upsertMarkedInstructionInFile";

export interface WriteProjectKnowledgeReportFragmentsResult {
  readonly ok: true;
  readonly repoAgentsMd: CliWriteResult;
  readonly repoClaudeMd: CliWriteResult;
}

/** Repo-root AGENTS.md + CLAUDE.md for Codex, Claude, and other agents (not Cursor-only). */
export const writeProjectKnowledgeReportFragments = (input: {
  readonly fs: CliFs;
  readonly projectRoot: string;
  readonly projectId: string;
}): WriteProjectKnowledgeReportFragmentsResult => {
  const body = buildKnowledgeReportProjectInstructionLines(
    input.projectId,
  ).join("\n");
  const repoAgentsMd = upsertMarkedInstructionInFile({
    fs: input.fs,
    filePath: path.join(input.projectRoot, PROJECT_REPO_AGENTS_MD),
    blockBody: body,
    begin: KNOWLEDGE_MARKER_BEGIN,
    end: KNOWLEDGE_MARKER_END,
  });
  const repoClaudeMd = upsertMarkedInstructionInFile({
    fs: input.fs,
    filePath: path.join(input.projectRoot, PROJECT_REPO_CLAUDE_MD),
    blockBody: body,
    begin: KNOWLEDGE_MARKER_BEGIN,
    end: KNOWLEDGE_MARKER_END,
  });
  return { ok: true, repoAgentsMd, repoClaudeMd };
};
