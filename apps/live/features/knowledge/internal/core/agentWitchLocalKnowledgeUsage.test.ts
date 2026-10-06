import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_PROJECT_META_FILE_NAME } from "../../../projects/internal/core/agentWitchProjectStorage.constants";
import {
  AGENT_WITCH_ERROR_TOOL_SUGGESTION_THRESHOLD,
  AGENT_WITCH_RAG_TOOL_SUGGESTION_RETRIEVAL_THRESHOLD,
} from "../../../projects/internal/core/knowledge/agentWitchProfileKnowledge.constants";
import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import {
  computeAgentWitchKnowledgeSuggestions,
  fingerprintAgentWitchErrorText,
  getAgentWitchChunkRetrievalCount,
  readAgentWitchKnowledgeUsageStats,
  recordAgentWitchChunkRetrievals,
  recordAgentWitchErrorOccurrence,
} from "./agentWitchLocalKnowledgeUsage";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const buildLayout = (installDir: string): AgentWitchLocalLayout => ({
  installDir,
  appDir: path.join(installDir, "app"),
  appBundlePath: path.join(installDir, "app", "agent-witch.js"),
  profileEmail: null,
  configPath: path.join(installDir, "config.json"),
  harnessRootDir: path.join(installDir, "harness"),
  harnessManifestPath: path.join(installDir, "harness", "manifest.json"),
  harnessSetsDir: path.join(installDir, "harness", "sets"),
  projectsDir: path.join(installDir, "projects"),
  logsDir: path.join(installDir, "logs"),
  reportsDir: path.join(installDir, "reports"),
  deviceKeypairPath: path.join(installDir, "device-keypair.json"),
  mainLogPath: path.join(installDir, "logs", "agent-witch.log"),
  errorLogPath: path.join(installDir, "logs", "agent-witch.error.log"),
});

const seedProjectFolder = (installDir: string, projectId: string): string => {
  const folder = path.join(installDir, "repo");
  fs.mkdirSync(path.join(folder, ".agent-witch"), { recursive: true });
  fs.writeFileSync(
    path.join(folder, ".agent-witch", AGENT_WITCH_PROJECT_META_FILE_NAME),
    `${JSON.stringify({ projectId })}\n`,
  );
  return folder;
};

describe("agentWitchLocalKnowledgeUsage", () => {
  it("tracks chunk retrieval counts and suggests tools after threshold", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-usage-"));
    tempDirs.push(installDir);
    const layout = buildLayout(installDir);
    const projectId = "proj-usage";
    const projectFolderPath = seedProjectFolder(installDir, projectId);
    const chunkId = "chunk-hot";

    for (
      let index = 0;
      index < AGENT_WITCH_RAG_TOOL_SUGGESTION_RETRIEVAL_THRESHOLD;
      index += 1
    ) {
      recordAgentWitchChunkRetrievals({
        layout,
        projectFolderPath,
        projectId,
        chunkIds: [chunkId],
      });
    }

    const stats = readAgentWitchKnowledgeUsageStats({
      layout,
      projectFolderPath,
      projectId,
    });

    expect(getAgentWitchChunkRetrievalCount(stats, chunkId)).toBe(
      AGENT_WITCH_RAG_TOOL_SUGGESTION_RETRIEVAL_THRESHOLD,
    );

    const suggestions = computeAgentWitchKnowledgeSuggestions(stats);
    expect(
      suggestions.some((entry) => entry.kind === "frequent_rag_without_tool"),
    ).toBe(true);
  });

  it("tracks recurring errors and emits tool then rule suggestions", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-err-"));
    tempDirs.push(installDir);
    const layout = buildLayout(installDir);
    const projectId = "proj-err";
    const projectFolderPath = seedProjectFolder(installDir, projectId);
    const message = "Module not found: missing-package";

    for (
      let index = 0;
      index < AGENT_WITCH_ERROR_TOOL_SUGGESTION_THRESHOLD;
      index += 1
    ) {
      recordAgentWitchErrorOccurrence({
        layout,
        projectFolderPath,
        projectId,
        errorText: message,
      });
    }

    const fingerprint = fingerprintAgentWitchErrorText(message);
    const stats = readAgentWitchKnowledgeUsageStats({
      layout,
      projectFolderPath,
      projectId,
    });

    expect(stats?.errorOccurrences[fingerprint]?.count).toBe(
      AGENT_WITCH_ERROR_TOOL_SUGGESTION_THRESHOLD,
    );

    const suggestions = computeAgentWitchKnowledgeSuggestions(stats);
    expect(
      suggestions.some((entry) => entry.kind === "recurring_error_tool"),
    ).toBe(true);
    expect(
      suggestions.some((entry) => entry.kind === "recurring_error_rule"),
    ).toBe(true);
  });
});
