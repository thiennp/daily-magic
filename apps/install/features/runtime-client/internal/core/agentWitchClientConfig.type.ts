import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";

import type { WriterExecutionBackend } from "./writerApi/resolveWriterExecutionBackend";

export interface AgentWitchClientConfig {
  readonly email: string | null;
  readonly wsUrl: string;
  readonly workspace: string;
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
  readonly pairingToken: string;
  readonly writerExecutionBackend: WriterExecutionBackend;
  readonly layout: AgentWitchLocalLayout;
}
