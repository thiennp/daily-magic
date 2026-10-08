import path from "node:path";

import { toMcpTextResult, type McpToolResult } from "@agent-witch/shared/mcp";

import { gateSkillCall } from "./gateSkillCall";
import { resolveScriptCall, type ScriptRequest } from "./resolveScriptCall";
import { buildScriptEnv, runSkillScript } from "./runSkillScript";
import {
  listMirrorSkills,
  readMirrorSkillMarkdown,
  resolveMirrorSkillsDir,
} from "./skillMirror";
import { readArgs, readString, resolveToolScope } from "./skillToolArgs";
import type { SkillToolDeps } from "./skillTools.types";
import type { SkillIndexDb } from "./skillIndex.types";

const FALLBACK = "Skip this tool and do the step yourself.";
const SCRIPT_GRACE_MS = 5_000;

const loadSkillBody = (
  deps: SkillToolDeps,
  projectId: string,
  skillId: string,
): string => {
  const dir = resolveMirrorSkillsDir(deps.projectDataDir, projectId);
  const skill =
    dir === null
      ? undefined
      : listMirrorSkills(dir).find((s) => s.skillId === skillId);
  const body = skill === undefined ? null : readMirrorSkillMarkdown(skill);
  if (body === null) {
    throw new Error("skill_body_missing");
  }
  return body;
};

const runScript = async (
  db: SkillIndexDb,
  ids: { readonly projectId: string; readonly skillId: string },
  request: ScriptRequest,
): Promise<{ readonly output: string; readonly ok: boolean }> => {
  const resolved = resolveScriptCall(db, ids, request);
  if (!resolved.ok) {
    throw new Error(resolved.error);
  }
  const result = await runSkillScript({
    file: resolved.file,
    argv: resolved.argv,
    cwd: resolved.cwd,
    env: buildScriptEnv(
      process.env,
      resolved.entry.permissions.network,
      resolved.cwd,
    ),
    timeoutMs: resolved.timeoutMs,
  });
  const { ok, exitCode, stdout, stderr, timedOut, truncated } = result;
  return {
    ok,
    output: JSON.stringify({
      ok,
      exitCode,
      stdout,
      stderr,
      ...(timedOut ? { timedOut } : {}),
      ...(truncated ? { truncated } : {}),
      ...(ok ? {} : { error: "script_failed", fallback: FALLBACK }),
    }),
  };
};

/**
 * `skills_run({skill, params, script?})`. Without `script` it loads the
 * SKILL.md body; with `script` it runs one verified, approved script. Both go
 * through `gateSkillCall`; a failure is structured and tells the agent to do
 * the step itself.
 */
export const handleSkillsRun =
  (deps: SkillToolDeps) =>
  async (raw: unknown): Promise<McpToolResult> => {
    const args = readArgs(raw);
    const skillId = readString(args, "skill");
    const scope = resolveToolScope(deps, args);
    if ("unavailable" in scope || skillId.length === 0) {
      const error =
        "unavailable" in scope ? scope.unavailable : "skill_required";
      return toMcpTextResult(JSON.stringify({ error }), true);
    }
    const params = readArgs(args.params);
    const scriptName = readString(args, "script");
    const skillsDir = resolveMirrorSkillsDir(
      deps.projectDataDir,
      scope.projectId,
    );
    const script: ScriptRequest | undefined =
      scriptName.length === 0
        ? undefined
        : {
            name: scriptName,
            params,
            skillDir: path.join(skillsDir ?? "", skillId),
            cwd: readString(args, "cwd") || deps.defaultCwd?.() || "",
            ...(deps.isPaused !== undefined ? { isPaused: deps.isPaused } : {}),
          };
    const ids = { projectId: scope.projectId, skillId };
    const result = await gateSkillCall({
      db: scope.db,
      ...ids,
      tool: "skills_run",
      chosenBy: "agent",
      runId: deps.runId ?? null,
      ...(script !== undefined
        ? { script, timeoutMs: 300_000 + SCRIPT_GRACE_MS }
        : {}),
      execute: () =>
        script !== undefined
          ? runScript(scope.db, ids, script)
          : Object.keys(params).length === 0
            ? loadSkillBody(deps, scope.projectId, skillId)
            : `${loadSkillBody(deps, scope.projectId, skillId)}\n\n---\nParameters: ${JSON.stringify(params)}`,
    });
    if (result.ok) {
      return toMcpTextResult(result.output);
    }
    return toMcpTextResult(
      result.output ??
        JSON.stringify({ error: result.error, fallback: FALLBACK }),
      true,
    );
  };
