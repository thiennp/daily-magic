"use client";

import MyBotOwnedGrokWebhookForm from "@/features/my-bots/MyBotOwnedGrokWebhookForm";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

interface MyBotRowProps {
  readonly bot: OwnedBotView;
  readonly unclaiming: boolean;
  readonly onUnclaim: () => void;
}

export default function MyBotRow({
  bot,
  unclaiming,
  onUnclaim,
}: MyBotRowProps) {
  const label = bot.displayName ?? bot.tokenPrefix;
  return (
    <li className="rounded-lg border border-awc-border/80 p-3 dark:border-gray-800/80">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-awc-fg dark:text-white">
            {label}
          </p>
          <p className="text-[11px] text-awc-fg-muted dark:text-gray-400">
            {bot.tokenPrefix}… · {bot.botUserId.slice(0, 8)}…
          </p>
        </div>
        <button
          type="button"
          className={AWC_PROJECT_ACCESS_CTA.danger}
          disabled={unclaiming}
          onClick={onUnclaim}
        >
          {unclaiming ? MY_BOTS_COPY.unclaiming : MY_BOTS_COPY.unclaim}
        </button>
      </div>
      {bot.memberships.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {bot.memberships.map((membership) => (
            <li key={membership.membershipId} className="text-xs">
              <p className="text-awc-fg dark:text-gray-300">
                {MY_BOTS_COPY.membershipLabel}: {membership.projectName}
                {membership.projectDisplayName
                  ? ` · ${membership.projectDisplayName}`
                  : ""}
              </p>
              <MyBotOwnedGrokWebhookForm
                projectId={membership.projectId}
                membershipId={membership.membershipId}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}
