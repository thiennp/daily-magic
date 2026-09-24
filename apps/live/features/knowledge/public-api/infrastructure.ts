export {
  queryAgentWitchRag,
  readAgentWitchRagChunks,
  indexAgentWitchRagText,
  formatRagContextForPrompt,
} from "../internal/core/agentWitchLocalRag";
export {
  computeAgentWitchKnowledgeSuggestions,
  getAgentWitchChunkRetrievalCount,
  readAgentWitchKnowledgeUsageStats,
  recordAgentWitchErrorOccurrence,
} from "../internal/core/agentWitchLocalKnowledgeUsage";
export {
  formatErrorKnowledgeContextForPrompt,
  indexAgentWitchErrorKnowledgeText,
  queryAgentWitchErrorKnowledge,
} from "../internal/core/agentWitchLocalErrorKnowledge";
