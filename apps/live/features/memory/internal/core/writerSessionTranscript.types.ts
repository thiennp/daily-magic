export type WriterSessionWriterAgentId =
  "claude-cli" | "codex" | "cursor" | "antigravity";

export type WriterSessionTranscriptTurn = {
  readonly id: string;
  readonly agentRunId?: string;
  readonly userPrompt: string;
  readonly assistantOutput: string;
  readonly createdAt: string;
};

export type WriterSessionCanonicalRecord = {
  readonly sessionId: string;
  readonly writerAgent: WriterSessionWriterAgentId;
  readonly projectFolderPath: string | null;
  readonly turns: readonly WriterSessionTranscriptTurn[];
  readonly createdAt: string;
  readonly updatedAt: string;
};

export type WriterSessionContinuationRecord = {
  readonly sessionId: string;
  readonly injectionBody: string;
  readonly updatedAt: string;
};

export type WriterSessionActiveIndexEntry = {
  readonly writerAgent: WriterSessionWriterAgentId;
  readonly projectFolderPath: string | null;
  readonly sessionId: string;
};

export type WriterSessionActiveIndex = {
  readonly entries: readonly WriterSessionActiveIndexEntry[];
};
