import { HOME_POPULAR_PRESET_IDS } from "@/features/home/constants/homePopularPresetIds.constant";
import findCapabilityTemplateById from "@/lib/capabilities/templates/findCapabilityTemplateById";

export interface HomePopularPresetSummary {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
}

const resolveHomePopularPresets = (): readonly HomePopularPresetSummary[] =>
  HOME_POPULAR_PRESET_IDS.map((id) => {
    const template = findCapabilityTemplateById(id);

    if (!template) {
      throw new Error(`Missing popular preset template: ${id}`);
    }

    return {
      id: template.id,
      name: template.name,
      description: template.description,
      category: template.category,
    };
  });

export default resolveHomePopularPresets;
