import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

/** Options for one writer prompt dispatch from Send-a-task. */
export interface WriterPromptDispatchOptions {
  readonly writerAgent: HarnessWriterAgent;
  readonly targetUserId?: string;
  readonly groupId?: string;
  readonly capabilityId?: string;
  readonly targetDeviceId?: string;
  readonly projectFolderPath?: string;
  readonly projectId: string;
  readonly runScopedComponentIds?: readonly string[];
  readonly fieldValues?: Readonly<Record<string, string>>;
  readonly useOfficialWorkflowOrchestration?: boolean;
  /** Composer Start: a new task, never a continuation of the open thread (FAIL1). */
  readonly freshStart?: boolean;
}
