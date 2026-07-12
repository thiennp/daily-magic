import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";

export default function mapPublishedCapabilityToPlaybookTemplate(
  capability: PublishedCapabilityRecord,
): LibraryPlaybookTemplate {
  return {
    id: capability.id,
    name: capability.name,
    type: capability.type,
    exampleRequest: capability.exampleRequest,
    workflowFields: capability.workflowFields,
  };
}
