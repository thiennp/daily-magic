import renderPresetHarnessItems from "@/lib/capabilities/templates/harnessProfiles/renderPresetHarness";
import type { PresetHarnessSeed } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessSeed.type";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

const buildGroupHarness = (
  presets: readonly PresetHarnessSeed[],
): Record<string, readonly CapabilityTemplateHarnessItem[]> =>
  Object.fromEntries(
    presets.map((preset) => [
      preset.id,
      renderPresetHarnessItems({
        id: preset.id,
        name: preset.name,
        category: preset.category,
        description: preset.description,
        exampleRequest: preset.exampleRequest,
        profile: preset.profile,
      }),
    ]),
  );

export default buildGroupHarness;
