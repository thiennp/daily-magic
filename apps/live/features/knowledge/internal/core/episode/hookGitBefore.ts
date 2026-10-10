import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { buildGitSubprocessEnv } from "@agent-witch/shared";
import {
  AGENT_WITCH_PROFILES_DIR_NAME,
  type AgentWitchLocalLayout,
} from "@agent-witch/install-layout/types";

import type { KnowledgeRunGitBefore } from "./captureKnowledgeAfterRun";

type Layout = Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;

const GIT_TIMEOUT_MS = 700;
const MAX_ENTRIES = 30;
const FILE_NAME = "knowledge-hook-git.json";

const git = (cwd: string, args: readonly string[]): string | null => {
  try {
    return execFileSync("git", [...args], {
      cwd,
      env: buildGitSubprocessEnv(),
      timeout: GIT_TIMEOUT_MS,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
};

/** Head sha and dirty-path count now (sync and fast: runs inside a 3s hook). */
export const snapshotGitBeforeSync = (
  cwd: string,
): KnowledgeRunGitBefore | undefined => {
  const headSha = git(cwd, ["rev-parse", "HEAD"]);
  const porcelain = git(cwd, ["status", "--porcelain"]);
  if (headSha === null || porcelain === null) return undefined;
  return {
    headSha: headSha.length > 0 ? headSha : null,
    porcelainLineCount: porcelain.split("\n").filter((l) => l.trim().length > 0)
      .length,
  };
};

const filePath = (layout: Layout): string =>
  layout.profileEmail !== null
    ? path.join(
        layout.installDir,
        AGENT_WITCH_PROFILES_DIR_NAME,
        layout.profileEmail,
        FILE_NAME,
      )
    : path.join(layout.installDir, FILE_NAME);

type Store = Record<string, KnowledgeRunGitBefore & { readonly at: number }>;

const readStore = (layout: Layout): Store => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(filePath(layout), "utf8"),
    );
    return typeof parsed === "object" && parsed !== null
      ? (parsed as Store)
      : {};
  } catch {
    return {};
  }
};

/** Remember the git state a hook run started from (newest 30 kept). Best effort. */
export const saveHookGitBefore = (
  layout: Layout,
  runId: string,
  before: KnowledgeRunGitBefore,
): void => {
  try {
    const kept = Object.entries({
      ...readStore(layout),
      [runId]: { ...before, at: Date.now() },
    })
      .sort(([, a], [, b]) => b.at - a.at)
      .slice(0, MAX_ENTRIES);
    fs.mkdirSync(path.dirname(filePath(layout)), { recursive: true });
    fs.writeFileSync(
      filePath(layout),
      JSON.stringify(Object.fromEntries(kept)),
    );
  } catch {
    // git context is optional: the run is still recorded without it
  }
};

export const readHookGitBefore = (
  layout: Layout,
  runId: string,
): KnowledgeRunGitBefore | undefined => {
  const entry = readStore(layout)[runId];
  return entry === undefined
    ? undefined
    : { headSha: entry.headSha, porcelainLineCount: entry.porcelainLineCount };
};
