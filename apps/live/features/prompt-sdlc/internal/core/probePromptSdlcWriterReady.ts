import os from "node:os";

import { labelPromptSdlcLocalModel } from "./choosePromptSdlcLocalModels";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

const PROBE_PROMPT = "Reply with the single word ok. Do not use tools.";
const PROBE_TIMEOUT_MS = 45_000;
const READY_CACHE_MS = 120_000;
const FAILED_CACHE_MS = 20_000;

const readyCache = new Map<
  string,
  { readonly atMs: number; readonly ok: boolean; readonly message: string }
>();

export const readPromptSdlcWriterReady = async (
  writer: string,
  fresh = false,
): Promise<{ readonly ok: boolean; readonly message: string }> => {
  const cached = readyCache.get(writer);
  const maxAge = cached?.ok === true ? READY_CACHE_MS : FAILED_CACHE_MS;
  if (!fresh && cached !== undefined && Date.now() - cached.atMs < maxAge) {
    return { ok: cached.ok, message: cached.message };
  }

  const reply = await runPromptSdlcWriterReply({
    writerAgent: writer,
    prompt: PROBE_PROMPT,
    workingDirectory: os.tmpdir(),
    timeoutMs: PROBE_TIMEOUT_MS,
  });
  const status = reply.ok
    ? { ok: true, message: `${labelPromptSdlcLocalModel(writer)} is ready.` }
    : { ok: false, message: reply.errorMessage };
  readyCache.set(writer, { ...status, atMs: Date.now() });
  return status;
};

export const readPromptSdlcChosenWritersReady = async (
  judge: string,
  improver: string,
): Promise<string | null> => {
  const judgeStatus = await readPromptSdlcWriterReady(judge);
  if (!judgeStatus.ok) {
    return judgeStatus.message;
  }
  if (improver === judge) {
    return null;
  }
  const improverStatus = await readPromptSdlcWriterReady(improver);
  return improverStatus.ok ? null : improverStatus.message;
};
