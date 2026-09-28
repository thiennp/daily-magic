import { isNonEmptyString, isOneOf, isString } from "guardz";

import {
  isPromptSdlcCallRole,
  parsePromptSdlcModelChoice,
} from "@/lib/promptSdlc/promptSdlcModelChoice";
import type { PromptSdlcCallRole } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";
import type { PromptSdlcModelChoice } from "@/lib/promptSdlc/types/PromptSdlcModelChoice.type";

export interface PromptSdlcStartRequest {
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly deviceId: string | null;
  readonly judge: PromptSdlcModelChoice;
  readonly improver: PromptSdlcModelChoice;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const parsePromptSdlcStartRequest = (
  body: unknown,
): PromptSdlcStartRequest | null => {
  if (!isRecord(body)) {
    return null;
  }

  const judgeKind = body.judgeKind;
  const improverKind = body.improverKind;
  const deviceId =
    body.deviceId === undefined ||
    body.deviceId === null ||
    body.deviceId === ""
      ? null
      : body.deviceId;
  if (
    !isNonEmptyString(body.goal) ||
    !isNonEmptyString(body.sourcePrompt) ||
    (deviceId !== null && !isNonEmptyString(deviceId)) ||
    !isOneOf("writer", "ollama")(judgeKind) ||
    !isNonEmptyString(body.judgeModel) ||
    !isOneOf("writer", "ollama")(improverKind) ||
    !isNonEmptyString(body.improverModel)
  ) {
    return null;
  }

  const judge = parsePromptSdlcModelChoice(judgeKind, body.judgeModel);
  const improver = parsePromptSdlcModelChoice(improverKind, body.improverModel);
  if (judge === null || improver === null) {
    return null;
  }

  return {
    goal: body.goal,
    sourcePrompt: body.sourcePrompt,
    deviceId,
    judge,
    improver,
  };
};

export const parsePromptSdlcLocalResultRequest = (
  body: unknown,
): { readonly role: PromptSdlcCallRole; readonly text: string } | null => {
  if (!isRecord(body) || !isString(body.role) || !isString(body.text)) {
    return null;
  }

  if (!isPromptSdlcCallRole(body.role)) {
    return null;
  }

  return { role: body.role, text: body.text };
};
