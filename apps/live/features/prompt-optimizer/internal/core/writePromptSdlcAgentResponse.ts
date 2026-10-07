import {
  ensurePromptSdlcLocalCycleRunning,
  readPromptSdlcInstalledWriters,
} from "./runPromptSdlcLocalCycle";
import { readPromptSdlcChosenWritersReady } from "./probePromptSdlcWriterReady";
import { resolvePromptSdlcAgentUrlForRequest } from "./resolvePromptSdlcAgentUrlForRequest";
import { servePromptSdlcAgent } from "./servePromptSdlcAgent";
import type { PromptSdlcLocalRouteInput } from "./tryHandlePromptSdlcLocalRequest";

export const writePromptSdlcAgentResponse = async (
  input: PromptSdlcLocalRouteInput,
): Promise<void> => {
  const result = await servePromptSdlcAgent({
    method: input.method,
    requestUrl: input.requestUrl,
    rawBody: input.method === "POST" ? await input.readBody(input.request) : "",
    storePath: input.storePath,
    agentUrl: resolvePromptSdlcAgentUrlForRequest(input.request),
    handlers: {
      readInstalledIds: readPromptSdlcInstalledWriters,
      readWritersReady: readPromptSdlcChosenWritersReady,
      startCycle: ensurePromptSdlcLocalCycleRunning,
    },
  });
  input.response.writeHead(result.status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  input.response.end(JSON.stringify(result.body));
};
