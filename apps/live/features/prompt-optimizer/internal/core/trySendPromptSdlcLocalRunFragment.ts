import type http from "node:http";

import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { renderPromptSdlcWizardGateSlot } from "./renderPromptSdlcWizardGateSlot";
import { readPromptSdlcLocalCycle } from "./promptSdlcLocalStore";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";

export const trySendPromptSdlcLocalRunFragment = (input: {
  readonly method: string;
  readonly requestUrl: string;
  readonly storePath: string;
  readonly response: http.ServerResponse;
}): boolean => {
  if (input.method !== "GET") {
    return false;
  }
  const url = new URL(input.requestUrl, "http://127.0.0.1");
  if (url.searchParams.get("fragment") !== "run") {
    return false;
  }
  const cycleId = url.searchParams.get("cycle");
  const cycle =
    cycleId === null
      ? null
      : readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle !== null) {
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycle.id);
  }
  input.response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store",
  });
  input.response.end(
    cycle === null
      ? ""
      : `${renderPromptSdlcWizardGateSlot(cycle)}${buildPromptSdlcLocalCycleSection(cycle)}`,
  );
  return true;
};
