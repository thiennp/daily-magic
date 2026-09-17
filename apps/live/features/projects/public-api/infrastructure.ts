export type { default as AgentWitchProjectView } from "../internal/core/agentWitchProjectView.type";

export {
  fetchAgentWitchProjectsForLocalApp,
  type FetchAgentWitchProjectsForLocalAppResult,
} from "../internal/core/fetchAgentWitchProjectsForLocalApp";

export {
  findAgentWitchProjectById,
  mapAgentWitchCloudProjectsToViews,
} from "../internal/core/mapAgentWitchCloudProjectsToViews";

export {
  addAgentWitchLocalProjectToRegistry,
  findAgentWitchLocalProjectById,
  readAgentWitchLocalProjectsRegistry,
  type AgentWitchLocalProjectRegistryEntry,
} from "../internal/core/agentWitchLocalProjectsRegistry";

export { default as expandAgentWitchProjectFolderPath } from "../internal/core/expandAgentWitchProjectFolderPath";

export { ensureAgentWitchProjectFolder } from "../internal/core/ensureAgentWitchProjectFolder";

export { listLinkedHarnessSetSlugsFromProjectFolder } from "../internal/core/listLinkedHarnessSetSlugsFromProjectFolder";

export { default as shouldCaptureRunOutputForProjectKnowledge } from "../internal/core/knowledge/shouldCaptureRunOutputForProjectKnowledge";

export { default as distillProjectKnowledgeLesson } from "../internal/core/knowledge/distillProjectKnowledgeLesson";

export { default as syncProjectKnowledgeCandidateToCloud } from "../internal/core/knowledge/syncProjectKnowledgeCandidateToCloud";

export { pickMacOsFolderDialog } from "../internal/core/pickMacOsFolderDialog";

export { syncAgentWitchLocalProjectsFromCloud } from "../internal/core/syncAgentWitchLocalProjectsFromCloud";

export { updateAgentWitchCloudProjectFolder } from "../internal/core/updateAgentWitchCloudProjectFolder";

export { migrateLegacyProjectsRegistryToCloud } from "../internal/core/migrateLegacyProjectsRegistryToCloud";

export { readLegacyAgentWitchProjectsRegistry } from "../internal/core/readLegacyAgentWitchProjectsRegistry";

export {
  claimAgentRunFromCloud,
  completeAgentRunOnCloud,
  createAgentWitchCloudProject,
  fetchAgentWitchCloudProjects,
  parseAgentWitchHeartbeatResponse,
  parseAgentWitchPollResponse,
  pollAgentWitchCommand,
  postAgentWitchDeviceHeartbeat,
  postAgentWitchMessage,
  reportLocalAutomationRunToCloud,
  syncProjectHarnessBindingsToCloud,
  resolveAgentWitchCloudApiConfig,
  startLocalSelfDispatchOnCloud,
  type AgentWitchCloudApiConfig,
  type AgentWitchCloudProject,
  type AgentWitchHeartbeatResponse,
  type ClaimedCloudAgentRun,
} from "../internal/core/agentWitchCloudApi";
