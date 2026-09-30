export type PromptSdlcGoalSuggestionEvalCase = {
  readonly id: string;
  readonly prompt: string;
  readonly writerReply: string;
  readonly expectScorePasses: boolean;
};
