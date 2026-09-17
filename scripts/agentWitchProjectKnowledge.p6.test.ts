import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import migrateLegacyRepoKnowledgeToProfile from "../apps/live/features/projects/internal/core/knowledge/migrateLegacyRepoKnowledgeToProfile";
import redactTextForProjectKnowledge from "../apps/live/features/projects/internal/core/knowledge/redactTextForProjectKnowledge";
import resolveAgentWitchProjectKnowledgePaths from "../apps/live/features/projects/internal/core/knowledge/resolveAgentWitchProjectKnowledgePaths";
import resolveProfileProjectKnowledgeLayout from "../apps/live/features/projects/internal/core/knowledge/resolveProfileProjectKnowledgeLayout";
import shouldCaptureRunOutputForProjectKnowledge from "../apps/live/features/projects/internal/core/knowledge/shouldCaptureRunOutputForProjectKnowledge";
import trimRagChunksToCeiling from "../apps/live/features/projects/internal/core/knowledge/trimRagChunksToCeiling";
import { AGENT_WITCH_PROJECT_META_FILE_NAME } from "../apps/live/features/projects/internal/core/agentWitchProjectStorage.constants";
import { resolveAgentWitchProjectStorageLayout } from "../apps/live/features/projects/internal/core/resolveAgentWitchProjectStorageLayout";
import { readAgentWitchRagChunks } from "../apps/live/features/knowledge/internal/core/agentWitchLocalRag";

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

describe("P6 project knowledge", () => {
  it("does not use install-wide RAG when no project folder is set", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-p6-rag-"));
    tempDirs.push(installDir);
    const layout = buildLayout(installDir);
    const legacyGlobal = path.join(installDir, "rag", "chunks.ndjson");
    fs.mkdirSync(path.dirname(legacyGlobal), { recursive: true });
    fs.writeFileSync(
      legacyGlobal,
      `${JSON.stringify({ id: "1", text: "x", embedding: [1], createdAt: "t" })}\n`,
    );

    expect(readAgentWitchRagChunks(layout)).toEqual([]);
  });

  it("skips failed run output for knowledge capture", () => {
    expect(
      shouldCaptureRunOutputForProjectKnowledge({
        exitCode: 1,
        output: "failed",
      }),
    ).toBe(false);
  });

  it("redacts emails before persistence", () => {
    expect(redactTextForProjectKnowledge("write to a@b.co")).not.toContain(
      "a@b.co",
    );
  });

  it("preserves profile knowledge when repo folder changes", () => {
    const installDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-p6-mig-"));
    tempDirs.push(installDir);
    const layout = buildLayout(installDir);
    const projectId = "proj-1";
    const folderA = path.join(installDir, "a");
    const storageA = resolveAgentWitchProjectStorageLayout(folderA);

    fs.mkdirSync(storageA.ragDirPath, { recursive: true });
    fs.writeFileSync(
      storageA.ragChunksFilePath,
      `${JSON.stringify({ id: "1", text: "keep", embedding: [1], createdAt: "t" })}\n`,
    );
    fs.mkdirSync(storageA.metaDirPath, { recursive: true });
    fs.writeFileSync(
      path.join(storageA.metaDirPath, AGENT_WITCH_PROJECT_META_FILE_NAME),
      `${JSON.stringify({ projectId })}\n`,
    );

    migrateLegacyRepoKnowledgeToProfile({
      layout,
      projectFolderPath: folderA,
      projectId,
    });

    const folderB = path.join(installDir, "b");
    fs.mkdirSync(path.join(folderB, ".agent-witch"), { recursive: true });
    fs.writeFileSync(
      path.join(folderB, ".agent-witch", AGENT_WITCH_PROJECT_META_FILE_NAME),
      `${JSON.stringify({ projectId })}\n`,
    );

    const paths = resolveAgentWitchProjectKnowledgePaths({
      layout,
      projectFolderPath: folderB,
      projectId,
    });
    const profile = resolveProfileProjectKnowledgeLayout(layout, projectId);

    expect(paths?.ragChunksFilePath).toBe(profile.ragChunksFilePath);
    expect(fs.readFileSync(profile.ragChunksFilePath, "utf8")).toContain(
      "keep",
    );
  });

  it("trims RAG chunks to the configured ceiling", () => {
    const filePath = path.join(os.tmpdir(), `ceiling-${Date.now()}.ndjson`);
    const lines = Array.from({ length: 4 }, (_, i) =>
      JSON.stringify({ id: String(i) }),
    );
    fs.writeFileSync(filePath, `${lines.join("\n")}\n`);
    trimRagChunksToCeiling(filePath, 2);
    expect(fs.readFileSync(filePath, "utf8").trim().split("\n")).toHaveLength(
      2,
    );
    fs.rmSync(filePath, { force: true });
  });
});
