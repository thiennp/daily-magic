"use client";

import { useCallback, useState } from "react";

import MarketingCard from "@/features/marketing/MarketingCard";
import { MARKETING_CARD_INTERACTIVE_CLASSES } from "@/features/marketing/marketingInteractiveClasses.constant";
import {
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
} from "@/features/marketing/marketingSurfaceClasses.constant";
import { mergeMarketingClasses } from "@/features/marketing/mergeMarketingClasses";

import HomeMarketingPopularPresetSignInDialog from "./HomeMarketingPopularPresetSignInDialog";
import type { HomePopularPresetSummary } from "@/features/home/utils/resolveHomePopularPresets";

interface HomeMarketingPopularPresetsGridProps {
  readonly presets: readonly HomePopularPresetSummary[];
}

export default function HomeMarketingPopularPresetsGrid({
  presets,
}: HomeMarketingPopularPresetsGridProps) {
  const [selectedPreset, setSelectedPreset] =
    useState<HomePopularPresetSummary | null>(null);
  const closeDialog = useCallback(() => {
    setSelectedPreset(null);
  }, []);

  return (
    <>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {presets.map((preset) => (
          <li key={preset.id}>
            <button
              type="button"
              className="block h-full w-full text-left"
              onClick={() => {
                setSelectedPreset(preset);
              }}
            >
              <MarketingCard
                as="article"
                interactive
                className={mergeMarketingClasses(
                  "flex h-full flex-col gap-3 p-5",
                  MARKETING_CARD_INTERACTIVE_CLASSES,
                )}
              >
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {preset.category}
                </p>
                <h3
                  className={mergeMarketingClasses(
                    "text-sm font-semibold",
                    MARKETING_TEXT_PRIMARY_CLASSES,
                  )}
                >
                  {preset.name}
                </h3>
                <p
                  className={mergeMarketingClasses(
                    "line-clamp-3 text-sm leading-relaxed",
                    MARKETING_TEXT_SECONDARY_CLASSES,
                  )}
                >
                  {preset.description}
                </p>
              </MarketingCard>
            </button>
          </li>
        ))}
      </ul>
      <HomeMarketingPopularPresetSignInDialog
        preset={selectedPreset}
        onClose={closeDialog}
      />
    </>
  );
}
