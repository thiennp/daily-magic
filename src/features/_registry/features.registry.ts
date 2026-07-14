import type { FeatureRegistryEntry } from "@/features/_registry/featureRegistry.types";
import registryData from "@/features/_registry/features.registry.json";

export const FEATURE_REGISTRY =
  registryData.features as readonly FeatureRegistryEntry[];

export const findFeatureBySlug = (
  slug: string,
): FeatureRegistryEntry | undefined =>
  FEATURE_REGISTRY.find((entry) => entry.slug === slug);
