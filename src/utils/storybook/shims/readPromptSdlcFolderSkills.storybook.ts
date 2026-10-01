/** Storybook shim — no filesystem skill scan in AWL prompt optimizer preview. */

export interface PromptSdlcFolderSkill {
  readonly fileName: string;
  readonly name: string;
  readonly description: string;
  readonly promptText: string;
}

export const listPromptSdlcFolderSkills =
  (): readonly PromptSdlcFolderSkill[] => [];
