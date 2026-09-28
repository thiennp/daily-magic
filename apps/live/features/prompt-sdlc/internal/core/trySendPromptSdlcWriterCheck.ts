import type http from "node:http";

import { readPromptSdlcWriterReady } from "./probePromptSdlcWriterReady";

const WRITERS = ["claude-cli", "codex", "cursor", "antigravity"] as const;

export const trySendPromptSdlcWriterCheck = async (input: {
  readonly method: string;
  readonly requestUrl: string;
  readonly response: http.ServerResponse;
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

  const known = (WRITERS as readonly string[]).includes(writer);
  const status = known
    ? await readPromptSdlcWriterReady(
        writer,
        new URL(input.requestUrl, "http://127.0.0.1").searchParams.get(
          "fresh",
        ) === "1",
      )
    : { ok: false, message: "This writer is not available." };
  input.response.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  input.response.end(JSON.stringify(status));
  return true;
};
