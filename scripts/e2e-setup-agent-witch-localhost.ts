#!/usr/bin/env tsx
/**
 * Ensures a dedicated Agent Witch profile for localhost E2E test accounts.
 *
 * Production profiles may point at wss://www.agentwitch.com; E2E profiles live
 * under ~/.agent-witch/profiles/<email>/ with ws://localhost:3000.
 *
 * Usage:
 *   npm run e2e:agent-witch:setup -- test-admin-1@agentwitch.com
 *   AGENT_WITCH_PROFILE=test-member-a-1@agentwitch.com npm run agent-witch
 */
import { spawn } from "node:child_process";

import { ensureAgentWitchProfile } from "./ensureAgentWitchProfile";

const profileEmail = process.argv[2]?.trim();

if (!profileEmail) {
  console.error(
    "Usage: npm run e2e:agent-witch:setup -- <test-email@agentwitch.com>",
  );
  process.exit(1);
}

const wsUrl =
  process.env.AGENT_WITCH_WS_URL?.trim() ||
  "ws://localhost:3000/api/agent-witch/ws";

const profile = ensureAgentWitchProfile(profileEmail, { wsUrl });

console.log(
  JSON.stringify(
    {
      profileEmail: profile.profileEmail,
      configPath: profile.configPath,
      wsUrl: profile.wsUrl,
      launchAgentLabel: profile.launchAgentLabel,
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
      AGENT_WITCH_PROFILE: profile.profileEmail,
      AGENT_WITCH_WS_URL: profile.wsUrl,
    },
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
