import { spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";

import { renderRepairAgentWitchScript } from "@/lib/agentWitch/repair/renderRepairAgentWitchScript";
import { renderUpdateAgentWitchScript } from "@/lib/agentWitch/renderUpdateAgentWitchScript";

const script = renderRepairAgentWitchScript("https://www.agentwitch.com");

describe("renderRepairAgentWitchScript", () => {
  it("AWLR-003: is valid bash with strict mode and a non-bash guard", () => {
    const result = spawnSync("bash", ["-n"], {
      input: script,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(script.startsWith("#!/usr/bin/env bash\n")).toBe(true);
    expect(script).toContain("set -euo pipefail");
    expect(script).toContain('if [ -z "${BASH_VERSION:-}" ]; then');
    expect(script.trimEnd().endsWith('awl_repair_main "$@"')).toBe(true);
  });

  it("AWLR-003: wraps the shipped update installer instead of forking it", () => {
    expect(script).toContain(
      'AWL_REPAIR_ORIGIN="${AWL_REPAIR_ORIGIN:-https://www.agentwitch.com}"',
    );
    expect(script).toContain("awl_repair_write_installer() {");
    expect(script).toContain("<<'AWL_REPAIR_UPDATE_INSTALLER_EOF'");
    expect(script).toContain(
      renderUpdateAgentWitchScript("https://www.agentwitch.com"),
    );
    expect(script).toContain('bash "${installer}" </dev/null');
    expect(script).toContain('INSTALL_DIR="${HOME}/.agent-witch"');
    expect(script).toContain('LAUNCH_AGENT_PREFIX="com.agent-witch"');
    expect(script).toContain(
      'AWL_REPAIR_LEGACY_HEALTH_URL="http://127.0.0.1:43347/health"',
    );
  });

  it("AWLR-004: removes only allowlisted direct children of the install dir", () => {
    expect(script).toContain('AWL_REPAIR_REMOVABLE="app node_modules');
    expect(script).toContain('[[ "${target}" == "${INSTALL_DIR}/"* ]]');
    expect(script).toContain(
      '""|"/"|"${HOME}"|"${HOME}/"|"${INSTALL_DIR}"|"${INSTALL_DIR}/")',
    );
    expect(script).not.toMatch(/rm -rf (--\s+)?"\$\{(INSTALL_DIR|HOME)\}"/);
    expect(script).not.toMatch(/profiles\/\*\/(projects|runs|reports|harness)/);
  });

  it("AWLR-005: reports identity by fingerprint and never prints secret files", () => {
    expect(script).toContain("awl_repair_fingerprint");
    expect(script).not.toMatch(
      /\bcat\s+"?\$\{?[A-Za-z_]*\}?[^\n]*(config|keypair|secrets)/,
    );
    expect(script).not.toMatch(/echo[^\n]*pairingToken\}/);
    expect(script).toContain("its body also carries a link code");
  });

  it("AWLR-006: offers test flags and a no-op when already healthy", () => {
    expect(script).toContain('AWL_REPAIR_NO_START="${AWL_REPAIR_NO_START:-0}"');
    expect(script).toContain('AWL_REPAIR_FORCE="${AWL_REPAIR_FORCE:-0}"');
    expect(script).toContain('AWL_REPAIR_RESULT="already healthy"');
  });

  it("AWLR-003: uses the localhost install home for a localhost origin", () => {
    const local = renderRepairAgentWitchScript("http://localhost:3000/");

    expect(local).toContain('INSTALL_DIR="${HOME}/.local-agent-witch"');
    expect(local).toContain('LAUNCH_AGENT_PREFIX="com.local-agent-witch"');
  });
});
