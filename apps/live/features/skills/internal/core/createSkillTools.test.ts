import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { handleMcpJsonRpcRequest } from "@agent-witch/shared/mcp";
import { afterEach, describe, expect, it } from "vitest";

import { createSkillTools } from "./createSkillTools";
import { clearSkillCorpusCacheForTests } from "./findSkills";
import { reindexProject } from "./reindexProject";
import { conceptEmbedder, openTestDb } from "./skillFixtures.testutil";
import type { SkillToolDeps } from "./skillTools.types";

let root = "";
afterEach(() => {
  clearSkillCorpusCacheForTests();
  fs.rmSync(root, { recursive: true, force: true });
});

const setup = async () => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), "skill-tools-"));
  const dir = path.join(root, "p1", "skills", "release-deploy");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "meta.json"), '{"version":1}');
  fs.writeFileSync(
    path.join(dir, "v0001.md"),
    "---\nname: Release deploy\ndescription: Publish a build to production\nkeywords: deploy release\n---\n# Steps\n1. Tag\n",
  );
  const db = openTestDb();
  await reindexProject({
    db,
    projectDataDir: root,
    projectId: "p1",
    embed: conceptEmbedder,
  });
  const deps: SkillToolDeps = {
    openDb: () => db,
    resolveProjectId: (cwd) => (cwd.startsWith("/work/p1") ? "p1" : null),
    projectDataDir: root,
    embed: conceptEmbedder,
    runId: "run-9",
  };
  const server = {
    serverInfo: { name: "t", version: "1" },
    tools: createSkillTools(deps),
  };
  const call = async (name: string, args: unknown) => {
    const response = (await handleMcpJsonRpcRequest(
      {
        jsonrpc: "2.0",
        id: 1,
        method: "tools/call",
        params: { name, arguments: args },
      },
      server,
      undefined,
    )) as { result: { content: { text: string }[]; isError?: boolean } };
    return response.result;
  };
  return { db, server, call };
};

describe("skills MCP tools", () => {
  it("lists both tool schemas", async () => {
    const { server } = await setup();
    const names = server.tools.map((t) => t.definition.name);
    expect(names).toEqual(["skills_find", "skills_run"]);
    expect(server.tools[0]!.definition.inputSchema).toMatchObject({
      required: ["query"],
    });
    expect(server.tools[1]!.definition.inputSchema).toMatchObject({
      required: ["skill"],
    });
  });

  it("skills_find returns ranked names and logs the find", async () => {
    const { call, db } = await setup();
    const result = await call("skills_find", {
      query: "ship to production",
      cwd: "/work/p1",
    });
    const body = JSON.parse(result.content[0]!.text) as {
      skills: { skillId: string }[];
    };
    expect(body.skills[0]?.skillId).toBe("release-deploy");
    expect(result.content[0]!.text).not.toContain("Tag");
    const log = db.prepare("SELECT * FROM skill_find_log").all() as Record<
      string,
      unknown
    >[];
    expect(log[0]).toMatchObject({
      project_id: "p1",
      chosen_id: null,
      run_id: "run-9",
    });
  });

  it("skills_run loads the body, logs the call and marks the find as chosen", async () => {
    const { call, db } = await setup();
    await call("skills_find", { query: "deploy release", cwd: "/work/p1" });
    const result = await call("skills_run", {
      skill: "release-deploy",
      params: { env: "prod" },
      cwd: "/work/p1",
    });
    expect(result.content[0]!.text).toContain("1. Tag");
    expect(result.content[0]!.text).toContain('Parameters: {"env":"prod"}');
    expect(db.prepare("SELECT ok, tool FROM skill_call").all()).toEqual([
      { ok: 1, tool: "skills_run" },
    ]);
    expect(db.prepare("SELECT chosen_id FROM skill_find_log").get()).toEqual({
      chosen_id: "release-deploy",
    });
  });

  it("answers structured errors for bad input and unknown projects", async () => {
    const { call } = await setup();
    expect((await call("skills_find", {})).isError).toBe(true);
    expect(
      JSON.parse(
        (await call("skills_find", { query: "x", cwd: "/elsewhere" }))
          .content[0]!.text,
      ),
    ).toEqual({
      skills: [],
      unavailable: true,
      note: "no_project_for_cwd",
    });
    const missing = await call("skills_run", {
      skill: "ghost",
      cwd: "/work/p1",
    });
    expect(missing.isError).toBe(true);
    expect(missing.content[0]!.text).toContain("skill_not_installed");
  });
});
