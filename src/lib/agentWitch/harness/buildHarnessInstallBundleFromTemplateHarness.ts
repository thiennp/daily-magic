import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

import type HarnessInstallBundle from "./types/HarnessInstallBundle.type";

const buildHarnessInstallBundleFromTemplateHarness = (
  harness: CapabilityTemplateHarness,
): HarnessInstallBundle => ({
  name: harness.name,
  slug: harness.slug,
  items: harness.items.map((item) => ({
    id: item.id,
    kind: item.kind,
    title: item.title,
    content: item.content,
    setSlugs: [harness.slug],
  })),
});

export default buildHarnessInstallBundleFromTemplateHarness;
