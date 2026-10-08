import { spawn } from "node:child_process";

export const SCRIPT_OUTPUT_CAP_BYTES = 64 * 1024;
const PROXY_ENV = /^(https?_proxy|all_proxy|ftp_proxy|no_proxy)$/i;
const BASE_ENV = ["PATH", "HOME", "USER", "LANG", "LC_ALL", "TMPDIR", "TERM"];

export type ScriptRunResult = {
  readonly ok: boolean;
  readonly exitCode: number | null;
  readonly stdout: string;
  readonly stderr: string;
  readonly timedOut: boolean;
  readonly truncated: boolean;
};

/** Minimal env: no inherited secrets; proxies only for declared-network scripts. */
export const buildScriptEnv = (
  source: NodeJS.ProcessEnv,
  network: boolean,
  folder: string,
): Record<string, string> => {
  const env: Record<string, string> = { AGENT_WITCH_PROJECT_DIR: folder };
  for (const [key, value] of Object.entries(source)) {
    if (
      value !== undefined &&
      (BASE_ENV.includes(key) || (network && PROXY_ENV.test(key)))
    ) {
      env[key] = value;
    }
  }
  return env;
};

export const resolveScriptInterpreter = (
  file: string,
): { readonly command: string; readonly lead: readonly string[] } =>
  file.endsWith(".sh")
    ? { command: "/bin/sh", lead: [file] }
    : { command: "node", lead: [file] };

/** Spawn with an argv array (never a shell string), capped output, hard timeout. */
export const runSkillScript = (input: {
  readonly file: string;
  readonly argv: readonly string[];
  readonly cwd: string;
  readonly env: Record<string, string>;
  readonly timeoutMs: number;
}): Promise<ScriptRunResult> =>
  new Promise((resolve) => {
    const { command, lead } = resolveScriptInterpreter(input.file);
    const out = { stdout: "", stderr: "", truncated: false };
    let timedOut = false;
    const child = spawn(command, [...lead, ...input.argv], {
      cwd: input.cwd,
      env: input.env as NodeJS.ProcessEnv,
      stdio: ["ignore", "pipe", "pipe"],
      shell: false,
    });
    const collect = (key: "stdout" | "stderr") => (chunk: Buffer) => {
      const room = SCRIPT_OUTPUT_CAP_BYTES - out[key].length;
      if (chunk.length > room) {
        out.truncated = true;
      }
      out[key] += chunk.subarray(0, Math.max(0, room)).toString("utf8");
    };
    child.stdout.on("data", collect("stdout"));
    child.stderr.on("data", collect("stderr"));
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, input.timeoutMs);
    const finish = (exitCode: number | null): void => {
      clearTimeout(timer);
      resolve({
        ok: exitCode === 0 && !timedOut,
        exitCode,
        ...out,
        timedOut,
      });
    };
    child.on("error", () => finish(null));
    child.on("close", finish);
  });
