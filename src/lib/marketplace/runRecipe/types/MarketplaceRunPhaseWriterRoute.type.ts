import type { MarketplaceRunPhase } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";

/**
 * Optional cheaper model routing for plan/estimate only.
 * `modelId` stays null until the Pimi contract defines defaults and org policy.
 */
export type MarketplaceRunPhaseWriterRoute = {
  readonly phase: MarketplaceRunPhase;
  readonly modelId: string | null;
};
