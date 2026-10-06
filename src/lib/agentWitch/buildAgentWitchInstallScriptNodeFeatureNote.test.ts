import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL } from "@/lib/agentWitch/agentWitchNodeRuntime.constant";
import { buildAgentWitchInstallScriptNodeFeatureNote } from "@/lib/agentWitch/buildAgentWitchInstallScriptNodeFeatureNote";
import { buildAgentWitchInstallScriptNodeRuntime } from "@/lib/agentWitch/buildAgentWitchInstallScriptNodeRuntime";
import { runBashWithoutTerminal } from "@/lib/agentWitch/runBashWithoutTerminal";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/** Fake `node`: `-v` prints the version; `-e` (capability probe) exits with probeExit. */
const writeStubNode = (version: string, probeExit: number): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-node-note-"));
  tempDirs.push(dir);
  const stub = path.join(dir, "node");
  fs.writeFileSync(
    stub,
    `#!/bin/sh\nif [ "$1" = "-v" ]; then echo ${version}; exit 0; fi\nexit ${probeExit}\n`,
    { mode: 0o755 },
  );
  return stub;
};

const runNote = (nodeBin: string) =>
  runBashWithoutTerminal(
    `${buildAgentWitchInstallScriptNodeFeatureNote()}\nagent_witch_note_node_feature_gaps "${nodeBin}"\necho "CONTINUED"\n`,
    {},
  );

describe("buildAgentWitchInstallScriptNodeFeatureNote", () => {
  it("AWL-NODE-001: prints one line naming the needed version when node:sqlite is missing, and continues", async () => {
    const result = await runNote(writeStubNode("v20.19.2", 1));

    expect(result.code).toBe(0);
    expect(result.stdout).toBe("CONTINUED\n");
    const lines = result.stderr.trim().split("\n");
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Node.js v20.19.2 runs AgentWitch");
    expect(lines[0]).toContain(
      `needs Node.js ${AGENT_WITCH_FULL_FEATURE_NODE_VERSION_LABEL} or newer`,
    );
    expect(lines[0]).toContain("nodejs.org");
  });

  it("AWL-NODE-002: stays silent when the probe finds node:sqlite", async () => {
    const result = await runNote(writeStubNode("v22.13.0", 0));

    expect(result.code).toBe(0);
    expect(result.stderr).toBe("");
  });

  it("AWL-NODE-003: probes with the real node binary the same way the bundle does", async () => {
    const result = await runNote(process.execPath);
    const runtimeHasSqlite =
      typeof process.getBuiltinModule === "function" &&
      process.getBuiltinModule("node:sqlite") !== undefined;

    expect(result.code).toBe(0);
    expect(result.stderr === "").toBe(runtimeHasSqlite);
  });

  it("AWL-NODE-004: install/update scripts run the note after the Node 20 gate", () => {
    const block = buildAgentWitchInstallScriptNodeRuntime();

    expect(block).toMatch(
      /\nagent_witch_ensure_node_runtime\nagent_witch_note_node_feature_gaps "\$\{NODE_BIN\}"\n$/,
    );
  });
});
