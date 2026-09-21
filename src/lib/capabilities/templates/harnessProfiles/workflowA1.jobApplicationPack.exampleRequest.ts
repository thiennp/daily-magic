export const JOB_APPLICATION_PACK_EXAMPLE_REQUEST = `Build a truthful job application pack from the workflow form.

Read targetRole, companyName, jobPostingUrl, and jobDescription (paste when URL is empty).
Open resumeFolderPath on this Mac and use only facts found there — never invent employers, dates, or skills.
Mirror keywords from the posting without keyword stuffing; flag gaps honestly.

## Map requirements to resume evidence
Continue from the operator’s job posting confirmation (checkpoint responses above).

Load the job posting text (URL or pasted jobDescription).
List top requirements and match each to resume evidence from resumeFolderPath; note gaps and honest bridge language.
Summarize the map in [[PROGRESS]] before drafting prose.

## Draft tailored bullets and cover letter
Rewrite 3–5 resume bullet lines with quantified outcomes only where source files support them.
Draft a cover letter under one page with role + company fit and one clear ask.
Include gap notes where experience is thin; keep plain text for Word or PDF paste.
Stop before final approval — the workflow pauses for the operator to review every claim.

## Finalize pack after approval (this step only)
Continue from the operator’s approval checkpoint (fix requests in checkpoint responses above).

Apply accuracy fixes the operator requested; do not reintroduce invented facts.
Emit a submission checklist (portal steps, attachments).
When applicationHistoryPath is provided, draft one log line the operator can append after they submit — do not write the file until they ask.
The operator submits the application themselves; do not apply or send on their behalf.`;
