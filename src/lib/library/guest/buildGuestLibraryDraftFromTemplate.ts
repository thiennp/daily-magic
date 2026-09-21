import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplateDetail } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type GuestLibraryDraft from "@/lib/library/guest/types/GuestLibraryDraft.type";

const buildGuestLibraryDraftFromTemplate = (
  template: CapabilityTemplateDetail,
): GuestLibraryDraft => {
  const now = new Date().toISOString();

  return {
    localId: crypto.randomUUID(),
    remoteCapabilityId: null,
    sourceTemplateId: template.id,
    type: template.type,
    name: template.name,
    description: template.description,
    exampleRequest: template.exampleRequest,
    workflowFields:
      template.type === CapabilityType.WORKFLOW ? template.workflowFields : [],
    harnessItems: template.harness.items.map((item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      content: item.content,
    })),
    harnessSetSlug: template.harness.slug,
    createdAt: now,
    updatedAt: now,
  };
};

export default buildGuestLibraryDraftFromTemplate;
