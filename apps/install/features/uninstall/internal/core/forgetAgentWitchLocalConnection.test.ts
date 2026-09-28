import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { forgetAgentWitchLocalConnection } from "./forgetAgentWitchLocalConnection";

const tempDirs: string[] = [];

const makeTempDir = (): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aw-forget-"));
  tempDirs.push(dir);
  return dir;
};

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe("forgetAgentWitchLocalConnection", () => {
  it("removes connection files, app code, and launch agents, and keeps data", async () => {
    const installDir = makeTempDir();
    const profileDir = path.join(installDir, "profiles", "user@agentwitch.com");
    const appDir = path.join(installDir, "app");
    const launchAgentsDir = makeTempDir();
    const booted: string[] = [];

    fs.mkdirSync(path.join(profileDir, "projects", "default"), {
      recursive: true,
    });
    fs.mkdirSync(path.join(profileDir, "harness"), { recursive: true });
    fs.mkdirSync(path.join(profileDir, "reports"), { recursive: true });
    fs.mkdirSync(path.join(profileDir, "runs"), { recursive: true });
    fs.mkdirSync(path.join(installDir, "rag"), { recursive: true });
    fs.mkdirSync(path.join(installDir, "ollama", "bin"), { recursive: true });
    fs.mkdirSync(appDir, { recursive: true });

    fs.writeFileSync(path.join(appDir, "agent-witch.js"), "code");
    fs.writeFileSync(path.join(profileDir, "config.json"), "{}");
    fs.writeFileSync(path.join(profileDir, "device-keypair.json"), "{}");
    fs.writeFileSync(path.join(profileDir, "connection-health.json"), "{}");
    fs.writeFileSync(path.join(profileDir, "pending-run-inputs.json"), "[]");
    fs.writeFileSync(path.join(profileDir, "run-completion-outbox.json"), "[]");
    fs.writeFileSync(
      path.join(profileDir, "projects", "default", "keep.txt"),
      "keep",
    );
    fs.writeFileSync(path.join(profileDir, "harness", "keep.json"), "{}");
    fs.writeFileSync(path.join(profileDir, "reports", "r.json"), "{}");
    fs.writeFileSync(path.join(profileDir, "runs", "run.json"), "{}");
    fs.writeFileSync(path.join(profileDir, "automations.json"), "{}");
    fs.writeFileSync(path.join(installDir, "rag", "keep.txt"), "rag");
    fs.writeFileSync(path.join(installDir, "ollama", "bin", "ollama"), "bin");
    fs.writeFileSync(path.join(installDir, "active-profile.json"), "{}");
    fs.writeFileSync(path.join(installDir, "install-version.json"), "{}");
    fs.writeFileSync(path.join(installDir, "wake-port.json"), "{}");
    fs.writeFileSync(path.join(installDir, "link-code.txt"), "code");
    fs.writeFileSync(
      path.join(installDir, "watchdog-reinstall-state.json"),
      "{}",
    );
    fs.writeFileSync(
      path.join(launchAgentsDir, "com.agent-witch-wake.plist"),
      "<plist/>",
    );

    const result = await forgetAgentWitchLocalConnection({
      layout: {
        installDir,
        appDir,
        configPath: path.join(profileDir, "config.json"),
      },
      listLaunchAgentLabels: () => ["com.agent-witch-wake"],
      launchAgentsDir,
      bootoutLaunchAgent: async (label) => {
        booted.push(label);
      },
    });

    expect(result.removedLaunchAgentLabels).toEqual(["com.agent-witch-wake"]);
    expect(booted).toEqual(["com.agent-witch-wake"]);
    expect(
      fs.existsSync(path.join(launchAgentsDir, "com.agent-witch-wake.plist")),
    ).toBe(false);
    expect(fs.existsSync(appDir)).toBe(false);
    expect(fs.existsSync(path.join(profileDir, "config.json"))).toBe(false);
    expect(fs.existsSync(path.join(profileDir, "device-keypair.json"))).toBe(
      false,
    );
    expect(fs.existsSync(path.join(installDir, "active-profile.json"))).toBe(
      false,
    );
    expect(fs.existsSync(path.join(installDir, "install-version.json"))).toBe(
      false,
    );
    expect(
      fs.readFileSync(
        path.join(profileDir, "projects", "default", "keep.txt"),
        "utf8",
      ),
    ).toBe("keep");
    expect(fs.existsSync(path.join(profileDir, "harness", "keep.json"))).toBe(
      true,
    );
    expect(fs.existsSync(path.join(profileDir, "reports", "r.json"))).toBe(
      true,
    );
    expect(fs.existsSync(path.join(profileDir, "runs", "run.json"))).toBe(true);
    expect(fs.existsSync(path.join(profileDir, "automations.json"))).toBe(true);
    expect(fs.existsSync(path.join(installDir, "rag", "keep.txt"))).toBe(true);
    expect(
      fs.existsSync(path.join(installDir, "ollama", "bin", "ollama")),
    ).toBe(true);
  });
});
