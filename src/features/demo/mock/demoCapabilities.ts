import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

import { demoTimestamp } from "./demoTimestamp.constant";

export const demoCapabilities: readonly PublishedCapabilityRecord[] = [
  {
    id: "cap-demo-assistant",
    ownerUserId: "user-demo-alex",
    groupId: "group-demo-product",
    type: CapabilityType.AGENT,
    name: "My assistant",
    description: "Runs everyday tasks on my Mac using my Agent Witch setup.",
    exampleRequest: "Summarize this document and save notes to my desktop.",
    visibility: "group",
    status: CapabilityStatus.PUBLISHED,
    dispatchPolicyOverride: null,
    harnessSetSlug: "demo-assistant",
    currentVersionId: "ver-demo-1",
    workflowFields: [],
    forkedFromCapabilityId: null,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
  {
    id: "cap-demo-weekly-report",
    ownerUserId: "user-demo-alex",
    groupId: "group-demo-product",
    type: CapabilityType.WORKFLOW,
    name: "Weekly report workflow",
    description: "Collects numbers and drafts a short weekly update.",
    exampleRequest: "Run the weekly report for Daily Magic GmbH.",
    visibility: "group",
    status: CapabilityStatus.PUBLISHED,
    dispatchPolicyOverride: "approval",
    harnessSetSlug: "demo-weekly-report",
    currentVersionId: "ver-demo-2",
    workflowFields: [
      { key: "weekOf", label: "Week of", type: "text", required: true },
      {
        key: "highlights",
        label: "Highlights",
        type: "textarea",
        required: true,
      },
    ],
    forkedFromCapabilityId: null,
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
  {
    id: "cap-demo-forked-research",
    ownerUserId: "user-demo-alex",
    groupId: "group-demo-product",
    type: CapabilityType.AGENT,
    name: "Competitor scan (copy)",
    description:
      "Saved from Jordan's research assistant. Summarize competitors and list differentiators.",
    exampleRequest: "Research competitors for our onboarding flow.",
    visibility: "private",
    status: CapabilityStatus.DRAFT,
    dispatchPolicyOverride: null,
    harnessSetSlug: null,
    currentVersionId: null,
    workflowFields: [],
    forkedFromCapabilityId: "cap-demo-jordan-research",
    createdAt: demoTimestamp,
    updatedAt: demoTimestamp,
  },
];
