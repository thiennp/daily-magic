import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { buildAgentWitchRepairScriptNodeCheck } from "@/lib/agentWitch/repair/buildAgentWitchRepairScriptNodeCheck";
import { renderRepairAgentWitchScript } from "@/lib/agentWitch/repair/renderRepairAgentWitchScript";
import { runBashWithoutTerminal } from "@/lib/agentWitch/runBashWithoutTerminal";

const tempDirs: string[] = [];

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

/** Fake `node`: `-v` prints the version; `-e` (version gate) exits with gateExit. */
const writeStubNode = (version: string, gateExit: number): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "awlr-node-"));
  tempDirs.push(dir);
  const stub = path.join(dir, "node");
  fs.writeFileSync(
    stub,
    `#!/bin/sh\nif [ "$1" = "-v" ]; then echo ${version}; exit 0; fi\nexit ${gateExit}\n`,
    { mode: 0o755 },
  );
  return stub;
};

const runCheck = (nodeBin: string) =>
  runBashWithoutTerminal(
    [
      `awl_repair_node() { [ -n "${nodeBin}" ] && printf '%s' "${nodeBin}"; }`,
      `awl_repair_die() { printf 'DIE: %s\\n' "$*" >&2; exit 1; }`,
      `awl_repair_log() { printf 'LOG: %s\\n' "$*"; }`,
      buildAgentWitchRepairScriptNodeCheck(),
      "awl_repair_check_node",
      'echo "CONTINUED"',
    ].join("\n"),
    {},
  );

describe("buildAgentWitchRepairScriptNodeCheck", () => {
  it("AWLR-009: stops with one clear line and changes nothing when Node is missing", async () => {
    const result = await runCheck("");

    expect(result.code).toBe(1);
    expect(result.stdout).not.toContain("CONTINUED");
    expect(result.stderr).toContain("needs Node.js 20 or newer");
    expect(result.stderr).toContain("found none");
    expect(result.stderr).toContain("nodejs.org");
    expect(result.stderr).toContain("Nothing was changed.");
  });

  it("AWLR-009: stops when Node is older than 20", async () => {
    const result = await runCheck(writeStubNode("v18.20.4", 1));

    expect(result.code).toBe(1);
    expect(result.stderr).toContain("found v18.20.4");
  });

  it("AWLR-009: continues on Node 20+ (real node binary)", async () => {
    const result = await runCheck(process.execPath);

    expect(result.code).toBe(0);
    expect(result.stdout).toContain(`LOG: Node.js: ${process.version}`);
    expect(result.stdout).toContain("CONTINUED");
  });

  it("AWLR-009: the gate runs in preflight, before services stop or files are removed", () => {
    const script = renderRepairAgentWitchScript("https://www.agentwitch.com");
    const preflight = script.slice(script.indexOf("awl_repair_preflight() {"));
    const preflightBody = preflight.slice(0, preflight.indexOf("\n}\n"));

    expect(preflightBody).toContain("awl_repair_check_node");
    const main = script.slice(script.indexOf("awl_repair_main() {"));
    expect(main.indexOf("awl_repair_preflight")).toBeLessThan(
      main.indexOf("awl_repair_stop_services"),
    );
  });
});
