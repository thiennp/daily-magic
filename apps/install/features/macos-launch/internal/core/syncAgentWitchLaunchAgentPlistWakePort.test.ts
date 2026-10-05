import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { readAgentWitchLaunchAgentPlistWakePort } from "./agentWitchLaunchAgentPlistWakePortEntry";
import { buildAgentWitchLaunchAgentPlistXml } from "./buildAgentWitchLaunchAgentPlistXml";
import { syncAgentWitchLaunchAgentPlistWakePort } from "./syncAgentWitchLaunchAgentPlistWakePort";

describe.runIf(process.platform === "darwin")(
  "syncAgentWitchLaunchAgentPlistWakePort",
  () => {
    const tempDirs: string[] = [];

    afterEach(() => {
      for (const dir of tempDirs.splice(0)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });

    const setup = (port: number) => {
      const homeDir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-plist-sync-"));
      tempDirs.push(homeDir);
      const agentsDir = path.join(homeDir, "Library", "LaunchAgents");
      fs.mkdirSync(agentsDir, { recursive: true });
      const write = (label: string): string => {
        const plistPath = path.join(agentsDir, `${label}.plist`);
        const xml = buildAgentWitchLaunchAgentPlistXml({
          launchAgentLabel: label,
          runPath: "/tmp/aw/run.sh",
          installDir: "/tmp/aw",
          homeDir,
          wakePort: port,
        });
        fs.writeFileSync(plistPath, xml, "utf8");
        return plistPath;
      };
      return {
        homeDir,
        client: write("com.agent-witch"),
        wake: write("com.agent-witch-wake"),
      };
    };

    const sync = (homeDir: string, wakePort: number | null) =>
      syncAgentWitchLaunchAgentPlistWakePort({
        launchAgentPrefix: "com.agent-witch",
        wakePort,
        homeDir,
      });

    it("syncs drifted client and wake plists, skips a missing live plist, then is a noop", () => {
      const { homeDir, client, wake } = setup(61774);

      expect(sync(homeDir, 49273)).toEqual([client, wake]);
      expect(readAgentWitchLaunchAgentPlistWakePort(client)).toBe("49273");
      expect(readAgentWitchLaunchAgentPlistWakePort(wake)).toBe("49273");

      const settled = fs.readFileSync(client, "utf8");
      expect(sync(homeDir, 49273)).toEqual([]);
      expect(fs.readFileSync(client, "utf8")).toBe(settled);
    });

    it("leaves plists byte-identical when wake-port.json is missing or invalid", () => {
      const { homeDir, client } = setup(61774);
      const original = fs.readFileSync(client, "utf8");

      expect(sync(homeDir, null)).toEqual([]);
      expect(fs.readFileSync(client, "utf8")).toBe(original);
    });
  },
);
