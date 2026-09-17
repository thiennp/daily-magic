#!/usr/bin/env tsx
/**
 * Cursor stop hook: run changed-file gates when the agent loop ends.
 * Stdin: { status, loop_count }. Stdout: { followup_message?: string }.
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { emitFollowupMessage } from "./emitHookJson";
import { readHookInput, type HookInputBase } from "./readHookInput";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../../..");

const MAX_LOOP = 2;
const MAX_MESSAGE_CHARS = 8000;

const truncate = (text: string): string =>
  text.length <= MAX_MESSAGE_CHARS
    ? text
    : `${text.slice(0, MAX_MESSAGE_CHARS)}\n…(truncated)`;

const run = (command: string): string | null => {
  try {
    execSync(command, {
      cwd: REPO_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return null;
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string };
    return `${err.stdout ?? ""}\n${err.stderr ?? ""}`.trim();
  }
};

const hasSrcOrDbChanges = (): boolean => {
  try {
    const out = execSync('git diff --name-only HEAD -- "src/" "db/"', {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }).trim();
    return out.length > 0;
  } catch {
    return false;
  }
};

const main = (): void => {
  const input = readHookInput<HookInputBase>();
  const loopCount = input.loop_count ?? 0;
  if (loopCount >= MAX_LOOP) {
    emitFollowupMessage("");
    return;
  }
  if (input.status !== "completed") {
    emitFollowupMessage("");
    return;
  }
  if (!hasSrcOrDbChanges()) {
    emitFollowupMessage("");
    return;
  }

  const failures: string[] = [];

  const architectureFailure = run("npm run cursor:architecture");
  if (architectureFailure !== null) {
    failures.push(`## architecture-check\n${architectureFailure}`);
  }

  const structureOutput = run(
    "npx structure-validation --scope changes --verify-root --skip-error",
  );
  if (
    structureOutput !== null &&
    (structureOutput.includes("❌ Found") ||
      structureOutput.includes("validation error"))
  ) {
    failures.push(`## structure-validation\n${structureOutput}`);
  }

  if (failures.length === 0) {
    emitFollowupMessage("");
    return;
  }

  emitFollowupMessage(
    truncate(
      `Verification hook failed on changed src/db files. Fix these, then finish:\n\n${failures.join("\n\n")}`,
    ),
  );
};

main();
