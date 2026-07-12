import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import { createPublishedCapability } from "@/lib/capabilities/createPublishedCapability";
import { publishCapabilityVersion } from "@/lib/capabilities/publishCapabilityVersion";
import { listPublishedCapabilitiesForOwner } from "@/lib/capabilities/capabilityQueries";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

const DEFAULT_AGENT_NAME = "My assistant";
const DEFAULT_AGENT_DESCRIPTION =
  "Runs tasks on my Mac using my Agent Witch setup.";
const DEFAULT_AGENT_EXAMPLE =
  "Summarize this document and save notes to my desktop.";

export async function ensureDefaultAgentCapability(
  ownerUserId: string,
): Promise<PublishedCapabilityRecord> {
  const existing = await listPublishedCapabilitiesForOwner(ownerUserId);
  const publishedAgent = existing.find(
    (capability) =>
      capability.type === CapabilityType.AGENT &&
      capability.status === CapabilityStatus.PUBLISHED,
  );

  if (publishedAgent) {
    return publishedAgent;
  }

  const draftAgent = existing.find(
    (capability) => capability.type === CapabilityType.AGENT,
  );

  if (draftAgent) {
    const published = await publishCapabilityVersion(
      draftAgent.id,
      ownerUserId,
      "Initial publish",
    );
    if (published) {
      return published;
    }
  }

  const created = await createPublishedCapability({
    ownerUserId,
    name: DEFAULT_AGENT_NAME,
    description: DEFAULT_AGENT_DESCRIPTION,
    exampleRequest: DEFAULT_AGENT_EXAMPLE,
  });
  const published = await publishCapabilityVersion(
    created.id,
    ownerUserId,
    "Initial publish",
  );

  return published ?? created;
}
