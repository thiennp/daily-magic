/** Rough token count (chars / 4) used for budgets and metrics. */
export const estimateKnowledgeTokens = (text: string): number =>
  Math.ceil(text.length / 4);
