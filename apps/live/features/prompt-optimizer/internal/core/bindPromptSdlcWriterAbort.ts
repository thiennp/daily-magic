import type { ChildProcess } from "node:child_process";

import type { PromptSdlcWriterResult } from "./readPromptSdlcWriterOutput";

export const PROMPT_SDLC_WRITER_KILL_ESCALATE_MS = 2_500;

export type PromptSdlcWriterKillSignal = "SIGTERM" | "SIGKILL";

export const PROMPT_SDLC_WRITER_STOPPED: PromptSdlcWriterResult = {
  ok: false,
  errorMessage: "Stopped.",
  stopped: true,
  errorKind: "writer_interrupted",
};

const childStillAlive = (child: ChildProcess): boolean =>
  child.exitCode === null && child.signalCode === null;

/**
 * SIGTERM first; if the child is still alive after escalateAfterMs, SIGKILL.
 * Resolves with the strongest signal that was sent.
 */
export const terminatePromptSdlcWriterChild = (
  child: ChildProcess,
  escalateAfterMs: number = PROMPT_SDLC_WRITER_KILL_ESCALATE_MS,
): Promise<PromptSdlcWriterKillSignal> =>
  new Promise((resolve) => {
    let killSignal: PromptSdlcWriterKillSignal = "SIGTERM";
    let settled = false;
    const timers: { escalate?: NodeJS.Timeout } = {};
    const onExit = (): void => {
      finish(killSignal);
    };
    const finish = (signal: PromptSdlcWriterKillSignal): void => {
      if (settled) {
        return;
      }
      settled = true;
      if (timers.escalate !== undefined) {
        clearTimeout(timers.escalate);
      }
      child.removeListener("exit", onExit);
      resolve(signal);
    };

    try {
      child.kill("SIGTERM");
    } catch {
      finish("SIGTERM");
      return;
    }

    if (!childStillAlive(child)) {
      finish("SIGTERM");
      return;
    }

    child.once("exit", onExit);
    timers.escalate = setTimeout(() => {
      if (!childStillAlive(child)) {
        finish(killSignal);
        return;
      }
      killSignal = "SIGKILL";
      try {
        child.kill("SIGKILL");
      } catch {
        // Process may have exited between the alive check and kill.
      }
      finish("SIGKILL");
    }, escalateAfterMs);
  });

/** Ends the writer process when the person stops the run. */
export const bindPromptSdlcWriterAbort = (
  child: ChildProcess,
  signal: AbortSignal | undefined,
  finish: (value: PromptSdlcWriterResult) => void,
  onStopping?: () => void,
): void => {
  if (signal === undefined) {
    return;
  }

  const stop = (): void => {
    onStopping?.();
    void terminatePromptSdlcWriterChild(child).then((killSignal) => {
      finish({
        ...PROMPT_SDLC_WRITER_STOPPED,
        killSignal,
      });
    });
  };
  if (signal.aborted) {
    stop();
    return;
  }

  signal.addEventListener("abort", stop, { once: true });
};
