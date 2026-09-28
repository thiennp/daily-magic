import {
  readPromptSdlcCyclePayload,
  readPromptSdlcErrorMessage,
} from "@/features/prompt-sdlc/internal/core/readPromptSdlcClientPayloads";
import { readPromptSdlcHistory } from "@/features/prompt-sdlc/internal/core/readPromptSdlcHistory";
import type PromptSdlcCycleSummary from "@/lib/promptSdlc/types/PromptSdlcCycleSummary.type";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

const readJson = async (response: Response): Promise<unknown> =>
  response.json().catch(() => null);

export const postPromptSdlcStart = async (body: {
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly deviceId: string | null;
  readonly judgeKind: string;
  readonly judgeModel: string;
  readonly improverKind: string;
  readonly improverModel: string;
}): Promise<{
  readonly cycle: PromptSdlcCycleView | null;
  readonly errorMessage: string | null;
}> => {
  const response = await fetch("/api/prompt-sdlc/cycles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await readJson(response);
  return {
    cycle: readPromptSdlcCyclePayload(payload),
    errorMessage: response.ok ? null : readPromptSdlcErrorMessage(payload),
  };
};

export const fetchPromptSdlcHistory = async (): Promise<{
  readonly cycles: readonly PromptSdlcCycleSummary[];
  readonly note: string;
}> => {
  const response = await fetch("/api/prompt-sdlc/cycles");
  if (response.status === 401) {
    return { cycles: [], note: "Sign in to see your runs." };
  }

  return {
    cycles: readPromptSdlcHistory(await readJson(response)),
    note: "",
  };
};

export const fetchPromptSdlcCycle = async (
  cycleId: string,
): Promise<PromptSdlcCycleView | null> => {
  const response = await fetch(`/api/prompt-sdlc/cycles/${cycleId}`);
  return readPromptSdlcCyclePayload(await readJson(response));
};

export const postPromptSdlcAdvance = async (
  cycleId: string,
): Promise<PromptSdlcCycleView | null> => {
  const response = await fetch(`/api/prompt-sdlc/cycles/${cycleId}/advance`, {
    method: "POST",
  });
  return readPromptSdlcCyclePayload(await readJson(response));
};

export const postPromptSdlcLocalResult = async (input: {
  readonly cycleId: string;
  readonly role: PromptSdlcCallRole;
  readonly text: string;
}): Promise<PromptSdlcCycleView | null> => {
  const response = await fetch(
    `/api/prompt-sdlc/cycles/${input.cycleId}/local-result`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: input.role, text: input.text }),
    },
  );
  return readPromptSdlcCyclePayload(await readJson(response));
};

export const requestPromptSdlcOllamaChat = async (input: {
  readonly wakeBaseUrl: string;
  readonly model: string;
  readonly prompt: string;
}): Promise<string> => {
  try {
    const response = await fetch(`${input.wakeBaseUrl}/prompt-sdlc/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: input.model, prompt: input.prompt }),
    });
    const payload = await readJson(response);
    if (
      response.ok &&
      typeof payload === "object" &&
      payload !== null &&
      "text" in payload &&
      typeof payload.text === "string"
    ) {
      return payload.text;
    }
  } catch {
    return "";
  }

  return "";
};
