import type { ChildProcess } from "node:child_process";

import type { PromptSdlcWriterResult } from "./readPromptSdlcWriterOutput";

export const PROMPT_SDLC_WRITER_STOPPED: PromptSdlcWriterResult = {
  ok: false,
  errorMessage: "Stopped.",
  stopped: true,
};

/** Ends the writer process when the person stops the run. */
export const bindPromptSdlcWriterAbort = (
  child: ChildProcess,
  signal: AbortSignal | undefined,
  finish: (value: PromptSdlcWriterResult) => void,
): void => {
  if (signal === undefined) {
    return;
  }

  const stop = (): void => {
    child.kill("SIGTERM");
    finish(PROMPT_SDLC_WRITER_STOPPED);
  };
  if (signal.aborted) {
    stop();
    return;
  }

  signal.addEventListener("abort", stop, { once: true });
};
