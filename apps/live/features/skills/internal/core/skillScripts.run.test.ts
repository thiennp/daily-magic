import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { handleSkillsRun } from "./skillsRunHandler";
import type { SkillToolDeps } from "./skillTools.types";
import {
  approve,
  ECHO_SCRIPT,
  makeScriptWorld,
  type ScriptWorld,
} from "./skillScripts.testutil";

let world: ScriptWorld | null = null;
afterEach(() => world?.cleanup());

const FAIL_SCRIPT = {
  ...ECHO_SCRIPT,
  name: "always-fails",
  file: "always-fails.sh",
  params: [],
  content: "#!/bin/sh\necho oops >&2\nexit 3\n",
};

const setup = async (paused = false) => {
  world = await makeScriptWorld([ECHO_SCRIPT, FAIL_SCRIPT]);
  approve(world);
  approve(world, "always-fails");
  const w = world;
  // Approval is pinned per script hash; re-read the failing script's hash.
  const failEntry = JSON.parse(
    fs.readFileSync(path.join(w.skillDir, "scripts", "manifest.json"), "utf8"),
  ).scripts.find((s: { name: string }) => s.name === "always-fails");
  w.db
    .prepare(
      "INSERT OR REPLACE INTO skill_script_approval VALUES ('p1','greet','always-fails',?, 'approved', 'now')",
    )
    .run(failEntry.sha256);
  const deps: SkillToolDeps = {
    openDb: () => w.db,
    resolveProjectId: () => "p1",
    projectDataDir: path.join(w.root, "data"),
    runId: "run-1",
    defaultCwd: () => w.folder,
    isPaused: () => paused,
  };
  const run = async (args: Record<string, unknown>) => {
    const result = await handleSkillsRun(deps)({ skill: "greet", ...args });
    return {
      isError: result.isError === true,
      body: JSON.parse(result.content[0]?.text ?? "{}") as Record<
        string,
        unknown
      >,
    };
  };
  return { w, run };
};

describe("skills_run with a script", () => {
  it("runs an approved script with argv params and logs the call", async () => {
    const { w, run } = await setup();
    const out = await run({ script: "echo-name", params: { who: "bob" } });
    expect(out.body).toMatchObject({
      ok: true,
      exitCode: 0,
      stdout: "hello bob\n",
    });
    const rows = w.db.prepare("SELECT ok, tool FROM skill_call").all();
    expect(rows).toEqual([{ ok: 1, tool: "skills_run" }]);
  });

  it("never lets param text reach a shell", async () => {
    const { w, run } = await setup();
    const evil = `x; touch ${path.join(w.folder, "pwned")} #`;
    const out = await run({ script: "echo-name", params: { who: evil } });
    expect(out.body.stdout).toBe(`hello ${evil}\n`);
    expect(fs.existsSync(path.join(w.folder, "pwned"))).toBe(false);
  });

  it("validates params: missing, unknown, non-string, too long", async () => {
    const { run } = await setup();
    const err = async (params: unknown) =>
      (await run({ script: "echo-name", params })).body.error;
    expect(await err({})).toBe("missing_param:who");
    expect(await err({ who: "a", extra: "b" })).toBe("unknown_param:extra");
    expect(await err({ who: 5 })).toBe("invalid_param:who");
    expect(await err({ who: "a".repeat(501) })).toBe("invalid_param:who");
  });

  it("refuses scripts that are unknown or not approved", async () => {
    const { w, run } = await setup();
    expect((await run({ script: "nope" })).body.error).toBe("script_not_found");
    w.db.prepare("DELETE FROM skill_script_approval").run();
    const out = await run({ script: "echo-name", params: { who: "a" } });
    expect(out.body.error).toBe("script_not_approved");
    expect(out.body.fallback).toContain("do the step yourself");
  });

  it("refuses when the file on disk no longer matches the pinned hash", async () => {
    const { w, run } = await setup();
    const file = path.join(w.skillDir, "scripts", "echo-name.sh");
    fs.chmodSync(file, 0o755);
    fs.writeFileSync(file, "#!/bin/sh\necho owned\n");
    const out = await run({ script: "echo-name", params: { who: "a" } });
    expect(out.body.error).toBe("script_hash_mismatch");
  });

  it("confines the working directory to the project folder", async () => {
    const { w, run } = await setup();
    const call = (cwd: string) =>
      run({ script: "echo-name", params: { who: "a" }, cwd });
    expect((await call(os.tmpdir())).body.error).toBe("cwd_outside_project");
    expect((await call(`${w.folder}/../..`)).body.error).toBe(
      "cwd_outside_project",
    );
    const link = path.join(w.folder, "link");
    fs.symlinkSync(os.tmpdir(), link);
    expect((await call(link)).body.error).toBe("cwd_outside_project");
    fs.mkdirSync(path.join(w.folder, "sub"));
    expect((await call(path.join(w.folder, "sub"))).body.ok).toBe(true);
  });

  it("refuses while coding tools are paused", async () => {
    const { run } = await setup(true);
    const out = await run({ script: "echo-name", params: { who: "a" } });
    expect(out.body.error).toBe("coding_tools_paused");
  });

  it("returns a structured error for a failing script and logs ok=0", async () => {
    const { w, run } = await setup();
    const out = await run({ script: "always-fails" });
    expect(out.isError).toBe(true);
    expect(out.body).toMatchObject({
      ok: false,
      exitCode: 3,
      error: "script_failed",
    });
    expect(String(out.body.stderr)).toContain("oops");
    expect(w.db.prepare("SELECT ok FROM skill_call").all()).toEqual([
      { ok: 0 },
    ]);
  });
});
