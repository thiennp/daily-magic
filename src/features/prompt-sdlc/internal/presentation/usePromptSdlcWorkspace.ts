"use client";

import { useEffect, useState } from "react";

import {
  fetchPromptSdlcCycle,
  fetchPromptSdlcHistory,
  postPromptSdlcStart,
} from "@/features/prompt-sdlc/internal/core/promptSdlcClient";
import {
  PROMPT_SDLC_GUIDE_GOAL,
  PROMPT_SDLC_GUIDE_WEAK_PROMPT,
} from "@/features/prompt-sdlc/internal/presentation/promptSdlcGuideExamples.constant";
import { usePromptSdlcCycleDriver } from "@/features/prompt-sdlc/internal/presentation/usePromptSdlcCycleDriver";
import { usePromptSdlcModelCatalog } from "@/features/prompt-sdlc/internal/presentation/usePromptSdlcModelCatalog";
import { promptSdlcChoiceModelName } from "@/lib/promptSdlc/promptSdlcModelChoice";
import { promptSdlcChoiceNeedsMac } from "@/lib/promptSdlc/promptSdlcModelChoice";
import { isPromptSdlcTerminalStatus } from "@/lib/promptSdlc/PromptSdlcCycleStatus.constant";
import type PromptSdlcCycleSummary from "@/lib/promptSdlc/types/PromptSdlcCycleSummary.type";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

export const usePromptSdlcWorkspace = (fillExample: boolean) => {
  const catalog = usePromptSdlcModelCatalog();
  const [goal, setGoal] = useState(fillExample ? PROMPT_SDLC_GUIDE_GOAL : "");
  const [sourcePrompt, setSourcePrompt] = useState(
    fillExample ? PROMPT_SDLC_GUIDE_WEAK_PROMPT : "",
  );
  const [deviceId, setDeviceId] = useState("");
  const [cycle, setCycle] = useState<PromptSdlcCycleView | null>(null);
  const [history, setHistory] = useState<readonly PromptSdlcCycleSummary[]>([]);
  const [historyNote, setHistoryNote] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  usePromptSdlcCycleDriver(cycle, setCycle);

  useEffect(() => {
    const load = async (): Promise<void> => {
      const result = await fetchPromptSdlcHistory();
      setHistory(result.cycles);
      setHistoryNote(result.note);
    };

    void load();
  }, [cycle?.id, cycle?.status]);

  const judge =
    catalog.options.find((option) => option.id === catalog.judgeId) ?? null;
  const improver =
    catalog.options.find((option) => option.id === catalog.improverId) ?? null;
  const needsMac =
    (judge !== null && promptSdlcChoiceNeedsMac(judge.choice)) ||
    (improver !== null && promptSdlcChoiceNeedsMac(improver.choice));
  const running = cycle !== null && !isPromptSdlcTerminalStatus(cycle.status);

  const onRun = async (): Promise<void> => {
    if (judge === null || improver === null) {
      setErrorMessage("Choose a judge and an improver.");
      return;
    }
    if (needsMac && deviceId.length === 0) {
      setErrorMessage("Choose a Mac for the writer.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);
    const result = await postPromptSdlcStart({
      goal,
      sourcePrompt,
      deviceId: deviceId.length > 0 ? deviceId : null,
      judgeKind: judge.choice.kind,
      judgeModel: promptSdlcChoiceModelName(judge.choice),
      improverKind: improver.choice.kind,
      improverModel: promptSdlcChoiceModelName(improver.choice),
    });
    setIsSubmitting(false);
    if (result.cycle === null) {
      setErrorMessage(result.errorMessage ?? "Prompt SDLC failed.");
      return;
    }
    setCycle(result.cycle);
  };

  const openCycle = async (cycleId: string): Promise<void> => {
    const next = await fetchPromptSdlcCycle(cycleId);
    if (next !== null) {
      setCycle(next);
    }
  };

  return {
    catalog,
    goal,
    setGoal,
    sourcePrompt,
    setSourcePrompt,
    deviceId,
    setDeviceId,
    cycle,
    history,
    historyNote,
    errorMessage,
    isSubmitting,
    running,
    exampleLoaded: fillExample,
    onRun,
    openCycle,
  };
};
