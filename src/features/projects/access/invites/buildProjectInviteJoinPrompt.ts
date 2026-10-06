import { buildProjectInviteJoinFallbackPrompt } from "@/features/projects/access/invites/buildProjectInviteJoinFallbackPrompt";
import { buildProjectInviteJoinProjectLine } from "@/features/projects/access/invites/buildProjectInviteJoinProjectLine";
import {
  buildProjectInviteJoinSections,
  type ProjectInviteJoinPromptInput,
  type ProjectInviteJoinSections,
} from "@/features/projects/access/invites/buildProjectInviteJoinSections";

export type { ProjectInviteJoinPromptInput };

/** Full Copy prompt order: goal, then join steps 1–9 ("Check this project first" right after redeem). Poll (step 7 variant) is /join-only. */
const FULL_PROMPT_ORDER = [
  "goal",
  "connect",
  "redeem",
  "localFirst",
  "accessCheck",
  "briefingPeers",
  "summary",
  "dispatch",
  "wake",
  "leave",
  "productUpdates",
] as const satisfies readonly (keyof ProjectInviteJoinSections)[];

/**
 * Join orchestrator — the full invite Copy prompt. Joins each join step block
 * (from buildProjectInviteJoinSections) with a blank line. Only step 7 depends
 * on platform. Pure: no env, clock, or DB reads; copy only.
 */
export const buildProjectInviteJoinPrompt = (
  input: ProjectInviteJoinPromptInput,
): string => {
  const sections = buildProjectInviteJoinSections(input);
  if (!sections) {
    return buildProjectInviteJoinFallbackPrompt({
      projectLine: buildProjectInviteJoinProjectLine(input),
    });
  }
  const lines = FULL_PROMPT_ORDER.flatMap((key, index) =>
    index === 0 ? [...sections[key]] : ["", ...sections[key]],
  );
  if (sections.projectLine) {
    lines.push("", sections.projectLine);
  }
  return lines.join(String.fromCharCode(10));
};
