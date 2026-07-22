import { spawn } from "node:child_process";
import { createServer } from "node:net";

import { runShippedAgentWitchInstallBlackbox } from "@/lib/agentWitch/runShippedAgentWitchInstallBlackbox";

const allocatePort = async (): Promise<number> =>
  new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (address === null || typeof address === "string") {
        reject(new Error("Could not allocate a free port"));
        return;
      }

      const { port } = address;
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
          return;
        }

        resolve(port);
      });
    });
  });

const waitForReady = async (baseUrl: string): Promise<void> => {
  const deadline = Date.now() + 180_000;

  while (Date.now() < deadline) {
    try {
      const [healthResponse, versionResponse] = await Promise.all([
        fetch(`${baseUrl}/api/health`),
        fetch(`${baseUrl}/install/agent-witch/version`),
      ]);

      if (healthResponse.ok && versionResponse.ok) {
        return;
      }
    } catch {
      // Server is still starting.
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1_000);
    });
  }

  throw new Error(
    `Timed out waiting for ${baseUrl} install endpoints to become ready`,
  );
};

const main = async (): Promise<void> => {
  const port = String(
    process.env.AGENT_WITCH_SHIPPED_INSTALL_PORT ?? (await allocatePort()),
  );
  const baseUrl = `http://127.0.0.1:${port}`;

  const server = spawn("npm", ["run", "start"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      PORT: port,
      HOST: "127.0.0.1",
      NODE_ENV: "production",
    },
    stdio: "inherit",
  });

  const shutdown = (): void => {
    if (!server.killed) {
      server.kill("SIGTERM");
    }
  };

  process.on("exit", shutdown);
  process.on("SIGINT", () => {
    shutdown();
    process.exit(1);
  });
  process.on("SIGTERM", () => {
    shutdown();
    process.exit(1);
  });

  try {
    await waitForReady(baseUrl);
    const result = await runShippedAgentWitchInstallBlackbox(baseUrl);
    process.stdout.write(
      `[shipped-install-blackbox] bundle ${result.bundleVersion} ok (${result.downloadedScriptCount} scripts)\n`,
    );
  } finally {
    shutdown();
  }
};

void main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`[shipped-install-blackbox] ${message}\n`);
  process.exit(1);
});
