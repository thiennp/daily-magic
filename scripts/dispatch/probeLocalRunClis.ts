import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { AGENT_WITCH_OLLAMA_ESTIMATE_MODEL } from "@agent-witch/install-self-update";

import {
  buildWriterSessionStartInvocation,
  isHarnessWriterAgentId,
  type HarnessWriterAgentId,
  type WriterCliCommands,
} from "../buildWriterCliInvocation";
import {
  parseOllamaListModelNames,
  selectInstalledOllamaEstimateModel,
} from "./selectInstalledOllamaEstimateModel";

const CLI_PROBE_TIMEOUT_MS = 3_000;

const WRITER_IDS: readonly HarnessWriterAgentId[] = [
  "claude-cli",
  "codex",
  "cursor",
  "antigravity",
];

const WRITER_LABELS: Record<HarnessWriterAgentId, string> = {
  "claude-cli": "Claude CLI",
  codex: "Codex CLI",
  cursor: "Cursor agent CLI",
  antigravity: "Antigravity CLI",
};

export type LocalRunCliProbe = {
  readonly ollamaModels: readonly string[];
  readonly estimateModel: string | null;
  readonly installedWriterIds: readonly HarnessWriterAgentId[];
  readonly capabilityNote: string;
};

const spawnForExit = (
  command: string,
  args: readonly string[],
): Promise<boolean> =>
  new Promise((resolve) => {
    const child = spawn(command, [...args], {
      stdio: "ignore",
    });
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve(false);
    }, CLI_PROBE_TIMEOUT_MS);
    child.on("error", () => {
      clearTimeout(timer);
      resolve(false);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve(code === 0);
    });
  });

const ollamaCommandCandidates = (): readonly string[] => {
  const home = os.homedir();
  return [
    "ollama",
    path.join(home, ".local", "bin", "ollama"),
    path.join(home, ".agent-witch", "ollama", "ollama"),
    path.join(home, ".local-agent-witch", "ollama", "ollama"),
  ];
};

const readOllamaListFrom = (
  command: string,
): Promise<readonly string[] | null> =>
  new Promise((resolve) => {
    const child = spawn(command, ["list"], {
      stdio: ["ignore", "pipe", "ignore"],
    });
    const chunks: Buffer[] = [];
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve(null);
    }, CLI_PROBE_TIMEOUT_MS);
    child.stdout.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });
    child.on("error", () => {
      clearTimeout(timer);
      resolve(null);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        resolve(null);
        return;
      }
      resolve(
        parseOllamaListModelNames(Buffer.concat(chunks).toString("utf8")),
      );
    });
  });

const readOllamaList = async (): Promise<readonly string[]> => {
  for (const command of ollamaCommandCandidates()) {
    if (command !== "ollama" && !fs.existsSync(command)) {
      continue;
    }
    const names = await readOllamaListFrom(command);
    if (names !== null) {
      return names;
    }
  }
  return [];
};

export const describeLocalRunCliProbe = (input: {
  readonly writerAgent: string;
  readonly installedWriterIds: readonly HarnessWriterAgentId[];
  readonly estimateModel: string | null;
}): string => {
  const installedLabels = input.installedWriterIds.map(
    (writerId) => WRITER_LABELS[writerId],
  );
  const writerSentence =
    installedLabels.length === 0
      ? "No writer CLI is installed."
      : `Writer CLIs installed: ${installedLabels.join(", ")}.`;
  const selectedSentence =
    isHarnessWriterAgentId(input.writerAgent) &&
    !input.installedWriterIds.includes(input.writerAgent)
      ? `Selected writer ${WRITER_LABELS[input.writerAgent]} is not installed.`
      : "";
  const modelSentence =
    input.estimateModel === null
      ? "No local chat model is installed."
      : `Local estimate model: ${input.estimateModel}.`;
  return [selectedSentence, writerSentence, modelSentence]
    .filter((sentence) => sentence.length > 0)
    .join(" ");
};

const readRequestedEstimateModel = (): string | null => {
  const requested = process.env.AGENT_WITCH_ESTIMATE_MODEL?.trim() ?? "";
  return requested.length > 0 ? requested : AGENT_WITCH_OLLAMA_ESTIMATE_MODEL;
};

/** `ollama list` plus writer version checks. Does not pull a model or install a CLI. */
export const probeLocalRunClis = async (input: {
  readonly commands: WriterCliCommands;
  readonly writerAgent?: string;
}): Promise<LocalRunCliProbe> => {
  const writerChecks = WRITER_IDS.map((writerId) => {
    const invocation = buildWriterSessionStartInvocation(
      writerId,
      input.commands,
    );
    return spawnForExit(invocation.command, invocation.args);
  });
  const [ollamaModels, ...writerReady] = await Promise.all([
    readOllamaList(),
    ...writerChecks,
  ]);
  const installedWriterIds = WRITER_IDS.flatMap((writerId, index) =>
    writerReady[index] === true ? [writerId] : [],
  );
  const estimateModel = selectInstalledOllamaEstimateModel(
    ollamaModels,
    readRequestedEstimateModel(),
  );
  return {
    ollamaModels,
    estimateModel,
    installedWriterIds,
    capabilityNote: describeLocalRunCliProbe({
      writerAgent: input.writerAgent ?? "",
      installedWriterIds,
      estimateModel,
    }),
  };
};
