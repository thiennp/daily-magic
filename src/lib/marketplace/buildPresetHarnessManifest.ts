import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import { OFFICIAL_PRESET_MARKETPLACE_HOSTNAME } from "@/lib/marketplace/officialPresetMarketplace.constants";

const buildPresetHarnessManifest = (
  harness: CapabilityTemplateHarness,
  updatedAt: string,
): Readonly<Record<string, unknown>> => ({
  version: 1,
  hostname: OFFICIAL_PRESET_MARKETPLACE_HOSTNAME,
  updatedAt,
  activeSetSlugs: [harness.slug],
  sets: {
    [harness.slug]: {
      slug: harness.slug,
      name: harness.name,
      version: 1,
      updatedAt,
      items: harness.items.map((item) => ({
        id: item.id,
        kind: item.kind,
        title: item.title,
        path: item.path,
        content: item.content,
      })),
    },
  },
});

export default buildPresetHarnessManifest;
