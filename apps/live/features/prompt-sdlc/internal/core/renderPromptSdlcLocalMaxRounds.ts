import { PROMPT_SDLC_MAX_ROUNDS_LIMIT } from "../../../../adapters/promptSdlcAwcCore";
import { promptSdlcLocalMaxRoundsText } from "./readPromptSdlcLocalMaxRounds";

export const renderPromptSdlcLocalMaxRounds = (maxRounds: string): string => {
  const value = promptSdlcLocalMaxRoundsText(maxRounds);
  return `<label class="field"><span class="field-label">Round limit</span><input class="input" type="number" name="maxRounds" min="1" max="${PROMPT_SDLC_MAX_ROUNDS_LIMIT}" step="1" value="${value}"><span class="muted">Stops after this many scored rounds. The usual limit is 10. The run also stops when the score has not risen for 3 rounds.</span></label>`;
};
