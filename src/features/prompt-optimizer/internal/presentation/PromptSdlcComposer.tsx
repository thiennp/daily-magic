import type { FormEvent, ReactElement } from "react";

import type { PromptSdlcMacOption } from "@/features/prompt-optimizer/internal/core/readPromptSdlcClientPayloads";
import PromptSdlcField, {
  PROMPT_SDLC_FIELD_CLASS,
} from "@/features/prompt-optimizer/internal/presentation/PromptSdlcField";
import PromptSdlcModelSelects from "@/features/prompt-optimizer/internal/presentation/PromptSdlcModelSelects";
import type { PromptSdlcModelOption } from "@/lib/promptOptimizer/mergePromptSdlcModelOptions";

interface PromptSdlcComposerProps {
  readonly goal: string;
  readonly sourcePrompt: string;
  readonly deviceId: string;
  readonly judgeId: string;
  readonly improverId: string;
  readonly options: readonly PromptSdlcModelOption[];
  readonly macs: readonly PromptSdlcMacOption[];
  readonly modelNote: string;
  readonly errorMessage: string | null;
  readonly disabled: boolean;
  readonly onGoalChange: (value: string) => void;
  readonly onSourcePromptChange: (value: string) => void;
  readonly onDeviceIdChange: (value: string) => void;
  readonly onJudgeIdChange: (value: string) => void;
  readonly onImproverIdChange: (value: string) => void;
  readonly onSubmit: () => void;
}

export default function PromptSdlcComposer(
  props: PromptSdlcComposerProps,
): ReactElement {
  const submit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    props.onSubmit();
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <PromptSdlcField id="prompt-sdlc-goal" label="Goal">
        <textarea
          id="prompt-sdlc-goal"
          className={PROMPT_SDLC_FIELD_CLASS}
          rows={3}
          value={props.goal}
          onChange={(event) => props.onGoalChange(event.target.value)}
        />
      </PromptSdlcField>
      <PromptSdlcField id="prompt-sdlc-prompt" label="Prompt">
        <textarea
          id="prompt-sdlc-prompt"
          className={PROMPT_SDLC_FIELD_CLASS}
          rows={8}
          value={props.sourcePrompt}
          onChange={(event) => props.onSourcePromptChange(event.target.value)}
        />
      </PromptSdlcField>
      <PromptSdlcField id="prompt-sdlc-computer" label="Computer">
        <select
          id="prompt-sdlc-computer"
          className={PROMPT_SDLC_FIELD_CLASS}
          value={props.deviceId}
          onChange={(event) => props.onDeviceIdChange(event.target.value)}
        >
          <option value="">Select a computer</option>
          {props.macs.map((computer) => (
            <option key={computer.id} value={computer.id}>
              {computer.label}
              {computer.isDispatchReady ? "" : " (offline)"}
            </option>
          ))}
        </select>
      </PromptSdlcField>
      <PromptSdlcModelSelects
        options={props.options}
        judgeId={props.judgeId}
        improverId={props.improverId}
        onJudgeIdChange={props.onJudgeIdChange}
        onImproverIdChange={props.onImproverIdChange}
      />
      {props.modelNote.length > 0 ? (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {props.modelNote}
        </p>
      ) : null}
      {props.errorMessage !== null ? (
        <p className="text-sm text-error-500">{props.errorMessage}</p>
      ) : null}
      <button
        type="submit"
        disabled={props.disabled}
        className="rounded-lg bg-brand-600 px-5 py-3.5 text-sm text-white disabled:opacity-50"
      >
        Run
      </button>
    </form>
  );
}
