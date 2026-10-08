/**
 * aedfe094: the harness appends its marker rules to the prompt after a "---"
 * line (estimate, wave plan, progress, next actions). Older rows stored that
 * wrapped prompt, so "Save as skill?" showed the rules. Cut the text at the
 * first known rule opener; works on flattened single-line text too.
 */
const HARNESS_OPENERS: readonly RegExp[] = [
  /A local Ollama sidecar/i,
  /Do not emit \[\[WORKING_ESTIMATE\]\]/i,
  /When the work can be split, prefer small waves/i,
  /While working, report user-visible progress/i,
  /After your main answer, append suggested next steps/i,
  /Emit an updated estimate only if your plan changes/i,
];

const TRAILING_RULE = /(?:\s|^)-{3,}\s*$/;

export const stripAgentRunHarnessAppendix = (text: string): string => {
  const cut = HARNESS_OPENERS.reduce((earliest, opener) => {
    const index = text.search(opener);
    return index >= 0 && index < earliest ? index : earliest;
  }, text.length);
  if (cut === text.length) {
    return text;
  }
  return text.slice(0, cut).replace(TRAILING_RULE, "").trimEnd();
};
