import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { SkillScriptProposal } from "@agent-witch/shared/projectSkills";

import {
  buildScriptArgv,
  buildScriptEnv,
  runSkillScript,
} from "../../../skills/public-api/infrastructure";

import { copyProjectForReplay } from "./autoSkillReplayCopy";

export const REPLAY_TIMEOUT_MS = 30_000;

export type ReplayResult = {
  readonly script: string;
  readonly status: "ok" | "failed" | "not_replayed";
  readonly exitCode: number | null;
  readonly ms: number | null;
  readonly note: string | null;
  readonly stdoutHead: string;
};

const skipped = (script: string, note: string): ReplayResult => ({
  script,
  status: "not_replayed",
  exitCode: null,
  ms: null,
  note,
  stdoutHead: "",
});

const exampleParams = (p: SkillScriptProposal): Record<string, string> =>
  Object.fromEntries(p.params.map((x) => [x.name, x.example]));

/**
 * Dry run each proposed script in a TEMP COPY of the project folder (tracked
 * files only, size-capped) with the example params, 30 s each, proxy env
 * stripped. Network scripts, missing examples and oversized folders are
 * reported as "not replayed". The real folder is never touched.
 */
export const replayScripts = async (
  proposals: readonly SkillScriptProposal[],
  folderPath: string | undefined,
): Promise<ReplayResult[]> => {
  if (folderPath === undefined) {
    return proposals.map((p) => skipped(p.name, "no project folder"));
  }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "aw-replay-"));
  const work = path.join(tmp, "work");
  try {
    const copy = await copyProjectForReplay(folderPath, work);
    if (!copy.ok) {
      return proposals.map((p) => skipped(p.name, copy.note));
    }
    const results: ReplayResult[] = [];
    for (const p of proposals) {
      const argv = buildScriptArgv({ ...p, sha256: "" }, exampleParams(p));
      if (p.permissions.network) {
        results.push(skipped(p.name, "needs network"));
        continue;
      }
      if (!argv.ok) {
        results.push(skipped(p.name, "no example params"));
        continue;
      }
      const file = path.join(tmp, p.file);
      fs.writeFileSync(file, p.content, { mode: 0o500 });
      const startedAt = Date.now();
      const run = await runSkillScript({
        file,
        argv: argv.argv,
        cwd: work,
        env: buildScriptEnv(process.env, false, work),
        timeoutMs: REPLAY_TIMEOUT_MS,
      });
      results.push({
        script: p.name,
        status: run.ok ? "ok" : "failed",
        exitCode: run.exitCode,
        ms: Date.now() - startedAt,
        note: run.timedOut ? "timed out" : null,
        stdoutHead: run.stdout.slice(0, 200),
      });
    }
    return results;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
};
