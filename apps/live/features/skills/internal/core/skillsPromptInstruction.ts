import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import { openSkillIndexDb } from "./createDefaultSkillToolDeps";
import { countIndexedSkills } from "./skillIndexDb";

/**
 * One plain line. It must never contain a bracketed protocol marker (the
 * AWAITING_INPUT / WAVE_PLAN family) so it can never be mistaken for one when
 * the CLI echoes the prompt back.
 */
export const SKILLS_FIND_INSTRUCTION =
  "Before you start, call the skills_find tool with a short description of the task; use a skill when it clearly fits. If it answers unavailable, look the library up with list_project_skills and a short query instead.";

/**
 * Writers whose global config registers the AgentWitch MCP server
 * (token-saver writeCursorGlobalMcp / writeCodexGlobalConfig). Claude only
 * gets the check_context hook and antigravity has no registration, so the
 * tools do not exist there and the line would point at nothing.
 */
const SKILLS_MCP_WRITERS: ReadonlySet<string> = new Set(["codex", "cursor"]);

export const shouldAddSkillsInstruction = (input: {
  readonly writerAgent: string;
  readonly indexedSkillCount: number;
}): boolean =>
  SKILLS_MCP_WRITERS.has(input.writerAgent) && input.indexedSkillCount > 0;

export const appendSkillsFindInstruction = (
  prompt: string,
  input: {
    readonly writerAgent: string;
    readonly indexedSkillCount: number;
  },
): string =>
  shouldAddSkillsInstruction(input) && !prompt.includes(SKILLS_FIND_INSTRUCTION)
    ? `${prompt.trimEnd()}\n\n${SKILLS_FIND_INSTRUCTION}\n`
    : prompt;

/** Run-time wiring: counts the project's indexed skills; never throws. */
export const withSkillsFindInstruction = (
  prompt: string,
  input: {
    readonly layout: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
    readonly projectId: string;
    readonly writerAgent: string;
  },
): string => {
  try {
    const db = openSkillIndexDb(input.layout);
    if (db === null || input.projectId.length === 0) {
      return prompt;
    }
    return appendSkillsFindInstruction(prompt, {
      writerAgent: input.writerAgent,
      indexedSkillCount: countIndexedSkills(db, input.projectId),
    });
  } catch {
    return prompt;
  }
};
