import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { runTaskIntakeCli } from "./runTaskIntakeCli";
import { readTaskIntakePrefs } from "./taskIntakePrefsStore";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

const run = async (
  argv: string[],
  options: { claimed?: boolean; project?: boolean } = {},
) => {
  const root = fs.realpathSync(
    fs.mkdtempSync(path.join(os.tmpdir(), "awl-cli-")),
  );
  tempDirs.push(root);
  const out: string[] = [];
  const err: string[] = [];
  const layout = { installDir: path.join(root, "home"), profileEmail: "a@b.c" };
  const code = await runTaskIntakeCli(argv, {
    layout,
    resolveProjectId: () => (options.project === false ? null : "p1"),
    readClaims: () =>
      options.claimed === false
        ? []
        : [{ accountEmail: "a@b.c", projectId: "p1", folderRealPath: root }],
    writeStdout: (t) => out.push(t),
    writeStderr: (t) => err.push(t),
    defaultCwd: root,
    suggest: async ({ title, hasSkill }) => ({
      tier: hasSkill ? "script" : "low",
      source: title === "x" ? "heuristic" : "ollama",
    }),
  });
  return { code, out: out.join(""), err: err.join(""), layout };
};

describe("runTaskIntakeCli", () => {
  it("remember saves outside the repo with the user's own reply", async () => {
    const { code, layout } = await run([
      "remember",
      "--answer",
      "yes remember it",
    ]);
    expect(code).toBe(0);
    const pref = readTaskIntakePrefs(layout).byProjectId.p1;
    expect(pref).toMatchObject({
      mode: "always-yes",
      answer: "yes remember it",
    });
  });

  it("remember refuses without the user's reply", async () => {
    const { code, err, layout } = await run(["remember"]);
    expect(code).toBe(1);
    expect(err).toContain("--answer");
    expect(readTaskIntakePrefs(layout).byProjectId).toEqual({});
  });

  it("remember refuses a project that is not valid here", async () => {
    const { code, err } = await run(["remember", "--answer", "yes"], {
      claimed: false,
    });
    expect(code).toBe(1);
    expect(err).toContain("not valid");
  });

  it("status prints the ask text, and nothing for a short prompt or a non-project", async () => {
    const asked = await run([
      "status",
      "--prompt",
      "please add a settings page for this",
    ]);
    expect(asked.out).toContain("task intake");
    expect((await run(["status", "--prompt", "ok"])).out).toBe("");
    const outside = await run(["status"], { project: false });
    expect(outside).toMatchObject({ code: 0, out: "" });
  });

  it("suggest prints the tier as JSON", async () => {
    const withSkill = await run([
      "suggest",
      "--title",
      "run lint",
      "--has-skill",
    ]);
    expect(JSON.parse(withSkill.out)).toEqual({
      tier: "script",
      source: "ollama",
    });
    expect((await run(["suggest"])).code).toBe(1);
  });

  it("rejects an unknown action", async () => {
    expect((await run(["bogus"])).code).toBe(1);
  });
});
