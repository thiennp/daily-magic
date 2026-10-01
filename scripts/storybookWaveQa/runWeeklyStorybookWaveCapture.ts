/**
 * Weekly job: serve storybook-static and capture all page waves into STORYBOOK_WAVE_OUTPUT_DIR.
 */
import { spawn } from "node:child_process";
import net from "node:net";

const PORT = 6008;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const waitForPort = (port: number, timeoutMs: number): Promise<void> =>
  new Promise((resolve, reject) => {
    const started = Date.now();
    const tryConnect = (): void => {
      const socket = net.connect(port, "127.0.0.1", () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        if (Date.now() - started > timeoutMs) {
          reject(new Error(`Port ${port} not ready within ${timeoutMs}ms`));
          return;
        }
        setTimeout(tryConnect, 500);
      });
    };
    tryConnect();
  });

const run = (
  command: string,
  args: readonly string[],
  env?: Record<string, string>,
): Promise<void> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      env: { ...process.env, ...env },
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} exited ${code ?? "unknown"}`));
      }
    });
  });

const main = async (): Promise<void> => {
  const outputDir =
    process.env.STORYBOOK_WAVE_OUTPUT_DIR?.trim() || "storybook-wave-captures";
  const serve = spawn(
    "npx",
    ["--yes", "serve", "storybook-static", "-l", String(PORT)],
    { stdio: "ignore" },
  );

  try {
    await waitForPort(PORT, 60_000);
    await run(
      "npx",
      ["tsx", "scripts/storybookWaveQa/captureAllStorybookPageWaves.ts"],
      {
        STORYBOOK_BASE_URL: BASE_URL,
        STORYBOOK_WAVE_OUTPUT_DIR: outputDir,
      },
    );
  } finally {
    serve.kill("SIGTERM");
  }
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
