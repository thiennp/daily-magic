"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { HOME_MARKETING_POPULAR_PRESETS_COPY } from "@/features/home/constants/public-api/types";
import type { HomePopularPresetSummary } from "@/features/home/utils/public-api/types";
import {
  applyPresetCapabilityIdToSearchParams,
  buildPathWithSearchParams,
} from "@/features/home/utils/public-api/presentation";
import {
  useMarketingAuthModal,
  MarketingCard,
} from "@/features/marketing/public-api/presentation";
import {
  MARKETING_CTA_SECONDARY_CLASSES,
  MARKETING_EYEBROW_TEXT_CLASSES,
  MARKETING_TEXT_PRIMARY_CLASSES,
  MARKETING_TEXT_SECONDARY_CLASSES,
  mergeMarketingClasses,
} from "@/features/marketing/public-api/types";

interface HomeMarketingPopularPresetsGridProps {
  readonly presets: readonly HomePopularPresetSummary[];
}

export default function HomeMarketingPopularPresetsGrid({
  presets,
}: HomeMarketingPopularPresetsGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const authModal = useMarketingAuthModal();
  const pickWorkflow = useCallback(
    (preset: HomePopularPresetSummary) => {
      const nextParams = applyPresetCapabilityIdToSearchParams(
        preset.id,
        searchParams,
      );
      router.replace(buildPathWithSearchParams(pathname, nextParams), {
        scroll: false,
      });
      authModal?.open("up", `Create a free account to use “${preset.name}”.`);
    },
    [authModal, pathname, router, searchParams],
  );

  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {presets.map((preset) => (
        <li key={preset.id}>
          <MarketingCard
            as="article"
            className="flex h-full flex-col gap-3 p-5"
          >
            <p
              className={mergeMarketingClasses(
                "text-xs font-medium tracking-wide",
                MARKETING_EYEBROW_TEXT_CLASSES,
              )}
            >
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
                "line-clamp-4 flex-1 text-sm leading-relaxed",
                MARKETING_TEXT_SECONDARY_CLASSES,
              )}
            >
              {preset.description}
            </p>
            <button
              type="button"
              aria-label={`Use workflow: ${preset.name}`}
              className={mergeMarketingClasses(
                "self-start",
                MARKETING_CTA_SECONDARY_CLASSES,
              )}
              onClick={() => {
                pickWorkflow(preset);
              }}
            >
              {HOME_MARKETING_POPULAR_PRESETS_COPY.useWorkflow}
            </button>
          </MarketingCard>
        </li>
      ))}
    </ul>
  );
}
