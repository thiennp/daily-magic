import { parsePromptJudgementVerdict } from "@/lib/promptSdlc/parsePromptJudgementVerdict";

const FENCED_PROMPT = /```(?:[a-zA-Z0-9_-]+)?\n([\s\S]*?)```/;

/** Prompt text from an improver reply. Null when the reply is empty or only a judge verdict. */
export const extractImprovedPrompt = (raw: string): string | null => {
  const fenced = FENCED_PROMPT.exec(raw);
  const text = (fenced?.[1] ?? raw).trim();
  if (text.length === 0 || parsePromptJudgementVerdict(text) !== null) {
    return null;
  }

  return text;
};
