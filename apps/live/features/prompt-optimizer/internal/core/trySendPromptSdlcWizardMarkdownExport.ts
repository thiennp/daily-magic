import type http from "node:http";

import {
  buildPromptSdlcWizardResultMarkdown,
  isPromptSdlcTerminalStatus,
} from "../../../../adapters/promptSdlcAwcCore";

import { readPromptSdlcLocalCycle } from "./promptSdlcLocalStore";

const slugify = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 48) || "wizard-result";

export const trySendPromptSdlcWizardMarkdownExport = (input: {
  readonly method: string;
  readonly requestUrl: string;
  readonly storePath: string;
  readonly response: http.ServerResponse;
}): boolean => {
  if (input.method !== "GET") {
    return false;
  }
  const url = new URL(input.requestUrl, "http://127.0.0.1");
  if (url.searchParams.get("export") !== "wizard-markdown") {
    return false;
  }
  const cycleId = url.searchParams.get("cycle");
  if (cycleId === null || cycleId.trim().length === 0) {
    input.response.writeHead(400, {
      "content-type": "text/plain; charset=utf-8",
    });
    input.response.end("Missing cycle id.");
    return true;
  }
  const cycle = readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle === null) {
    input.response.writeHead(404, {
      "content-type": "text/plain; charset=utf-8",
    });
    input.response.end("Run not found.");
    return true;
  }
  if (cycle.wizard === undefined || !isPromptSdlcTerminalStatus(cycle.status)) {
    input.response.writeHead(400, {
      "content-type": "text/plain; charset=utf-8",
    });
    input.response.end("Wizard is not finished yet.");
    return true;
  }
  const markdown = buildPromptSdlcWizardResultMarkdown({
    goal: cycle.goal,
    cycleStatus: cycle.status,
    wizard: cycle.wizard,
  });
  const fileName = `prompt-optimizer-wizard-${slugify(cycle.goal)}.md`;
  input.response.writeHead(200, {
    "content-type": "text/markdown; charset=utf-8",
    "content-disposition": `attachment; filename="${fileName}"`,
  });
  input.response.end(markdown);
  return true;
};
