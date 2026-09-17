import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../..",
);

const write = (relativePath: string, content: string): void => {
  const filePath = path.join(ROOT, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
};

write(
  "apps/live/features/local-server/public-api/infrastructure.ts",
  `export {
  AGENT_WITCH_LOCAL_APP_HOST,
  AGENT_WITCH_LOCAL_APP_LOOPBACK_ORIGIN,
  AGENT_WITCH_LOCAL_APP_ORIGIN,
  AGENT_WITCH_LOCAL_APP_PORT,
} from "../internal/core/agentWitchLocalApp.constants";

export { formatAgentWitchRelativeTimeAgo } from "../internal/core/formatAgentWitchRelativeTimeAgo";

export {
  reviveAgentWitchProcessViaLaunchctl,
  resolveLocalAppPublicKey,
  startAgentWitchLocalApp,
  type AgentWitchLocalAppControllers,
} from "../internal/core/startAgentWitchLocalApp";
`,
);

write(
  "apps/live/features/local-server/public-api/presentation.ts",
  `/** AWL slice \`local-server\` — no HTML builders (router only). */
export {};
`,
);

write(
  "apps/live/features/shell/public-api/presentation.ts",
  `export {
  buildAgentWitchLocalAppShell,
  type AgentWitchLocalAppNavPath,
} from "../internal/core/buildAgentWitchLocalAppShell";

export { buildAgentWitchLocalCloudBanner } from "../internal/core/buildAgentWitchLocalCloudBanner";

export {
  buildAgentWitchLocalInstallUpdateFlashHtml,
  buildAgentWitchLocalInstallUpdateHeaderButtonHtml,
  buildAgentWitchLocalInstallUpdatePromptHtml,
  type AgentWitchLocalInstallUpdateFlash,
} from "../internal/core/buildAgentWitchLocalInstallUpdatePromptHtml";
`,
);

write(
  "apps/live/features/shell/public-api/infrastructure.ts",
  `export { AGENT_WITCH_LOCAL_APP_STYLES } from "../internal/core/agentWitchLocalAppStyles";

export { formatAgentWitchInstallBundleVersionLabel } from "../internal/core/formatAgentWitchInstallBundleVersionLabel";

export { resolveAgentWitchLocalCloudAppOrigin } from "../internal/core/resolveAgentWitchLocalCloudAppOrigin";

export { resolveAgentWitchLocalInstallUpdateOffer } from "../internal/core/resolveAgentWitchLocalInstallUpdateOffer";

export { shouldShowAgentWitchLocalReviveButton } from "../internal/core/shouldShowAgentWitchLocalReviveButton";

export { triggerAgentWitchLocalInstallBundleUpdate } from "../internal/core/triggerAgentWitchLocalInstallBundleUpdate";
`,
);

write(
  "apps/live/features/shell/public-api/types.ts",
  `export type { AgentWitchLocalAppNavPath } from "../internal/core/buildAgentWitchLocalAppShell";
`,
);

write(
  "apps/live/features/home/public-api/presentation.ts",
  `export { buildAgentWitchLocalHomePageBody } from "../internal/core/buildAgentWitchLocalHomePage";
`,
);

write(
  "apps/live/features/home/public-api/infrastructure.ts",
  `/** AWL slice \`home\` — presentation-only dashboard. */
export {};
`,
);

write(
  "apps/live/features/home/public-api/types.ts",
  `/** AWL slice \`home\` — types (none exported yet). */
export {};
`,
);

write(
  "apps/live/features/tasks/public-api/presentation.ts",
  `export { buildAgentWitchLocalTaskPageBody } from "../internal/core/buildAgentWitchLocalTaskPage";
`,
);

write(
  "apps/live/features/tasks/public-api/infrastructure.ts",
  `export { runLocalSelfDelegatedTask } from "../internal/core/runLocalSelfDelegatedTask";
`,
);

write(
  "apps/live/features/tasks/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/projects/public-api/infrastructure.ts",
  `export {
  addAgentWitchLocalProjectToRegistry,
  findAgentWitchLocalProjectById,
  readAgentWitchLocalProjectsRegistry,
} from "../internal/core/agentWitchLocalProjectsRegistry";

export { ensureAgentWitchProjectFolder } from "../internal/core/ensureAgentWitchProjectFolder";

export { pickMacOsFolderDialog } from "../internal/core/pickMacOsFolderDialog";

export { syncAgentWitchLocalProjectsFromCloud } from "../internal/core/syncAgentWitchLocalProjectsFromCloud";

export { updateAgentWitchCloudProjectFolder } from "../internal/core/updateAgentWitchCloudProjectFolder";

export {
  resolveAgentWitchCloudApiConfig,
  type AgentWitchCloudApiConfig,
} from "../internal/core/agentWitchCloudApi";
`,
);

write(
  "apps/live/features/projects/public-api/presentation.ts",
  `export { buildAgentWitchLocalProjectDetailPageBody } from "../internal/core/buildAgentWitchLocalProjectDetailPage";

export { buildAgentWitchLocalProjectsPageBody } from "../internal/core/buildAgentWitchLocalProjectsPage";
`,
);

write(
  "apps/live/features/projects/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/harness/public-api/infrastructure.ts",
  `export { applyInstalledHarnessSetsToProjectCursor } from "../internal/core/applyInstalledHarnessSetsToProjectCursor";

export { parseHarnessSubmitFormBody } from "../internal/core/buildAgentWitchLocalHarnessPage";

export { parseHarnessInstallBundle } from "../internal/core/parseHarnessInstallBundle";

export { readAgentWitchProjectHarnessSetSlugs } from "../internal/core/readAgentWitchProjectHarnessLink";

export { readInstalledLocalHarnessSnapshot } from "../internal/core/readInstalledLocalHarnessSnapshot";

export { buildDefaultLocalHarnessScanFolder } from "../internal/core/localHarness/defaultLocalHarnessScanRoots";

export { mergeLocalHarnessRevealWithCursorDir } from "../internal/core/localHarness/mergeLocalHarnessRevealWithCursorDir";

export { assertReadableFileUnderHome } from "../internal/core/localHarness/pathSafety";

export { streamLocalHarnessReveal } from "../internal/core/localHarness/streamLocalHarnessReveal";

export {
  clearLocalHarnessRevealCache,
  readLocalHarnessRevealCache,
  submitLocalHarnessSelection,
  writeLocalHarnessRevealCache,
} from "../internal/core/localHarness/submitLocalHarnessSelection";
`,
);

write(
  "apps/live/features/harness/public-api/presentation.ts",
  `export { buildAgentWitchLocalHarnessPageBody } from "../internal/core/buildAgentWitchLocalHarnessPage";
`,
);

write(
  "apps/live/features/harness/public-api/types.ts",
  `export type { LocalHarnessRevealResult } from "../internal/core/localHarness/revealLocalHarnessCandidates.types";
`,
);

write(
  "apps/live/features/knowledge/public-api/infrastructure.ts",
  `export {
  queryAgentWitchRag,
  readAgentWitchRagChunks,
  indexAgentWitchRagText,
  formatRagContextForPrompt,
} from "../internal/core/agentWitchLocalRag";
`,
);

write(
  "apps/live/features/knowledge/public-api/presentation.ts",
  `export {};
`,
);

write(
  "apps/live/features/knowledge/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/memory/public-api/infrastructure.ts",
  `export {
  appendAgentWitchMemoryEntry,
  formatMemoryContextForPrompt,
  readAgentWitchMemoryEntries,
} from "../internal/core/agentWitchLocalMemory";
`,
);

write(
  "apps/live/features/memory/public-api/presentation.ts",
  `export {};
`,
);

write(
  "apps/live/features/memory/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/writer-settings/public-api/presentation.ts",
  `export { buildAgentWitchLocalWriterApiPageBody } from "../internal/core/buildAgentWitchLocalWriterApiPage";
`,
);

write(
  "apps/live/features/writer-settings/public-api/infrastructure.ts",
  `export {};
`,
);

write(
  "apps/live/features/writer-settings/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/status-health/public-api/presentation.ts",
  `export { buildAgentWitchLocalHeartbeatElapsedMarkup } from "../internal/core/buildAgentWitchLocalHeartbeatElapsedMarkup";

export { buildAgentWitchLocalStatusTraceSection } from "../internal/core/buildAgentWitchLocalStatusTraceSection";

export { AGENT_WITCH_LOCAL_HEARTBEAT_ELAPSED_LIVE_SCRIPT } from "../internal/core/buildAgentWitchLocalHeartbeatElapsedMarkup";
`,
);

write(
  "apps/live/features/status-health/public-api/infrastructure.ts",
  `export { formatAgentWitchHeartbeatElapsed } from "../internal/core/formatAgentWitchHeartbeatElapsed";
`,
);

write(
  "apps/live/features/status-health/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/diagnostics/public-api/infrastructure.ts",
  `export {
  appendAgentWitchLocalTraffic,
  clearAgentWitchLocalTraffic,
  readAgentWitchLocalTraffic,
  type AgentWitchLocalTrafficEntry,
} from "../internal/core/agentWitchLocalTrafficLog";

export {
  clearAgentWitchLocalWsTrace,
  readAgentWitchLocalWsTrace,
  recordAgentWitchLocalTraceEvent,
  recordAgentWitchWsTraceFromObject,
  type AgentWitchLocalWsTraceEntry,
} from "../internal/core/agentWitchLocalWsTraceLog";

export {
  clearAgentWitchErrorLog,
  readAgentWitchErrorLogTail,
} from "../internal/core/readAgentWitchErrorLogTail";
`,
);

write(
  "apps/live/features/diagnostics/public-api/presentation.ts",
  `export { buildAgentWitchLocalErrorLogPageBody } from "../internal/core/buildAgentWitchLocalErrorLogPage";
`,
);

write(
  "apps/live/features/diagnostics/public-api/types.ts",
  `export {};
`,
);

write(
  "apps/live/features/automations/public-api/infrastructure.ts",
  `export {
  readLocalAutomationStore,
  writeLocalAutomationStore,
} from "../internal/core/agentWitchLocalAutomationStore";

export { tickAgentWitchScheduledAutomations } from "../internal/core/tickAgentWitchScheduledAutomations";
`,
);

write(
  "apps/live/features/automations/public-api/presentation.ts",
  `export {};
`,
);

write(
  "apps/live/features/automations/public-api/types.ts",
  `export type { AgentWitchLocalAutomation } from "../internal/core/agentWitchLocalAutomation.types";
`,
);

process.stdout.write("Wrote AWL public-api barrels\\n");
