import { toMcpTextResult, type McpToolResult } from "@agent-witch/shared/mcp";

import { gateSkillCall } from "./gateSkillCall";
import {
  listMirrorSkills,
  readMirrorSkillBody,
  resolveMirrorSkillsDir,
} from "./skillMirror";
import { readArgs, readString, resolveToolScope } from "./skillToolArgs";
import type { SkillToolDeps } from "./skillTools.types";

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
  const body = skill === undefined ? null : readMirrorSkillBody(skill);
  if (body === null) {
    throw new Error("skill_body_missing");
  }
  return body;
};

/**
 * `skills_run({skill, params})`. Phase 2 is load-and-log: the SKILL.md body
 * comes back through `gateSkillCall`; script execution lands in phase 3.
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
    const result = await gateSkillCall({
      db: scope.db,
      projectId: scope.projectId,
      skillId,
      tool: "skills_run",
      chosenBy: "agent",
      runId: deps.runId ?? null,
      execute: () => {
        const body = loadSkillBody(deps, scope.projectId, skillId);
        return Object.keys(params).length === 0
          ? body
          : `${body}\n\n---\nParameters: ${JSON.stringify(params)}`;
      },
    });
    return result.ok
      ? toMcpTextResult(result.output)
      : toMcpTextResult(JSON.stringify({ error: result.error }), true);
  };
