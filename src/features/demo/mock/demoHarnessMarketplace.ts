import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type HarnessMarketplaceListing from "@/lib/harness/types/HarnessMarketplaceListing.type";

import { demoTimestamp } from "./demoTimestamp.constant";

export const demoHarnessMarketplaceListings: readonly HarnessMarketplaceListing[] =
  [
    {
      capabilityId: "cap-demo-assistant",
      ownerUserId: "user-demo-alex",
      ownerEmail: "alex@demo.local",
      ownerName: "Alex Demo",
      type: CapabilityType.AGENT,
      name: "My assistant",
      description: "Runs everyday tasks on my Mac using my Agent Witch setup.",
      exampleRequest: "Summarize this document and save notes to my desktop.",
      visibility: "group",
      workflowFields: [],
      harnessSetSlug: "demo-assistant",
      harnessSetName: "Assistant bundle",
      harnessItemCount: 4,
      isOnline: true,
      hostname: "alex-macbook.demo",
    },
    {
      capabilityId: "cap-demo-weekly-report",
      ownerUserId: "user-demo-alex",
      ownerEmail: "alex@demo.local",
      ownerName: "Alex Demo",
      type: CapabilityType.WORKFLOW,
      name: "Weekly report workflow",
      description: "Collects numbers and drafts a short weekly update.",
      exampleRequest: "Run the weekly report for Daily Magic GmbH.",
      visibility: "group",
      workflowFields: [
        { key: "weekOf", label: "Week of", type: "text", required: true },
        {
          key: "highlights",
          label: "Highlights",
          type: "textarea",
          required: true,
        },
      ],
      harnessSetSlug: "demo-weekly-report",
      harnessSetName: "Weekly report bundle",
      harnessItemCount: 3,
      isOnline: true,
      hostname: "alex-macbook.demo",
    },
  ];

export const demoHarnessMarketplaceBorrowManifest: Readonly<
  Record<string, Readonly<Record<string, unknown>>>
> = {
  "cap-demo-assistant": {
    version: 1,
    hostname: "alex-macbook.demo",
    updatedAt: demoTimestamp,
    activeSetSlugs: ["demo-assistant"],
    sets: {
      "demo-assistant": {
        slug: "demo-assistant",
        name: "Assistant bundle",
        version: 1,
        updatedAt: demoTimestamp,
        items: [
          { path: "rules/assistant.mdc", kind: "rule" },
          { path: "skills/summarize/SKILL.md", kind: "skill" },
          { path: "commands/daily-notes.md", kind: "command" },
          { path: "agents/note-taker.md", kind: "agent" },
        ],
      },
    },
  },
  "cap-demo-weekly-report": {
    version: 1,
    hostname: "alex-macbook.demo",
    updatedAt: demoTimestamp,
    activeSetSlugs: ["demo-weekly-report"],
    sets: {
      "demo-weekly-report": {
        slug: "demo-weekly-report",
        name: "Weekly report bundle",
        version: 1,
        updatedAt: demoTimestamp,
        items: [
          { path: "workflows/weekly-report.md", kind: "workflow" },
          { path: "rules/report-style.mdc", kind: "rule" },
          { path: "commands/run-weekly-report.md", kind: "command" },
        ],
      },
    },
  },
};
