import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

import { isAgentWitchScriptEntryPoint } from "./isAgentWitchScriptEntryPoint";

const originalArgv1 = process.argv[1];
const tempDirs: string[] = [];
afterEach(() => {
  process.argv[1] = originalArgv1 as string;
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
});

describe("isAgentWitchScriptEntryPoint", () => {
  it("accepts the script when launched through a symlink (~/.local/bin/agent-witch)", () => {
    const dir = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), "awl-entry-")),
    );
    tempDirs.push(dir);
    const script = path.join(dir, "agent-witch.js");
    const link = path.join(dir, "agent-witch");
    fs.writeFileSync(script, "");
    fs.symlinkSync(script, link);
    process.argv[1] = link;
    expect(isAgentWitchScriptEntryPoint(pathToFileURL(script).href)).toBe(true);
  });

  it("rejects an unrelated entry script", () => {
    const dir = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), "awl-entry-")),
    );
    tempDirs.push(dir);
    const script = path.join(dir, "agent-witch.js");
    const other = path.join(dir, "other.js");
    fs.writeFileSync(script, "");
    fs.writeFileSync(other, "");
    process.argv[1] = other;
    expect(isAgentWitchScriptEntryPoint(pathToFileURL(script).href)).toBe(
      false,
    );
  });
});
