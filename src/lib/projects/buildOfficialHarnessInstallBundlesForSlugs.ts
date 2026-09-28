import buildHarnessInstallBundleFromTemplateHarness from "@/lib/agentWitch/harness/buildHarnessInstallBundleFromTemplateHarness";
import type HarnessInstallBundle from "@/lib/agentWitch/harness/types/HarnessInstallBundle.type";
import CAPABILITY_TEMPLATES from "@/lib/capabilities/templates/listCapabilityTemplates";

const findTemplateHarnessBySlug = (
  slug: string,
): (typeof CAPABILITY_TEMPLATES)[number]["harness"] | null => {
  const template = CAPABILITY_TEMPLATES.find(
    (candidate) => candidate.harness.slug === slug,
  );
  return template?.harness ?? null;
};

/** Official marketplace playbooks whose file bytes live in the template catalog. */
export const buildOfficialHarnessInstallBundlesForSlugs = (
  slugs: readonly string[],
): readonly HarnessInstallBundle[] => {
  const uniqueSlugs = [
    ...new Set(
      slugs.map((slug) => slug.trim()).filter((slug) => slug.length > 0),
    ),
  ];

  return uniqueSlugs.flatMap((slug) => {
    const harness = findTemplateHarnessBySlug(slug);
    if (harness === null) {
      return [];
    }

    const bundle = buildHarnessInstallBundleFromTemplateHarness(harness);
    return bundle.items.length > 0 ? [bundle] : [];
  });
};
