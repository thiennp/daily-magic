import type {
  ProjectTaskPriority,
  ProjectTaskStatus,
} from "@/lib/projects/tasks/projectTaskTools.constant";

export const TASK_SYNC_PROVIDERS = ["linear"] as const;
export type TaskSyncProviderId = (typeof TASK_SYNC_PROVIDERS)[number];

/** The four task fields that sync both ways (no assignee in v1). */
export type TaskSyncFields = {
  readonly title: string;
  readonly status: ProjectTaskStatus;
  readonly priority: ProjectTaskPriority | null;
  readonly description: string | null;
};

export type ExternalTaskRef = {
  readonly externalId: string;
  readonly identifier: string;
  readonly url: string;
};

export type TaskSyncSettings = {
  readonly projectId: string;
  readonly provider: TaskSyncProviderId;
  readonly enabled: boolean;
  readonly externalTeamId: string | null;
  readonly importNew: boolean;
  readonly webhookId: string | null;
  readonly webhookSecretCiphertext: string | null;
  readonly webhookSecretIv: string | null;
  readonly lastError: string | null;
  readonly lastSyncedAt: string | null;
  /** Watermark of the "Sync now" pull (null = never pulled). */
  readonly lastPulledAt: string | null;
};

export type TaskExternalLink = ExternalTaskRef & {
  readonly taskId: string;
  readonly lastSyncedHash: string | null;
  /** Non-null: the provider description is longer than the AW cap; hash of the AW text at last sync. */
  readonly clippedDescriptionHash: string | null;
};

/** Parsed provider webhook event, provider-neutral. */
export type ParsedTaskWebhook =
  | { readonly kind: "ignore" }
  | { readonly kind: "unlink"; readonly externalId: string }
  | {
      readonly kind: "upsert";
      readonly ref: ExternalTaskRef;
      readonly teamId: string | null;
      /** Status already resolved from state type + Blocked label. */
      readonly fields: TaskSyncFields;
      /** False when the payload had no label list (blocked unknown). */
      readonly labelsKnown: boolean;
      /** The provider description was longer than the AW cap. */
      readonly descriptionClipped: boolean;
    };

/** Adapter a task tracker (Linear now, Jira later) implements. */
export type TaskSyncProvider = {
  readonly id: TaskSyncProviderId;
  readonly pushTask: (input: {
    readonly projectId: string;
    readonly teamId: string;
    readonly fields: TaskSyncFields;
    readonly existing: ExternalTaskRef | null;
    /** Client-generated issue id used when `existing` is null. */
    readonly createId: string;
    /** False: leave the provider description untouched on update. */
    readonly sendDescription: boolean;
  }) => Promise<ExternalTaskRef>;
  readonly parseWebhook: (payload: unknown) => ParsedTaskWebhook;
};
