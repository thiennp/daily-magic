import type { ReactElement } from "react";

import PromptSdlcField, {
  PROMPT_SDLC_FIELD_CLASS,
} from "@/features/prompt-sdlc/internal/presentation/PromptSdlcField";
import type { PromptSdlcModelOption } from "@/lib/promptSdlc/mergePromptSdlcModelOptions";

interface PromptSdlcModelSelectsProps {
  readonly options: readonly PromptSdlcModelOption[];
  readonly judgeId: string;
  readonly improverId: string;
  readonly onJudgeIdChange: (value: string) => void;
  readonly onImproverIdChange: (value: string) => void;
}

const ModelSelect = (props: {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly options: readonly PromptSdlcModelOption[];
  readonly onChange: (value: string) => void;
}): ReactElement => (
  <PromptSdlcField id={props.id} label={props.label}>
    <select
      id={props.id}
      className={PROMPT_SDLC_FIELD_CLASS}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      {props.options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  </PromptSdlcField>
);

export default function PromptSdlcModelSelects(
  props: PromptSdlcModelSelectsProps,
): ReactElement {
  return (
    <>
      <ModelSelect
        id="prompt-sdlc-judge"
        label="Judge"
        value={props.judgeId}
        options={props.options}
        onChange={props.onJudgeIdChange}
      />
      <ModelSelect
        id="prompt-sdlc-improver"
        label="Improver"
        value={props.improverId}
        options={props.options}
        onChange={props.onImproverIdChange}
      />
    </>
  );
}
