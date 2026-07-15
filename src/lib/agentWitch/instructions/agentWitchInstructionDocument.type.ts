export const AGENT_WITCH_INSTRUCTION_SCHEMA_VERSION = 1;

export interface AgentWitchInstructionTopic {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly bullets?: readonly string[];
}

export interface AgentWitchInstructionSection {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly topics: readonly AgentWitchInstructionTopic[];
}

export interface AgentWitchInstructionMessageType {
  readonly type: string;
  readonly direction: "browser_to_mac" | "mac_to_browser" | "bidirectional";
  readonly purpose: string;
}

export interface AgentWitchInstructionCommunicationGuide {
  readonly summary: string;
  readonly websocketPath: string;
  readonly pairing: readonly string[];
  readonly messageTypes: readonly AgentWitchInstructionMessageType[];
  readonly midRunInputMarker: string;
}

export interface AgentWitchInstructionApiRefs {
  readonly instructionsPath: string;
  readonly statusPath: string;
  readonly installScriptPath: string;
  readonly installVersionPath: string;
  readonly websocketPath: string;
  readonly websocketUrl: string;
}

export interface AgentWitchInstructionDocument {
  readonly schemaVersion: number;
  readonly productName: string;
  readonly generatedAt: string;
  readonly audience: string;
  readonly privacyNote: string;
  readonly purpose: string;
  readonly sections: readonly AgentWitchInstructionSection[];
  readonly communication: AgentWitchInstructionCommunicationGuide;
  readonly api: AgentWitchInstructionApiRefs;
}
