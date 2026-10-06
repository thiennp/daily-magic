import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  isCodingToolsPaused,
  resolveCodingToolsPausePath,
  writeCodingToolsPause,
} from "./codingToolsPauseStore";
import { watchCodingToolsPause } from "./watchCodingToolsPause";

const profileDir = fs.mkdtempSync(path.join(os.tmpdir(), "awl-pause-"));
const configPath = path.join(profileDir, "config.json");

afterEach(() => {
  fs.rmSync(resolveCodingToolsPausePath(configPath), { force: true });
});

describe("codingToolsPauseStore", () => {
  it("is not paused until the switch is written", () => {
    expect(isCodingToolsPaused(configPath)).toBe(false);
    writeCodingToolsPause(configPath, true, new Date("2026-10-06T10:00:00Z"));
    expect(isCodingToolsPaused(configPath)).toBe(true);
    writeCodingToolsPause(configPath, false);
    expect(isCodingToolsPaused(configPath)).toBe(false);
  });

  it("writes the file owner-only next to config.json", () => {
    writeCodingToolsPause(configPath, true);
    const filePath = resolveCodingToolsPausePath(configPath);
    expect(path.dirname(filePath)).toBe(profileDir);
    expect(fs.statSync(filePath).mode & 0o777).toBe(0o600);
  });

  it("fails closed when the file is corrupt", () => {
    fs.writeFileSync(resolveCodingToolsPausePath(configPath), "{oops");
    expect(isCodingToolsPaused(configPath)).toBe(true);
  });

  it("notifies when the switch flips", async () => {
    const seen: boolean[] = [];
    const unwatch = watchCodingToolsPause(configPath, (p) => seen.push(p), 20);
    writeCodingToolsPause(configPath, true);
    await vi.waitFor(() => expect(seen).toEqual([true]), { timeout: 4000 });
    unwatch();
  });
});
