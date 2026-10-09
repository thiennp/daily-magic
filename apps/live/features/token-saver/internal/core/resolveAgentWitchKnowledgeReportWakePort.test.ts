import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const installDirMock = vi.hoisted(() => vi.fn(() => ""));
const wakePortDirMock = vi.hoisted(() => vi.fn(() => ""));
const readFileMock = vi.hoisted(() => vi.fn(() => null as number | null));
const runtimeMock = vi.hoisted(() => vi.fn(() => 47_892));

vi.mock("@agent-witch/install-layout", () => ({
  resolveAgentWitchInstallDir: () => installDirMock(),
  resolveAgentWitchWakePortDir: (_install: string, _env: NodeJS.ProcessEnv) =>
    wakePortDirMock(),
  readAgentWitchWakePortFromFile: (_dir: string) => readFileMock(),
  resolveAgentWitchRuntimeWakePort: (_install: string) => runtimeMock(),
}));

import { resolveAgentWitchKnowledgeReportWakePort } from "./resolveAgentWitchKnowledgeReportWakePort";

const tempDirs: string[] = [];
afterEach(() => {
  for (const d of tempDirs.splice(0)) {
    fs.rmSync(d, { recursive: true, force: true });
  }
  vi.clearAllMocks();
});

describe("resolveAgentWitchKnowledgeReportWakePort", () => {
  it("prefers wake-port.json in the account port dir", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "awl-wake-port-"));
    tempDirs.push(root);
    installDirMock.mockReturnValue(root);
    wakePortDirMock.mockReturnValue(
      path.join(root, "profiles", "u@example.com"),
    );
    readFileMock.mockReturnValue(51_841);
    expect(resolveAgentWitchKnowledgeReportWakePort()).toBe(51_841);
  });

  it("falls back to runtime resolver when the file is missing", () => {
    installDirMock.mockReturnValue("/tmp/install");
    wakePortDirMock.mockReturnValue("/tmp/install");
    readFileMock.mockReturnValue(null);
    runtimeMock.mockReturnValue(47_893);
    expect(resolveAgentWitchKnowledgeReportWakePort()).toBe(47_893);
  });
});
