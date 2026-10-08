import { cleanAgentOutputForUser } from "@/features/agent/utils/cleanAgentOutputForUser";
import { stripAgentRunHarnessAppendix } from "@/features/agent/utils/stripAgentRunHarnessAppendix";

/**
 * aedfe094: "Save as skill?" prompt and draft. Drops the harness marker rules
 * and [[MARKER]] tokens older suggestions stored, but leaves the markdown
 * itself (code, KEY=value examples, escapes) untouched.
 */
export const sanitizeSkillTextForDisplay = (text: string | null): string =>
  cleanAgentOutputForUser(stripAgentRunHarnessAppendix(text ?? ""), {
    keepCliPreamble: true,
  }).trim();
