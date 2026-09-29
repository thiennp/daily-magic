import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { startAgentWitchLocalApp } from "../../../apps/live/features/local-server/internal/core/startAgentWitchLocalApp";

const installDir =
  process.env.AWL_INSTALL_DIR?.trim() ||
  fs.mkdtempSync(path.join(os.tmpdir(), "awl-linux-smoke-"));

for (const sub of ["logs", "harness/sets", "projects", "app"]) {
  fs.mkdirSync(path.join(installDir, sub), { recursive: true });
}

const bundle = path.join(
  process.cwd(),
  "public/install/agent-witch/app/agent-witch.js",
);
if (fs.existsSync(bundle)) {
  fs.copyFileSync(bundle, path.join(installDir, "app/agent-witch.js"));
}

const configPath = path.join(installDir, "config.json");
if (!fs.existsSync(configPath)) {
  fs.writeFileSync(
    configPath,
    JSON.stringify({ appOrigin: "http://localhost:3000" }),
    "utf8",
  );
}

const layout: AgentWitchLocalLayout = {
  installDir,
  appDir: path.join(installDir, "app"),
  appBundlePath: path.join(installDir, "app", "agent-witch.js"),
  profileEmail: null,
  configPath,
  harnessRootDir: path.join(installDir, "harness"),
  harnessManifestPath: path.join(installDir, "harness", "manifest.json"),
  harnessSetsDir: path.join(installDir, "harness", "sets"),
  projectsDir: path.join(installDir, "projects"),
  logsDir: path.join(installDir, "logs"),
  reportsDir: path.join(installDir, "reports"),
  deviceKeypairPath: path.join(installDir, "device-keypair.json"),
  mainLogPath: path.join(installDir, "logs", "agent-witch.log"),
  errorLogPath: path.join(installDir, "logs", "agent-witch.error.log"),
};

const server = startAgentWitchLocalApp({
  layout,
  controllers: {
    getStatus: () => ({
      connected: false,
      lastHeartbeatAt: null,
    }),
    reviveWebSocket: () => undefined,
  },
});

const port = Number(process.env.AWL_PORT ?? "43347");
server.listen(port, "127.0.0.1", () => {
  console.log(
    `AWL smoke server http://127.0.0.1:${port} install=${installDir}`,
  );
});
