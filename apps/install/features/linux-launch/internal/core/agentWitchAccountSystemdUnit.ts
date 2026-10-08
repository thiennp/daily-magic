import fs from "node:fs";
import path from "node:path";

import {
  AGENT_WITCH_HOST_ACCOUNT_ENV,
  readAgentWitchWakePortFromFile,
  resolveAgentWitchAccountProfileDir,
} from "@agent-witch/install-layout";
import {
  AWI_BUNDLED_COMMAND_DIR,
  type AgentWitchHostServiceAccount,
} from "@agent-witch/install-layout/types";

export const resolveAgentWitchSystemdUserUnitDir = (homeDir: string): string =>
  path.join(homeDir, ".config", "systemd", "user");

/** systemd user unit for one account host (AWL-ISO-1). */
export const buildAgentWitchAccountSystemdUnit = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly account: AgentWitchHostServiceAccount;
}): string => {
  const wakePort =
    readAgentWitchWakePortFromFile(
      resolveAgentWitchAccountProfileDir(input.installDir, input.account.email),
    ) ?? input.account.wakePort;
  const runPath = path.join(
    input.installDir,
    AWI_BUNDLED_COMMAND_DIR,
    "run.sh",
  );
  return `[Unit]
Description=AgentWitch client (${input.account.email})
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
WorkingDirectory=${input.installDir}
Environment=HOME=${input.homeDir}
Environment=AGENT_WITCH_HOME=${input.installDir}
Environment=AGENT_WITCH_WAKE_PORT=${String(wakePort)}
Environment=${AGENT_WITCH_HOST_ACCOUNT_ENV}=${input.account.email}
Environment=AGENT_WITCH_PROFILE=${input.account.email}
ExecStart=${runPath}
Restart=on-failure
RestartSec=10

[Install]
WantedBy=default.target
`;
};

/** Writes `~/.config/systemd/user/<account unit>`; only rewrites when the content differs. */
export const writeAgentWitchAccountSystemdUnit = (input: {
  readonly installDir: string;
  readonly homeDir: string;
  readonly account: AgentWitchHostServiceAccount;
}): { readonly unitPath: string; readonly changed: boolean } => {
  const unitPath = path.join(
    resolveAgentWitchSystemdUserUnitDir(input.homeDir),
    input.account.systemdUnitName,
  );
  const content = buildAgentWitchAccountSystemdUnit(input);
  const existing = fs.existsSync(unitPath)
    ? fs.readFileSync(unitPath, "utf8")
    : null;
  if (existing === content) {
    return { unitPath, changed: false };
  }
  fs.mkdirSync(path.dirname(unitPath), { recursive: true });
  fs.writeFileSync(unitPath, content, "utf8");
  return { unitPath, changed: true };
};
