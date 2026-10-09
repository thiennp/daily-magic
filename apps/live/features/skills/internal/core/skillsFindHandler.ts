import { toMcpTextResult, type McpToolResult } from "@agent-witch/shared/mcp";

import { findSkills } from "./findSkills";
import { insertFindLog } from "./skillCallLog";
import { readArgs, readString, resolveToolScope } from "./skillToolArgs";
import type { SkillToolDeps } from "./skillTools.types";

/** `skills_find({query, k})`: ranked names only, logged for the MISS metric. */
export const handleSkillsFind =
  (deps: SkillToolDeps) =>
  async (raw: unknown): Promise<McpToolResult> => {
    const args = readArgs(raw);
    const query = readString(args, "query");
    if (query.length === 0) {
      return toMcpTextResult(JSON.stringify({ error: "query_required" }), true);
    }
    const scope = resolveToolScope(deps, args);
    if ("unavailable" in scope) {
      return toMcpTextResult(
        JSON.stringify({
          skills: [],
          unavailable: true,
          note: scope.unavailable,
        }),
      );
    }
    const skills = await findSkills({
      db: scope.db,
      projectId: scope.projectId,
      query,
      ...(typeof args.k === "number" ? { k: args.k } : {}),
      ...(deps.embed !== undefined ? { embed: deps.embed } : {}),
      ...(deps.rerank !== undefined ? { rerank: deps.rerank } : {}),
    });
    try {
      insertFindLog(scope.db, {
        projectId: scope.projectId,
        query,
        returnedIds: skills.map((s) => s.skillId),
        runId: deps.runId ?? null,
      });
    } catch {
      // logging must never break the call
    }
    return toMcpTextResult(JSON.stringify({ skills }));
  };
