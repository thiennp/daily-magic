export const EMAIL_INBOX_REPLY_EXAMPLE_REQUEST = `Handle inbox messages with grounded replies from a knowledge folder on your Mac.

Read inboxFocus, knowledgeFolderPath, replyTone, signatureBlock, and answeredLogPath from the workflow form.
The operator keeps the mailbox open in the browser on this Mac; coordinate via workflow checkpoints — do not use [[AWAITING_INPUT]] for send approval (the platform pauses between nodes).

## 1. Index knowledge and triage inbox
Scan knowledgeFolderPath recursively for markdown, text, and PDF when readable.
Build a short topic index in [[PROGRESS]] and note gaps where the folder may not answer inbox questions.

List threads matching inboxFocus; skip newsletters and auto-replies unless inboxFocus includes them.
Skip threads already listed in answeredLogPath when that path is set.
Summarize each candidate thread in one line in [[PROGRESS]].

## 2. Draft grounded replies
For each thread still to handle, draft a reply grounded in knowledgeFolderPath — cite file or section per claim.
If the folder cannot support an answer, state the gap in [[PROGRESS]] for the operator at the next checkpoint.

Match replyTone when set; include signatureBlock when set, else use a neutral professional sign-off.
Present per message in [[PROGRESS]]: thread summary, sources used, To, Subject, and full draft body.
Do not send email in this phase.

## 3. Send after operator approval
Send only messages the operator explicitly approved at the prior human checkpoint (or save as draft if they asked).
When answeredLogPath is set, append thread id, subject, and date for each sent or skipped message.

Summarize in plain language: what was sent, skipped, or deferred.`;
