import { describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { readAgentWitchErrorLogTail } from "./readAgentWitchErrorLogTail";

describe("readAgentWitchErrorLogTail", () => {
  it("returns tail content and byte size", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-error-log-"));
    const logPath = path.join(tempDir, "agent-witch.error.log");
    fs.writeFileSync(logPath, "line-one\nline-two\n");

    const tail = readAgentWitchErrorLogTail(logPath);

    expect(tail.exists).toBe(true);
    expect(tail.content).toContain("line-two");
    expect(tail.byteSize).toBeGreaterThan(0);

    fs.rmSync(tempDir, { recursive: true, force: true });
  });
});
