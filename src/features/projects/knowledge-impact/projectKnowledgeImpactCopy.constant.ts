/** Knowledge impact block on the project Reports tab (EN). Estimates carry "≈". */
export const PROJECT_KNOWLEDGE_IMPACT_COPY = {
  "impact.aria": "Knowledge impact",
  "impact.heading": "Knowledge impact",
  "impact.intro":
    "How much the notes learned on this project's computers helped in the last {days} days.",
  "impact.loading": "Loading knowledge impact…",
  "impact.error": "Could not load knowledge impact.",
  "impact.empty":
    "No knowledge data yet. It appears after runs on a computer with the latest install.",
  "stat.avoided.label": "Mistakes avoided",
  "stat.avoided.hint":
    "Estimate: a mistake note was added to the prompt and the run passed without repeating it.",
  "stat.tokens.label": "Tokens added",
  "stat.tokens.hint": "Measured: {perRun} tokens per run on average.",
  "stat.saved.label": "Tokens saved",
  "stat.saved.hint":
    "Estimate: the token cost of the failed runs behind each avoided mistake.",
  "stat.repeat.label": "Repeat-mistake rate",
  "stat.repeat.hint.holdout":
    "Without notes (holdout): {holdout} over {runs} runs.",
  "stat.repeat.hint.none": "No holdout runs yet.",
  "chart.repeat.title": "Repeat-mistake rate per week",
  "chart.repeat.withNotes": "With notes",
  "chart.repeat.holdout": "Without notes (holdout)",
  "chart.tokens.title": "Tokens added per run",
  "computers.heading": "Computers",
  "computers.visibility":
    "Project owners can see this breakdown. Notes stay on each computer.",
  "computers.col.computer": "Computer",
  "computers.col.status": "Knowledge",
  "computers.col.cards": "Notes",
  "computers.summary":
    "{ready} of {total} computers ready · {degraded} without embeddings · {other} need attention",
  "status.ready": "Ready",
  "status.degraded": "Keyword only",
  "status.off": "Off",
  "status.unavailable": "Needs Node 22.13+",
  "status.unknown": "Not reported",
  "status.fix.degraded":
    "Ollama or the embedding model is missing. Run the install update on that computer.",
  "status.fix.unavailable": "Update Node to 22.13+ on that computer.",
  "status.fix.unknown": "Update the install on that computer.",
  "cards.heading": "Shared notes",
  "cards.intro":
    "Note text from computers where sharing is on. Only project owners see this.",
  "cards.empty":
    'No shared notes. A member can turn on "Share note text with project owners" in the local app.',
  "cards.kind.mistake": "Mistake",
  "cards.kind.fix": "Fix",
  "cards.kind.decision": "Decision",
  "cards.kind.lesson": "Note",
  "cards.meta": "{computer} · seen {count}×",
  footnote: "≈ marks an estimate. Everything else is measured.",
} as const;

export type ProjectKnowledgeImpactCopyKey =
  keyof typeof PROJECT_KNOWLEDGE_IMPACT_COPY;
