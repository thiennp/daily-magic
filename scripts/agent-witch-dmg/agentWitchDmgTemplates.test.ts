import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const dmgRoot = join(process.cwd(), "scripts", "agent-witch-dmg");

describe("agent-witch-dmg templates", () => {
  it("bakes origin placeholder into the installer executable template", () => {
    const template = readFileSync(
      join(dmgRoot, "MacOS", "install-agent-witch.template"),
      "utf8",
    );
    expect(template).toContain('ORIGIN="__AGENT_WITCH_ORIGIN__"');
    expect(template).toContain(
      'INSTALL_DIR_NAME="__AGENT_WITCH_INSTALL_DIR_NAME__"',
    );
    expect(template).toContain("/install/agent-witch.sh");
    expect(template).toContain("self-update.sh");
    expect(template).toContain('"Update"');
    expect(template).toContain("/bin/zsh -lc");
  });

  it("declares a non-UI-element app bundle in Info.plist", () => {
    const plist = readFileSync(join(dmgRoot, "Info.plist.template"), "utf8");
    expect(plist).toContain("com.agentwitch.installer");
    expect(plist).toContain("install-agent-witch");
    expect(plist).toContain("__BUNDLE_VERSION__");
  });
});
