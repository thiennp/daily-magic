import type http from "node:http";

import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import { readPromptSdlcWriterReady } from "./probePromptSdlcWriterReady";

const WRITERS = ["claude-cli", "codex", "cursor", "antigravity"] as const;

export const trySendPromptSdlcWriterCheck = async (input: {
  readonly method: string;
  readonly requestUrl: string;
  readonly response: http.ServerResponse;
  readonly storePath: string;
}): Promise<boolean> => {
  if (input.method !== "GET") {
    return false;
  }
  const writer = new URL(input.requestUrl, "http://127.0.0.1").searchParams.get(
    "writer-check",
  );
  if (writer === null) {
    return false;
  }

  const known =
    writer === PROMPT_SDLC_MANUAL_ACTOR ||
    (WRITERS as readonly string[]).includes(writer);
  const status = known
    ? await readPromptSdlcWriterReady(input.storePath, writer)
    : { ok: false, message: "This writer is not available." };
  input.response.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  input.response.end(JSON.stringify(status));
  return true;
};
