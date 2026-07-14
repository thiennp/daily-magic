import resolveHarnessItemPath from "@/lib/agentWitch/harness/resolveHarnessItemPath";
import type { ParsedCapabilityHarnessItem } from "@/lib/capabilities/parseCapabilityHarnessItems";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const mapHarnessItemsToTemplateHarness = (
  playbookName: string,
  harnessSetSlug: string,
  items: readonly ParsedCapabilityHarnessItem[],
): CapabilityTemplateHarness => ({
  slug: harnessSetSlug,
  name: `${playbookName} harness`,
  items: items.map((item) => ({
    id: item.id,
    kind: item.kind,
    title: item.title,
    path: resolveHarnessItemPath(item.kind, item.title),
    content: item.content,
  })),
});

export default mapHarnessItemsToTemplateHarness;
