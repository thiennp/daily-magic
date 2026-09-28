import { spawn } from "node:child_process";

import { resolveAgentWitchInstallDir } from "@agent-witch/install-layout";

import { buildAgentWitchEnsureOllamaShell } from "./buildAgentWitchEnsureOllamaShell";

export type AgentWitchOllamaEnsureResult = {
  readonly ok: boolean;
  readonly message: string;
};

export type AgentWitchOllamaShellRunner = (
  script: string,
) => Promise<{ readonly exitCode: number; readonly output: string }>;

const runOllamaEnsureShell: AgentWitchOllamaShellRunner = (script) =>
  new Promise((resolve) => {
    const child = spawn("bash", ["-c", script], {
      env: {
        ...process.env,
        AGENT_WITCH_HOME: resolveAgentWitchInstallDir(),
      },
    });
    const chunks: Buffer[] = [];
    child.stdout.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    child.on("error", (error: Error) => {
      resolve({ exitCode: 1, output: error.message });
    });
    child.on("close", (code) => {
      resolve({
        exitCode: code ?? 1,
        output: Buffer.concat(chunks).toString("utf8").trim(),
      });
    });
  });

export const ensureAgentWitchOllamaInstalled = async (
  runShell: AgentWitchOllamaShellRunner = runOllamaEnsureShell,
): Promise<AgentWitchOllamaEnsureResult> => {
  const script = `${buildAgentWitchEnsureOllamaShell()}\nagent_witch_ensure_ollama\n`;
  const result = await runShell(script);
  if (result.exitCode === 0) {
    return {
      ok: true,
      message: result.output.length > 0 ? result.output : "Ollama is ready.",
    };
  }

  return {
    ok: false,
    message:
      result.output.length > 0 ? result.output : "Could not install Ollama.",
  };
};
