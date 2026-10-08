import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { ensureAgentWitchRunScript } from "./ensureAgentWitchRunScript";
import { buildAgentWitchRunScript } from "./buildAgentWitchRunScript";

describe("ensureAgentWitchRunScript", () => {
  it("reports current:false when command/ is missing", () => {
    const tmp = join(__dirname, ".tmp-ensure-missing");
    rmSync(tmp, { recursive: true, force: true });
    mkdirSync(tmp, { recursive: true });
    try {
      expect(ensureAgentWitchRunScript(tmp)).toEqual({
        runPath: join(tmp, "app/command/run.sh"),
        changed: false,
        current: false,
      });
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("repairs a baked-in PROFILE_EMAIL run.sh and reports current:true", () => {
    const tmp = join(__dirname, ".tmp-ensure-repair");
    rmSync(tmp, { recursive: true, force: true });
    const commandDir = join(tmp, "app/command");
    mkdirSync(commandDir, { recursive: true });
    writeFileSync(
      join(commandDir, "run.sh"),
      "#!/bin/bash\nPROFILE_EMAIL=\"agt@example.com\"\n",
      "utf8",
    );
    try {
      const first = ensureAgentWitchRunScript(tmp);
      expect(first.changed).toBe(true);
      expect(first.current).toBe(true);
      expect(first.runPath).toBe(join(commandDir, "run.sh"));
      const second = ensureAgentWitchRunScript(tmp);
      expect(second).toEqual({
        runPath: first.runPath,
        changed: false,
        current: true,
      });
      expect(buildAgentWitchRunScript()).toContain("AGENT_WITCH_HOST_ACCOUNT");
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });
});
