import type { MarketplaceRunPhase } from "@/lib/marketplace/runRecipe/MarketplaceRunPhase.constant";

export type MarketplaceRunPhaseWriterRoute = {
  readonly phase: MarketplaceRunPhase;
  readonly cheaperModelEligible: boolean;
  /**
   * Marketplace catalog cheap-tier model id (HOLD until Magi/Archi paste).
   * null → same default writer model as write stage.
   */
  readonly catalogModelId: string | null;
};
