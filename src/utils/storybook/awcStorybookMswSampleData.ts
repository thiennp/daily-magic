import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { CapabilityVisibility } from "@/lib/capabilities/CapabilityVisibility.constant";
import {
  SAMPLE_WORKFLOW_CAPABILITY_NAME,
  SAMPLE_WORKFLOW_DESCRIPTION,
  SAMPLE_WORKFLOW_EXAMPLE_REQUEST,
  SAMPLE_WORKFLOW_FIELDS,
} from "@/lib/capabilities/sampleWorkflowCapability.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";
import { DispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import {
  AWC_STORYBOOK_SAMPLE_PROJECT,
  AWC_STORYBOOK_USER,
} from "@/utils/storybook/awcStorybookFixtures";

export const AWC_STORYBOOK_SAMPLE_DEVICE = {
  id: "device-storybook-1",
  tokenHash: "abc123",
  platform: "macos",
  deviceLabel: "Storybook Mac",
  displayName: "Storybook Mac",
  claimedAt: "2026-01-01T00:00:00.000Z",
  lastSeenAt: "2026-10-01T00:00:00.000Z",
  isConnected: true,
  isOnline: true,
  presenceTier: "live",
  isDispatchReady: true,
  lastHeartbeatAt: "2026-10-01T00:00:00.000Z",
  installBundleVersion: "200",
  wakePort: 47892,
};

export const AWC_STORYBOOK_SAMPLE_CAPABILITY: PublishedCapabilityRecord = {
  id: "cap-storybook-sample",
  ownerUserId: "user-storybook",
  groupId: null,
  type: CapabilityType.WORKFLOW,
  name: SAMPLE_WORKFLOW_CAPABILITY_NAME,
  description: SAMPLE_WORKFLOW_DESCRIPTION,
  exampleRequest: SAMPLE_WORKFLOW_EXAMPLE_REQUEST,
  visibility: CapabilityVisibility.PRIVATE,
  status: CapabilityStatus.PUBLISHED,
  dispatchPolicyOverride: null,
  harnessSetSlug: null,
  currentVersionId: "ver-storybook-sample",
  workflowFields: SAMPLE_WORKFLOW_FIELDS,
  workflowOutputFields: [],
  operatorSteps: [],
  forkedFromCapabilityId: null,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-03-01T00:00:00.000Z",
};

export const AWC_STORYBOOK_SAMPLE_RUN: EnrichedAgentRunRecord = {
  id: "run-storybook-1",
  groupId: null,
  requesterUserId: "user-storybook",
  executorUserId: "user-storybook",
  requesterEmail: AWC_STORYBOOK_USER.email,
  executorEmail: AWC_STORYBOOK_USER.email,
  requesterName: AWC_STORYBOOK_USER.name,
  executorName: AWC_STORYBOOK_USER.name,
  prompt:
    "Summarize open PRs for daily-magic and post a short status to Slack.",
  status: AgentRunStatus.COMPLETED,
  dispatchPolicy: DispatchPolicy.OPEN,
  resultOutput: "Posted status update to #engineering.",
  resultExitCode: 0,
  resultOutcomeCode: null,
  denialReason: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:01:00.000Z",
  startedAt: "2026-10-01T00:00:10.000Z",
  completedAt: "2026-10-01T00:01:00.000Z",
  approvalExpiresAt: null,
  capabilityId: "cap-storybook-sample",
  capabilityVersionId: "ver-storybook-sample",
  deviceId: AWC_STORYBOOK_SAMPLE_DEVICE.id,
  projectId: AWC_STORYBOOK_SAMPLE_PROJECT.id,
  compositionSnapshotId: null,
  writerAgent: "cursor-cli",
  lastRunHeartbeatAt: null,
  reportSummary: "Completed · 50s · exit 0",
  estimateSeconds: 120,
  actualSeconds: 50,
};
