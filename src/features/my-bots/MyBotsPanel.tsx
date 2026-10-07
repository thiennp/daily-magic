"use client";

import AssistantEntitlementLimitNote from "@/features/billing/components/AssistantEntitlementLimitNote";
import MyBotRow from "@/features/my-bots/MyBotRow";
import MyBotsClaimForm from "@/features/my-bots/MyBotsClaimForm";
import { useMyBotsPanel } from "@/features/my-bots/hooks/useMyBotsPanel";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";

export default function MyBotsPanel() {
  const panel = useMyBotsPanel();
  return (
    <div className="space-y-4">
      <MyBotsClaimForm
        code={panel.code}
        submitting={panel.claiming}
        error={panel.claimError}
        onCodeChange={panel.setCode}
        onSubmit={panel.claim}
      />
      <AssistantEntitlementLimitNote connectedCount={panel.bots.length} />
      <div>
        <h3 className="text-sm font-semibold text-awc-fg dark:text-white">
          {MY_BOTS_COPY.listHeading}
        </h3>
        {panel.listError ? (
          <p className="mt-1 text-xs text-red-600">{panel.listError}</p>
        ) : null}
        {panel.bots.length === 0 ? (
          <p className="mt-1 text-sm text-awc-fg-muted">{MY_BOTS_COPY.listEmpty}</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {panel.bots.map((bot) => (
              <MyBotRow
                key={bot.tokenId}
                bot={bot}
                unclaiming={panel.unclaimingId === bot.tokenId}
                onUnclaim={() => panel.unclaim(bot.tokenId)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
