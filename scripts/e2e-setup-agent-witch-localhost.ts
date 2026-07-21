#!/usr/bin/env tsx
/**
 * Ensures a dedicated Agent Witch profile for localhost E2E test accounts.
 *
 * Localhost E2E uses the local app home ~/.local-agent-witch (separate from
 * production ~/.agent-witch) with ws://localhost:3000.
 *
 * Usage:
 *   npm run e2e:agent-witch:setup -- test-admin-1@agentwitch.com
 *   AGENT_WITCH_PROFILE=test-member-a-1@agentwitch.com npm run agent-witch
 */
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import os from "node:os";
import path from "node:path";

import { ensureAgentWitchProfile } from "./ensureAgentWitchProfile";
import { AGENT_WITCH_LOCAL_INSTALL_DIR_NAME } from "./resolveAgentWitchLocalLayout";

const profileEmail = process.argv[2]?.trim();

if (!profileEmail) {
  console.error(
    "Usage: npm run e2e:agent-witch:setup -- <test-email@agentwitch.com>",
  );
  process.exit(1);
}

const localInstallDir = path.join(
  os.homedir(),
  AGENT_WITCH_LOCAL_INSTALL_DIR_NAME,
);
process.env.AGENT_WITCH_HOME = localInstallDir;

const wsUrl =
  process.env.AGENT_WITCH_WS_URL?.trim() ||
  "ws://localhost:3000/api/agent-witch/ws";

const pairingToken =
  process.env.AGENT_WITCH_PAIRING_TOKEN?.trim() ||
  `e2e-${randomBytes(16).toString("hex")}`;

const profile = ensureAgentWitchProfile(profileEmail, {
  wsUrl,
  pairingToken,
  setActive: true,
});

console.log(
  JSON.stringify(
    {
      profileEmail: profile.profileEmail,
      configPath: profile.configPath,
      wsUrl: profile.wsUrl,
      launchAgentLabel: profile.launchAgentLabel,
      installDir: localInstallDir,
    },
    null,
    2,
  ),
);

const shouldStart = process.argv.includes("--start");

if (shouldStart) {
  const child = spawn("npm", ["run", "agent-witch"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      AGENT_WITCH_HOME: localInstallDir,
      AGENT_WITCH_PROFILE: profile.profileEmail,
      AGENT_WITCH_WS_URL: profile.wsUrl,
    },
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
