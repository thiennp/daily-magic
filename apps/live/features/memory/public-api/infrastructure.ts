export {
  appendAgentWitchMemoryEntry,
  formatMemoryContextForPrompt,
  readAgentWitchMemoryEntries,
} from "../internal/core/agentWitchLocalMemory";
export {
  appendWriterTranscriptTurn,
  endActiveWriterTranscriptSession,
  ensureActiveWriterTranscriptSession,
  listWriterSessionCanonicalRecords,
  loadActiveWriterContinuationInjectionBody,
  loadWriterSessionCanonical,
  resolveActiveWriterSessionId,
  startNewWriterTranscriptSession,
} from "../internal/core/writerSessionTranscriptStore";
export {
  buildWriterSessionColdContinuePrompt,
  buildWriterSessionContinuationInjectionBody,
} from "../internal/core/buildWriterSessionContinuationInjection";
export type {
  WriterSessionCanonicalRecord,
  WriterSessionTranscriptTurn,
  WriterSessionWriterAgentId,
} from "../internal/core/writerSessionTranscript.types";
