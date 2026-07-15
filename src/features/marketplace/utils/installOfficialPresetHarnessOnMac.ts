import { fetchCapabilityTemplateDetail } from "@/features/capabilities/utils/capabilityTemplatesApi";
import type { BorrowImportStatus } from "@/features/harness/hooks/types/BorrowImportStatus.type";
import type HarnessItemWriteSpec from "@/lib/agentWitch/harness/types/HarnessItemWriteSpec.type";
import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const installOfficialPresetHarnessOnMac = async (input: {
  readonly templateId: string;
  readonly sendCreateHarnessSet: (request: {
    readonly name: string;
    readonly writerAgent: HarnessWriterAgent;
    readonly slug?: string;
  }) => void;
  readonly sendWriteHarnessItems: (request: {
    readonly writerAgent: HarnessWriterAgent;
    readonly items: readonly HarnessItemWriteSpec[];
  }) => void;
  readonly setBorrowImportStatus: (status: BorrowImportStatus) => void;
  readonly setBorrowImportMessage: (message: string | null) => void;
}): Promise<void> => {
  input.setBorrowImportStatus("importing");
  input.setBorrowImportMessage(null);

  const detail = await fetchCapabilityTemplateDetail(input.templateId);

  if (detail === null) {
    input.setBorrowImportStatus("error");
    input.setBorrowImportMessage("Could not load this starter.");
    return;
  }

  input.sendCreateHarnessSet({
    name: detail.harness.name,
    writerAgent: "claude-cli",
    slug: detail.harness.slug,
  });

  const items: readonly HarnessItemWriteSpec[] = detail.harness.items.map(
    (item) => ({
      id: item.id,
      kind: item.kind,
      title: item.title,
      content: item.content,
      setSlugs: [detail.harness.slug],
    }),
  );

  if (items.length > 0) {
    input.sendWriteHarnessItems({
      writerAgent: "claude-cli",
      items,
    });
  }

  input.setBorrowImportStatus("done");
  input.setBorrowImportMessage(
    `Requested install of ${detail.harness.name} on your Mac.`,
  );
};
