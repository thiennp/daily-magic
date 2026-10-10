"use client";

import { useState } from "react";

import { AssistantEntitlementLimitNote } from "@/features/billing/public-api/presentation";
import { MK_GRID_CLASS } from "@/features/marketplace/public-api/types";
import MyBotRow from "@/features/my-bots/MyBotRow";
import MyBotUnclaimModal from "@/features/my-bots/MyBotUnclaimModal";
import MyBotsClaimForm from "@/features/my-bots/MyBotsClaimForm";
import MyBotsHeader from "@/features/my-bots/MyBotsHeader";
import {
  MyBotsEmpty,
  MyBotsLoadError,
  MyBotsLoading,
  MyBotsNoMatch,
} from "@/features/my-bots/MyBotsListStates";
import MyBotsFilterChips from "@/features/my-bots/MyBotsFilterChips";
import MyBotsToolbar from "@/features/my-bots/MyBotsToolbar";
import { useMyBotsPanel } from "@/features/my-bots/hooks/useMyBotsPanel";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import {
  countMyBotsByProject,
  filterMyBotsByProject,
  type MyBotsProjectFilter,
} from "@/features/my-bots/utils/filterMyBotsByProject";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

export default function MyBotsPanel() {
  const panel = useMyBotsPanel();
  const [pendingUnclaim, setPendingUnclaim] = useState<OwnedBotView | null>(
    null,
  );
  const [projectFilter, setProjectFilter] =
    useState<MyBotsProjectFilter>("all");
  const shownBots = filterMyBotsByProject(panel.visibleBots, projectFilter);
  const ready = panel.status === "ok";
  const list = (() => {
    if (panel.status === "loading") return <MyBotsLoading />;
    if (panel.status === "error")
      return <MyBotsLoadError onRetry={panel.retry} />;
    if (panel.bots.length === 0) {
      return <MyBotsEmpty onClaim={() => panel.setClaimOpen(true)} />;
    }
    if (shownBots.length === 0) {
      return (
        <MyBotsNoMatch
          query={panel.query}
          onClear={() => {
            panel.setQuery("");
            setProjectFilter("all");
          }}
        />
      );
    }
    return (
      <ul className={MK_GRID_CLASS}>
        {shownBots.map((bot) => (
          <MyBotRow
            key={bot.tokenId}
            bot={bot}
            unclaiming={panel.unclaimingId === bot.tokenId}
            onUnclaim={() => setPendingUnclaim(bot)}
          />
        ))}
      </ul>
    );
  })();
  return (
    <div className="space-y-5">
      <MyBotsHeader
        claimOpen={panel.claimOpen}
        onToggleClaim={() => panel.setClaimOpen(!panel.claimOpen)}
      />
      {panel.claimOpen ? (
        <MyBotsClaimForm
          code={panel.code}
          submitting={panel.claiming}
          error={panel.claimError}
          onCodeChange={panel.setCode}
          onSubmit={panel.claim}
          onClose={() => panel.setClaimOpen(false)}
        />
      ) : null}
      <AssistantEntitlementLimitNote connectedCount={panel.bots.length} />
      {ready && panel.bots.length > 0 ? (
        <MyBotsToolbar
          query={panel.query}
          shown={shownBots.length}
          total={panel.bots.length}
          onQueryChange={panel.setQuery}
        />
      ) : null}
      {ready && panel.bots.length > 0 ? (
        <MyBotsFilterChips
          filter={projectFilter}
          counts={countMyBotsByProject(panel.visibleBots)}
          onFilter={setProjectFilter}
        />
      ) : null}
      {panel.unclaimError !== null ? (
        <p role="alert" className="text-sm text-red-700">
          {panel.unclaimError}
        </p>
      ) : null}
      <div
        aria-busy={panel.status === "loading"}
        aria-label={MY_BOTS_COPY.title}
      >
        {list}
      </div>
      <MyBotUnclaimModal
        botName={
          pendingUnclaim === null
            ? null
            : (pendingUnclaim.displayName ?? pendingUnclaim.tokenPrefix)
        }
        onCancel={() => setPendingUnclaim(null)}
        onConfirm={() => {
          if (pendingUnclaim !== null) panel.unclaim(pendingUnclaim.tokenId);
          setPendingUnclaim(null);
        }}
      />
    </div>
  );
}
