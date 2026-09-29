"use client";

import { useEffect, useState } from "react";

import {
  buildPromptSdlcModelOptions,
  readPromptSdlcMacOptions,
  type PromptSdlcMacOption,
} from "@/features/prompt-sdlc/internal/core/readPromptSdlcClientPayloads";
import { resolveAgentWitchWakeBaseUrlForPage } from "@/lib/agentWitch/resolveAgentWitchWakeBaseUrl";
import {
  pickPromptSdlcDefaultModelIds,
  type PromptSdlcModelOption,
} from "@/lib/promptSdlc/mergePromptSdlcModelOptions";

const readJson = async (response: Response): Promise<unknown> =>
  response.ok ? response.json() : null;

export const usePromptSdlcModelCatalog = (): {
  readonly options: readonly PromptSdlcModelOption[];
  readonly macs: readonly PromptSdlcMacOption[];
  readonly modelNote: string;
  readonly judgeId: string;
  readonly improverId: string;
  readonly setJudgeId: (value: string) => void;
  readonly setImproverId: (value: string) => void;
} => {
  const [options, setOptions] = useState<readonly PromptSdlcModelOption[]>([]);
  const [macs, setMacs] = useState<readonly PromptSdlcMacOption[]>([]);
  const [modelNote, setModelNote] = useState("");
  const [judgeId, setJudgeId] = useState("");
  const [improverId, setImproverId] = useState("");

  useEffect(() => {
    const load = async (): Promise<void> => {
      const wakeBaseUrl = resolveAgentWitchWakeBaseUrlForPage();
      const [localResponse, cloudResult, deviceResult] = await Promise.all([
        fetch(`${wakeBaseUrl}/prompt-sdlc/models`, {
          signal: AbortSignal.timeout(2_000),
        }).then(
          (response) => response,
          () => null,
        ),
        fetch("/api/prompt-sdlc/models").then(readJson, () => null),
        fetch("/api/agent-witch/devices").then(readJson, () => null),
      ]);
      const localResult =
        localResponse !== null && localResponse.ok
          ? await localResponse.json()
          : null;
      const cursorCloudConnected =
        typeof cloudResult === "object" &&
        cloudResult !== null &&
        "cursorCloudConnected" in cloudResult &&
        cloudResult.cursorCloudConnected === true;
      const nextOptions = buildPromptSdlcModelOptions({
        localBody: localResult,
        cursorCloudConnected,
      });
      const defaults = pickPromptSdlcDefaultModelIds(nextOptions);
      setOptions(nextOptions);
      setMacs(readPromptSdlcMacOptions(deviceResult));
      const modelNote =
        localResponse === null
          ? "This Mac's bridge is not reachable, so installed writers are hidden."
          : localResult === null
            ? "This Mac's bridge does not list prompt optimizer models yet, so installed writers are hidden."
            : "";
      setModelNote(modelNote);
      if (defaults !== null) {
        setJudgeId(defaults.judgeId);
        setImproverId(defaults.improverId);
      }
    };

    void load();
  }, []);

  return {
    options,
    macs,
    modelNote,
    judgeId,
    improverId,
    setJudgeId,
    setImproverId,
  };
};
