/**
 * AWC project-sync IndexedDB constants.
 *
 * Soft pick §11.4 (safest coexistence): keep physical DB name `awc-chat`
 * (Soft tip lineage) and bump schema version. Messenger stores keep their
 * names; `projectTasks` is added on upgrade. Per-user rename to
 * `awc-project-sync:<userId>` is deferred — browser profile is one signed-in
 * user; privacy is enforced via clearAll (sign-out) + clearProject (leave).
 * Never store tokens / keys / env.
 */
export const PROJECT_SYNC_IDB_DB_NAME = "awc-chat";
/** v1 = Soft tip messengerChats + keptRecipients; v2 = + projectTasks. */
export const PROJECT_SYNC_IDB_DB_VERSION = 2;

export const PROJECT_SYNC_TABLE_MESSENGER_CHATS = "messengerChats";
export const PROJECT_SYNC_TABLE_KEPT_RECIPIENTS = "keptRecipients";
export const PROJECT_SYNC_TABLE_PROJECT_TASKS = "projectTasks";

export const PROJECT_SYNC_PROJECT_INDEX = "projectId";

/** Known tableIds (object store names). */
export const PROJECT_SYNC_TABLE_IDS = [
  PROJECT_SYNC_TABLE_MESSENGER_CHATS,
  PROJECT_SYNC_TABLE_KEPT_RECIPIENTS,
  PROJECT_SYNC_TABLE_PROJECT_TASKS,
] as const;

export type ProjectSyncTableId = (typeof PROJECT_SYNC_TABLE_IDS)[number];
