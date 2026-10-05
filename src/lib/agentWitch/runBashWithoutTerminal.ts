import { spawn, type SpawnOptions } from "node:child_process";

/**
 * Runs bash detached (new session, no controlling terminal) with stdin closed —
 * the same shape as the Finder-launched Mac app running the installer.
 */
export const runBashWithoutTerminal = (
  script: string,
  env: Record<string, string>,
  timeoutMs: number = 10_000,
): Promise<{ code: number | null; stdout: string; stderr: string }> =>
  new Promise((resolve, reject) => {
    // Explicit SpawnOptions keeps Node's overloads from collapsing under detached + stdio.
    const options: SpawnOptions = {
      env: { ...process.env, ...env },
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    };
    const child = spawn("/bin/bash", ["-c", script], options);
    const stdoutStream = child.stdout;
    const stderrStream = child.stderr;
    if (stdoutStream === null || stderrStream === null) {
      reject(new Error("expected piped stdout/stderr"));
      return;
    }
    let stdout = "";
    let stderr = "";
    stdoutStream.on("data", (chunk: Buffer) => {
      stdout += chunk.toString();
    });
    stderrStream.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("bash without terminal hung"));
    }, timeoutMs);
    child.on("error", reject);
    child.on("close", (code: number | null) => {
      clearTimeout(timer);
      resolve({ code, stdout, stderr });
    });
  });
