import os from "node:os";

import {
  labelPromptSdlcLocalModel,
  PROMPT_SDLC_MANUAL_ACTOR,
} from "./choosePromptSdlcLocalModels";
import {
  readRememberedPromptSdlcWriter,
  rememberPromptSdlcWriterReady,
} from "./promptSdlcWriterReadyStore";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

const PROBE_PROMPT = "Reply with the single word ok. Do not use tools.";
const PROBE_TIMEOUT_MS = 45_000;

export const readPromptSdlcWriterReady = async (
  storePath: string,
  writer: string,
): Promise<{ readonly ok: boolean; readonly message: string }> => {
  if (writer === PROMPT_SDLC_MANUAL_ACTOR) {
    return { ok: true, message: "You will do this step." };
  }
  const remembered = readRememberedPromptSdlcWriter(storePath, writer);
  if (remembered !== null) {
    return { ok: true, message: remembered };
  }

  const reply = await runPromptSdlcWriterReply({
    writerAgent: writer,
    prompt: PROBE_PROMPT,
    workingDirectory: os.tmpdir(),
    timeoutMs: PROBE_TIMEOUT_MS,
  });
  if (!reply.ok) {
    return { ok: false, message: reply.errorMessage };
  }

  const message = `${labelPromptSdlcLocalModel(writer)} is ready.`;
  rememberPromptSdlcWriterReady(storePath, writer, message);
  return { ok: true, message };
};

const distinctWriters = (writers: readonly string[]): readonly string[] => [
  ...new Set(writers.filter((writer) => writer.length > 0)),
];

export const readPromptSdlcChosenWritersReady = async (
  storePath: string,
  judge: string,
  improver: string,
  runner?: string,
): Promise<string | null> => {
  for (const writer of distinctWriters([judge, improver, runner ?? ""])) {
    const status = await readPromptSdlcWriterReady(storePath, writer);
    if (!status.ok) {
      return status.message;
    }
  }
  return null;
};
