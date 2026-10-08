"use client";

import {
  APP_SURFACE_PAGE_DESCRIPTION_CLASS,
  APP_SURFACE_PAGE_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { useSyncExternalStore } from "react";

import useHomeAttentionRuns from "@/features/home/hooks/useHomeAttentionRuns";
import {
  readHomeAttentionTotal,
  subscribeHomeAttentionTotal,
} from "@/features/home/utils/homeAttentionTotalStore";
import buildHomeGreeting from "@/features/home/utils/buildHomeGreeting";

interface HomePageHeadProps {
  readonly displayName: string;
  readonly attentionCount?: number;
  readonly isBrandNew?: boolean;
}

/** Design page-head: title "Home" + one-line greeting (24h-aware). */
export default function HomePageHead({
  displayName,
  attentionCount,
  isBrandNew = false,
}: HomePageHeadProps) {
  const attentionRuns = useHomeAttentionRuns();
  const panelTotal = useSyncExternalStore(
    subscribeHomeAttentionTotal,
    readHomeAttentionTotal,
    () => null,
  );
  const resolvedAttentionCount =
    attentionCount ?? panelTotal ?? attentionRuns.length;

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-2">
        <h1
          id="home-page-title"
          tabIndex={-1}
          className={APP_SURFACE_PAGE_TITLE_CLASS}
        >
          Home
        </h1>
        <p className={APP_SURFACE_PAGE_DESCRIPTION_CLASS} id="home-greeting">
          {buildHomeGreeting({
            displayName,
            attentionCount: resolvedAttentionCount,
            isBrandNew,
          })}
        </p>
      </div>
    </header>
  );
}
