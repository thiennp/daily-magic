/** Project sync module S1 — public surface for AWC callers. */

export {
  PROJECT_SYNC_COMPUTER_OFFLINE_ERROR,
  PROJECT_SYNC_NEON_SUMMARY_MAX_CHARS,
  PROJECT_SYNC_RECONCILE_BATCH_SIZE,
  type ProjectSyncConnectionState,
  type ProjectSyncCursor,
  type ProjectSyncOfflineError,
  type ProjectSyncPageMeta,
  type ProjectSyncPageSource,
  type ProjectSyncVersion,
  type ProjectTaskUiStatus,
} from "@/features/projects/sync/projectSync.types";

export {
  loadPage,
  mergeProjectSyncEntries,
  type ProjectSyncLoadPageInput,
  type ProjectSyncLoadPageResult,
} from "@/features/projects/sync/projectSyncPager";

export {
  isProjectSyncLocalPaging,
  projectSyncConnectionFromProbe,
  reduceProjectSyncConnection,
  type ProjectSyncConnectionEvent,
} from "@/features/projects/sync/projectSyncConnection";

export {
  decodeProjectSyncCursor,
  encodeProjectSyncCursor,
} from "@/features/projects/sync/projectSyncCursor";

export {
  AWC_PROJECT_SYNC_MODULE_ENV,
  isProjectSyncModuleEnabled,
} from "@/features/projects/sync/projectSyncFlag";

export {
  ProjectSyncIdbSoftError,
  idbEntriesOrEmpty,
  softReadIdbEntries,
  softWriteIdbBatch,
  type ProjectSyncIdbFailureKind,
  type ProjectSyncIdbReadResult,
  type ProjectSyncIdbWriteBatchResult,
} from "@/features/projects/sync/projectSyncIdbSoftDegrade";

export {
  projectSyncIdbDbName,
  versionFromIdbRecord,
  classifyProjectSyncIdbFailure,
  clearProjectSyncAll,
  clearProjectSyncForProject,
  listProjectSyncByProject,
  listProjectSyncByProjectOrThrowSoft,
  readProjectSyncRow,
  readProjectSyncRowOrThrowSoft,
  resetProjectSyncIdbHolder,
  writeProjectSyncRow,
  writeProjectSyncRowOrThrowSoft,
  type ProjectSyncIdbPort,
  type ProjectSyncIdbRecord,
  type ProjectSyncIdbStoreId,
} from "@/features/projects/sync/projectSyncIdb";

export {
  PROJECT_SYNC_IDB_DB_NAME,
  PROJECT_SYNC_IDB_DB_VERSION,
  PROJECT_SYNC_TABLE_MESSENGER_CHATS,
  PROJECT_SYNC_TABLE_KEPT_RECIPIENTS,
  PROJECT_SYNC_TABLE_PROJECT_TASKS,
  PROJECT_SYNC_PROJECT_INDEX,
  type ProjectSyncTableId,
} from "@/features/projects/sync/projectSyncIdb.constant";

export { clearProjectSyncOnLeave } from "@/features/projects/sync/clearProjectSyncOnLeave";
export { clearProjectSyncOnSignOut } from "@/features/projects/sync/clearProjectSyncOnSignOut";

export {
  assertProjectTaskNeonMetaAllowlist,
  compareVersionProjectTask,
  keyOfProjectTask,
  mapProjectTaskStatusToUi,
  mergeLocalProjectTask,
  preferLocalDirtyOverNeonNewer,
  preferLocalOverNeonNewer,
  PROJECT_TASK_IDB_FIELDS,
  PROJECT_TASK_LOCAL_ONLY_FIELDS,
  PROJECT_TASK_NEON_FIELDS,
  PROJECT_TASKS_SCHEMA_VERSION,
  PROJECT_TASKS_TABLE_ID,
  projectTaskLocalFromAiSession,
  projectTasksAdapter,
  sortKeyProjectTask,
  toIdbProjectTask,
  toNeonMetaProjectTask,
  versionOfProjectTask,
  type ProjectTaskIdbRecord,
  type ProjectTaskLocalRecord,
  type ProjectTaskNeonMeta,
} from "@/features/projects/sync/adapters/projectTasksAdapter";

export {
  createdAtOfMessengerTimelineEntry,
  keyOfMessengerTimelineEntry,
  loadMessengerTimelinePage,
  MESSENGER_TIMELINE_SCHEMA_VERSION,
  MESSENGER_TIMELINE_TABLE_ID,
  messengerTimelineAdapter,
} from "@/features/projects/sync/adapters/messengerTimelineAdapter";

/** Dispatch Neon meta slice (pageNeon / allowlisted upsert / counts / IDB guard). */
export {
  mapNeonAgentRunToTimelineEntry,
  mergeNeonMessengerTimelinePage,
  neonMetaAdapter,
  pageNeonAgentRunSessions,
  pageNeonMessengerTimeline,
  resolvePageNeonMessengerTimeline,
  type NeonMetaPageResult,
  type PageNeonMessengerTimelineInput,
} from "@/features/projects/sync/adapters/neonMetaAdapter";

export {
  AGENT_RUN_SYNC_FORWARD_TRANSITIONS,
  PROJECT_TASK_NEON_BODY_FIELD_DENYLIST,
  PROJECT_TASK_NEON_META_ROW_CAP,
  PROJECT_TASK_NEON_META_STATUS_TOKENS,
  decideAgentRunSyncStatusWrite,
  mapAgentRunRowToTaskNeonMeta,
  mapProjectTaskUiStatusToAgentRun,
  pageNeonProjectTasks,
  pickProjectTaskNeonMetaAllowlist,
  projectTasksNeonMetaAdapter,
  purgeProjectTaskNeonMetaBeyondCap,
  sanitizeNeonMetaRefName,
  scrubNeonMetaTitle,
  type DecideAgentRunSyncStatusWriteInput,
  type DecideAgentRunSyncStatusWriteResult,
} from "@/features/projects/sync/adapters/projectTasksNeonMeta";

export {
  createPushNeonMetaPort,
  gateProjectTaskNeonMetaBatch,
  upsertProjectTaskNeonMeta,
  type PushNeonMetaPort as DispatchPushNeonMetaPort,
  type UpsertProjectTaskNeonMetaResult,
} from "@/features/projects/sync/adapters/upsertProjectTaskNeonMeta";

export {
  PROJECT_TASK_PLAN_MAX_BY_PLAN,
  countProjectTaskNeonMeta,
  formatProjectTaskPlanHint,
  loadProjectTaskPlanCounts,
  resolveProjectTaskPlanMax,
  type ProjectTaskPlanCounts,
} from "@/features/projects/sync/adapters/loadProjectTaskPlanCounts";

export {
  classifyIdbError,
  decideNeonUpsertGivenIdb,
  gateNeonUpsertAfterIdb,
  softIdbCall,
  type IdbFailureKind,
  type IdbReadResult,
  type NeonUpsertDecision,
} from "@/features/projects/sync/adapters/neonMetaIdbGuard";

