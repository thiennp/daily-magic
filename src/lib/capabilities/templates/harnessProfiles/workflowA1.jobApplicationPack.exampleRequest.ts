export const JOB_APPLICATION_PACK_EXAMPLE_REQUEST = `Build a truthful job application pack from the workflow form.

Read targetRole, companyName, jobPostingUrl, and jobDescription (paste when URL is empty).
Open resumeFolderPath on this Mac and use only facts found there — never invent employers, dates, or skills.
Mirror keywords from the posting without keyword stuffing; flag gaps honestly.

When applicationHistoryPath is set, prepare a log line the operator can append after they submit (do not write the file until they ask at the final checkpoint).

## Map requirements to resume evidence
Load the job posting text and list top requirements.
Match each requirement to resume evidence from resumeFolderPath; note gaps and honest bridge language.
Summarize the map in [[PROGRESS]] for the operator; do not draft the cover letter yet in this step.

## Draft tailored bullets and cover letter
Rewrite 3–5 resume bullet lines with quantified outcomes where the source material supports them.
Draft a cover letter under one page: role + company fit, evidence-backed claims, one clear ask.
Keep plain text the operator can paste into Word or PDF; include gap notes where experience is thin.
Stop before final approval — the workflow pauses for the operator to review accuracy.

## Finalize pack after approval
Apply any fixes from the operator’s approval checkpoint.
Emit a submission checklist (portal steps, attachments) and a draft application log line when applicationHistoryPath is provided.
The operator submits the application themselves; do not click apply or send email on their behalf.`;
