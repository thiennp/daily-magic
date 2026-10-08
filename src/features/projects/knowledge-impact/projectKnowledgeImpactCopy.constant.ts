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
  "stat.estimate.short": "Estimate",
  "stat.avoided.tip":
    "Estimate: a mistake note was added to the prompt and the run passed without repeating it.",
  "stat.tokens.label": "Tokens added",
  "stat.tokens.hint": "Measured: {perRun} tokens per run on average.",
  "stat.saved.label": "Tokens saved",
  "stat.saved.tip":
    "Estimate: the token cost of the failed runs behind each avoided mistake.",
  "stat.repeat.label": "Repeat-mistake rate",
  "stat.repeat.hint.holdout":
    "Without notes (holdout): {holdout} over {runs} runs.",
  "stat.repeat.hint.none": "No holdout runs yet.",
  "chart.empty":
    "Not enough runs yet — charts appear after the first runs with notes.",
  "chart.repeat.title": "Repeat-mistake rate per week",
  "chart.repeat.description": "How often a known mistake came back each week.",
  "chart.repeat.tip":
    "Measured. Compares runs with notes against holdout runs that skipped them. A lower line means the notes help.",
  "chart.repeat.withNotes": "With notes",
  "chart.repeat.holdout": "Without notes (holdout)",
  "chart.tokens.title": "Tokens added per run",
  "chart.tokens.description": "Average size of the notes added to each prompt.",
  "chart.tokens.tip":
    "Measured. Tokens the notes added to the prompt, averaged over runs with notes.",
  "chart.avoided.title": "Mistakes avoided per week",
  "chart.avoided.description": "Known mistakes that did not repeat.",
  "chart.avoided.tip":
    "Estimate (≈). Counted when a mistake note was added and the run passed without repeating it.",
  "chart.net.title": "Tokens saved vs added",
  "chart.net.description": "What the notes cost against what they saved.",
  "chart.net.tip":
    "Added is measured. Saved is an estimate (≈): the token cost of the failed runs behind each avoided mistake.",
  "chart.net.added": "Added (measured)",
  "chart.net.saved": "Saved (≈ estimate)",
  "chart.net.footer": "Net over the period: ≈ {net} tokens.",
  "chart.runs.title": "Runs with notes vs holdout",
  "chart.runs.description": "How many runs each week used notes.",
  "chart.runs.tip":
    "Measured. About 1 in 10 runs skips the notes (holdout) so the repeat rate can be compared fairly.",
  "chart.runs.with": "With notes",
  "chart.runs.holdout": "Holdout",
  "chart.byComputer.title": "Notes by computer",
  "chart.byComputer.description": "How many notes each computer has learned.",
  "chart.byComputer.tip":
    "Measured. Counts come from each computer's last report. Note text stays on the computer.",
  "chart.topNotes.title": "Most reused notes",
  "chart.topNotes.description": "Shared notes seen most often.",
  "chart.topNotes.tip":
    "Measured. How many times the same note was seen. Only notes from computers with sharing on appear.",
  "chart.col.week": "Week",
  "chart.col.computer": "Computer",
  "chart.col.note": "Note",
  "chart.col.seen": "Seen",
  unnamedComputer: "Unnamed computer",
  "impact.retry": "Try again",
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
