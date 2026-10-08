import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { trimAgentWitchLogFile } from "./trimAgentWitchLogFile";

const dirs: string[] = [];
afterEach(() => {
  for (const dir of dirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

const makeLog = (lines: number): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-log-"));
  dirs.push(dir);
  const file = path.join(dir, "a.log");
  fs.writeFileSync(
    file,
    Array.from({ length: lines }, (_, i) => `line-${i}`).join("\n") + "\n",
  );
  return file;
};

describe("trimAgentWitchLogFile", () => {
  it("keeps whole lines from the tail when the file is over the cap", () => {
    const file = makeLog(1_000);
    expect(
      trimAgentWitchLogFile(file, { maxBytes: 1_000, keepBytes: 100 }),
    ).toBe(true);
    const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
    expect(lines.at(-1)).toBe("line-999");
    expect(lines.every((line) => /^line-\d+$/.test(line))).toBe(true);
    expect(fs.statSync(file).size).toBeLessThanOrEqual(100);
  });

  it("leaves small or missing files alone", () => {
    const file = makeLog(3);
    expect(
      trimAgentWitchLogFile(file, { maxBytes: 1_000, keepBytes: 100 }),
    ).toBe(false);
    expect(
      trimAgentWitchLogFile(`${file}.missing`, { maxBytes: 1, keepBytes: 1 }),
    ).toBe(false);
  });
});
