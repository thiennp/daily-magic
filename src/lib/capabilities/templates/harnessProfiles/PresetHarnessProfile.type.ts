export interface HarnessProfileSection {
  readonly heading: string;
  readonly bullets: readonly string[];
}

export interface PresetHarnessProfile {
  readonly ruleFocus: readonly string[];
  readonly skillSections: readonly HarnessProfileSection[];
  readonly commandSteps: readonly string[];
  readonly instructionAddendum: string;
  readonly subagentMission: string;
  readonly subagentExpertise: readonly string[];
  readonly outputFormat: string;
}
