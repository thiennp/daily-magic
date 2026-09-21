export const RESEARCH_BRIEF_EXAMPLE_REQUEST = `Structure a research question into a brief with sources.

Read topic, audience, questions, and sources (optional) from the workflow form.

## 1. Frame scope and clarify (this step only)
Restate topic and audience in one plain-language paragraph.
List which questions are clear vs still ambiguous.
If sources is empty or thin, say what would raise confidence (web, docs, local files).
Ask only missing clarifying questions in everyday language.
Summarize questions in [[PROGRESS]]; the operator answers at the next human checkpoint.
Do not write the full brief yet.

## 2. Synthesize findings into the research brief (this step only)
Continue from prior operator answers (see checkpoint responses above).

Use provided sources when present; label confidence when evidence is thin.
Map findings to each question in questions.
Keep hypotheses separate from verified findings.

Deliver:
- Executive summary (3–5 bullets for audience)
- Findings per question with confidence labels
- Open questions and gaps
- Suggested next research steps

Stop before final operator review — the workflow will pause for approval.`;
