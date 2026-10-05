import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import {
  readAgentWitchLaunchAgentPlistWakePort,
  writeAgentWitchLaunchAgentPlistWakePort,
} from "./agentWitchLaunchAgentPlistWakePortEntry";
import { buildAgentWitchLaunchAgentPlistXml } from "./buildAgentWitchLaunchAgentPlistXml";

const toJson = (plistPath: string): Record<string, unknown> =>
  JSON.parse(
    execFileSync("plutil", ["-convert", "json", "-o", "-", plistPath], {
      encoding: "utf8",
    }),
  ) as Record<string, unknown>;

describe.runIf(process.platform === "darwin")(
  "agentWitchLaunchAgentPlistWakePortEntry (plutil, temp plist)",
  () => {
    const tempDirs: string[] = [];

    afterEach(() => {
      for (const dir of tempDirs.splice(0)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });

    const writeTempPlist = (wakePort: number): string => {
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-plist-entry-"));
      tempDirs.push(dir);
      const plistPath = path.join(dir, "com.agent-witch.plist");
      const xml = buildAgentWitchLaunchAgentPlistXml({
        launchAgentLabel: "com.agent-witch",
        runPath: "/tmp/aw/run.sh",
        installDir: "/tmp/aw",
        homeDir: "/tmp/home",
        wakePort,
      });
      fs.writeFileSync(plistPath, xml, { encoding: "utf8", mode: 0o600 });
      return plistPath;
    };

    it("reads AGENT_WITCH_WAKE_PORT and returns null for a plist without it", () => {
      const plistPath = writeTempPlist(61774);
      expect(readAgentWitchLaunchAgentPlistWakePort(plistPath)).toBe("61774");

      fs.writeFileSync(plistPath, "<plist><dict/></plist>\n", "utf8");
      expect(readAgentWitchLaunchAgentPlistWakePort(plistPath)).toBeNull();
      expect(
        readAgentWitchLaunchAgentPlistWakePort(`${plistPath}.missing`),
      ).toBeNull();
    });

    it("rewrites only the wake port, keeps mode and leaves no temp file", () => {
      const plistPath = writeTempPlist(61774);
      const before = toJson(plistPath);

      writeAgentWitchLaunchAgentPlistWakePort(plistPath, 49273);

      const after = toJson(plistPath);
      const beforeEnv = before.EnvironmentVariables as Record<string, unknown>;
      expect(after).toEqual({
        ...before,
        EnvironmentVariables: { ...beforeEnv, AGENT_WITCH_WAKE_PORT: "49273" },
      });
      expect(fs.statSync(plistPath).mode & 0o777).toBe(0o600);
      expect(fs.readdirSync(path.dirname(plistPath))).toEqual([
        "com.agent-witch.plist",
      ]);
    });
  },
);
