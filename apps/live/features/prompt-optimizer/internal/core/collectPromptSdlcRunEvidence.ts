import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import { buildGitSubprocessEnv } from "@/lib/git/buildGitSubprocessEnv";

import { findPromptSdlcEvidencePaths } from "../../../../adapters/promptSdlcAwcCore";

const MAX_TEXT = 4000;
const MAX_EVIDENCE = 12000;

export interface PromptSdlcWorkspaceSnapshot {
  readonly git: boolean;
  readonly status: Readonly<Record<string, string>>;
  readonly files: Readonly<Record<string, string | null>>;
  readonly paths: readonly string[];
}

const gitText = (cwd: string, args: readonly string[]): string | null => {
  const result = spawnSync("git", [...args], {
    cwd,
    env: buildGitSubprocessEnv(),
    encoding: "utf8",
    timeout: 8000,
  });
  if (result.status !== 0 || typeof result.stdout !== "string") {
    return null;
  }
  return result.stdout;
};

const isGitRepo = (cwd: string): boolean =>
  gitText(cwd, ["rev-parse", "--is-inside-work-tree"])?.trim() === "true";

const statusMap = (cwd: string): Readonly<Record<string, string>> => {
  const raw = gitText(cwd, ["status", "--porcelain=v1", "-uall"]);
  if (raw === null) {
    return {};
  }
  const entries = raw.split("\n").flatMap((line) => {
    if (line.length < 4) {
      return [];
    }
    const body = line.slice(3).trim();
    const filePath = body.includes(" -> ")
      ? (body.split(" -> ").at(-1) ?? body)
      : body;
    return [[filePath.replaceAll('"', ""), line] as const];
  });
  return Object.fromEntries(entries);
};

const readInside = (cwd: string, filePath: string): string | null => {
  const resolved = path.resolve(cwd, filePath);
  const relative = path.relative(cwd, resolved);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    return null;
  }
  const text = fs.readFileSync(resolved, "utf8");
  if (text.includes("\u0000")) {
    return "(binary file)";
  }
  return text.length > MAX_TEXT
    ? `${text.slice(0, MAX_TEXT)}\n…truncated`
    : text;
};

const clip = (text: string): string =>
  text.length > MAX_EVIDENCE
    ? `${text.slice(0, MAX_EVIDENCE)}\n…truncated`
    : text;

export const readPromptSdlcWorkspaceSnapshot = (input: {
  readonly workingDirectory: string;
  readonly promptText: string;
  readonly instructions?: string | null;
}): PromptSdlcWorkspaceSnapshot => {
  const paths = findPromptSdlcEvidencePaths(
    `${input.promptText}\n${input.instructions ?? ""}`,
  );
  const files = Object.fromEntries(
    paths.map((filePath) => [
      filePath,
      readInside(input.workingDirectory, filePath),
    ]),
  );
  const git = isGitRepo(input.workingDirectory);
  return {
    git,
    status: git ? statusMap(input.workingDirectory) : {},
    files,
    paths,
  };
};

const diffFor = (cwd: string, filePath: string): string => {
  const diff = gitText(cwd, [
    "diff",
    "--no-ext-diff",
    "--unified=3",
    "HEAD",
    "--",
    filePath,
  ]);
  if (diff !== null && diff.trim().length > 0) {
    return diff;
  }
  const body = readInside(cwd, filePath);
  return body === null ? `${filePath} is missing.` : body;
};

const lookedAtFor = (git: boolean, namedFile: boolean): string => {
  if (git && namedFile) {
    return "git changes in this folder, and files named in the prompt";
  }
  if (git) {
    return "git changes in this folder";
  }
  if (namedFile) {
    return "files named in the prompt";
  }
  return "the writer reply, because this folder is not a git repo and the prompt names no file";
};

export const describePromptSdlcRunEvidence = (input: {
  readonly workingDirectory: string;
  readonly before: PromptSdlcWorkspaceSnapshot;
  readonly writerReply: string;
}): { readonly lookedAt: string; readonly evidence: string } => {
  const afterStatus = input.before.git ? statusMap(input.workingDirectory) : {};
  const changed = Object.keys(afterStatus).filter(
    (filePath) => afterStatus[filePath] !== input.before.status[filePath],
  );
  const named = input.before.paths.map((filePath) => {
    const before = input.before.files[filePath] ?? null;
    const after = readInside(input.workingDirectory, filePath);
    if (before === after) {
      return `${filePath} did not change.`;
    }
    return `${filePath} changed.\n${after ?? `${filePath} is missing.`}`;
  });
  const diffs = changed.map((filePath) =>
    diffFor(input.workingDirectory, filePath),
  );
  const reply = input.writerReply.trim();
  const sections = [
    input.before.git
      ? `Git paths that changed during the run:\n${
          changed.map((filePath) => afterStatus[filePath]).join("\n") ||
          "(no git changes)"
        }`
      : "",
    diffs.length > 0
      ? `Changes since the run started:\n${diffs.join("\n")}`
      : "",
    named.length > 0 ? `Files named in the prompt:\n${named.join("\n\n")}` : "",
    reply.length > 0
      ? `Writer reply:\n${reply}`
      : "The writer printed nothing. Use the changes above.",
  ].filter((section) => section.length > 0);

  return {
    lookedAt: lookedAtFor(input.before.git, input.before.paths.length > 0),
    evidence: clip(sections.join("\n\n")),
  };
};
