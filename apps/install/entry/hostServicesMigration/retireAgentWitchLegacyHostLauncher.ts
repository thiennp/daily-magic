import { execFile } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import {
  resolveAgentWitchInstallDir,
  resolveAgentWitchLaunchAgentPrefix,
} from "@agent-witch/install-layout";
import {
  buildHostSideEffectRefusalMessage,
  isHostSideEffectAllowed,
} from "@agent-witch/shared/host-side-effects";

const execFileAsync = promisify(execFile);

/** No-op LaunchAgent: never RunAtLoad / KeepAlive, never touches account hosts. */
export const buildAgentWitchLegacyLauncherNoopPlistXml = (
  launchAgentLabel: string,
): string => `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>${launchAgentLabel}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/true</string>
  </array>
  <key>RunAtLoad</key>
  <false/>
  <key>KeepAlive</key>
  <false/>
</dict>
</plist>
`;

export interface RetireAgentWitchLegacyHostLauncherDeps {
  readonly launchctl: (args: readonly string[]) => Promise<void>;
  readonly writePlist: (plistPath: string, xml: string) => void;
  readonly plistExists: (plistPath: string) => boolean;
  /** Synchronous log line (launchd StandardOutPath is a file). */
  readonly log: (line: string) => void;
}

const defaultDeps: RetireAgentWitchLegacyHostLauncherDeps = {
  launchctl: async (args) => {
    await execFileAsync("launchctl", [...args]);
  },
  writePlist: (plistPath, xml) => {
    fs.mkdirSync(path.dirname(plistPath), { recursive: true });
    const tmp = `${plistPath}.${String(process.pid)}.tmp`;
    fs.writeFileSync(tmp, xml, "utf8");
    fs.renameSync(tmp, plistPath);
  },
  plistExists: (plistPath) => fs.existsSync(plistPath),
  log: (line) => {
    console.log(line);
  },
};

/**
 * After per-account migration: rewrite the legacy `com.agent-witch` plist as a
 * strict no-op (RunAtLoad/KeepAlive off) and bootout the loaded job, so login
 * or old AWL cannot keep a KeepAlive launcher around (dd5c338d / d5e39215).
 * Not `launchctl disable`: the install script must still be able to bootstrap
 * the label. Called by the launcher itself, so the bootout usually SIGTERMs
 * the caller (its handler exits without touching account hosts), so the
 * message is logged BEFORE the bootout or it never reaches the log (eb0fcdf9).
 */
export const retireAgentWitchLegacyHostLauncher = async (input: {
  readonly installDir?: string;
  readonly homeDir?: string;
  readonly platform?: NodeJS.Platform;
  readonly uid?: number;
  readonly deps?: Partial<RetireAgentWitchLegacyHostLauncherDeps>;
}): Promise<{
  readonly ok: boolean;
  readonly retired: boolean;
  readonly message: string;
}> => {
  const platform = input.platform ?? process.platform;
  if (platform !== "darwin") {
    return {
      ok: true,
      retired: false,
      message: "Legacy LaunchAgent retirement is macOS-only.",
    };
  }
  const deps = { ...defaultDeps, ...input.deps };
  if (input.deps === undefined && !isHostSideEffectAllowed()) {
    return {
      ok: false,
      retired: false,
      message: buildHostSideEffectRefusalMessage("retire legacy launcher"),
    };
  }
  const installDir = input.installDir ?? resolveAgentWitchInstallDir();
  const homeDir = input.homeDir ?? os.homedir();
  const label = resolveAgentWitchLaunchAgentPrefix(installDir);
  const plistPath = path.join(
    homeDir,
    "Library",
    "LaunchAgents",
    `${label}.plist`,
  );
  const uid = input.uid ?? process.getuid?.() ?? 0;
  const domain = `gui/${String(uid)}`;
  const target = `${domain}/${label}`;

  deps.writePlist(plistPath, buildAgentWitchLegacyLauncherNoopPlistXml(label));

  const retired = deps.plistExists(plistPath);
  const message = `Legacy ${label} LaunchAgent is now a no-op; unloading it (account hosts keep running).`;
  deps.log(`[agent-witch] ${message}`);
  try {
    await deps.launchctl(["bootout", target]);
  } catch {
    // Not loaded (e.g. launcher started by nohup run.sh) is fine.
  }
  return { ok: true, retired, message };
};
