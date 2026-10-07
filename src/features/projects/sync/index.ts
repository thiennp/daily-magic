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
  type ProjectSyncIdbPort,
  type ProjectSyncIdbRecord,
  type ProjectSyncIdbStoreId,
} from "@/features/projects/sync/projectSyncIdb";

export {
  assertProjectTaskNeonMetaAllowlist,
  compareVersionProjectTask,
  keyOfProjectTask,
  mapProjectTaskStatusToUi,
  mergeLocalProjectTask,
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
