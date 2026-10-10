"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import {
  MK_CARD_BASE_CLASS,
  MK_CARD_NAME_CLASS,
  MK_TICON_CLASS,
} from "@/features/marketplace/public-api/types";
import MyBotOwnedGrokWebhookForm from "@/features/my-bots/MyBotOwnedGrokWebhookForm";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { buildMyBotMetaLines } from "@/features/my-bots/utils/buildMyBotMetaLines";
import { AWC_PROJECT_ACCESS_CTA } from "@/features/projects/access/awcProjectAccessCta.constant";
import { FolderIcon, TrashBinIcon } from "@/icons";
import type { OwnedBotView } from "@/lib/agentAccess/claimBot/listOwnedBots";

interface MyBotRowProps {
  readonly bot: OwnedBotView;
  readonly unclaiming: boolean;
  readonly onUnclaim: () => void;
}

const initials = (label: string): string =>
  label
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function MyBotRow({
  bot,
  unclaiming,
  onUnclaim,
}: MyBotRowProps) {
  const label = bot.displayName ?? bot.tokenPrefix;
  const meta = buildMyBotMetaLines(bot);
  return (
    <li className={`${MK_CARD_BASE_CLASS} hover:translate-y-0`}>
      <div className="flex min-w-0 items-start gap-3">
        <span
          className={`${MK_TICON_CLASS} bg-awc-tile font-bold text-awc-fg`}
          aria-hidden
        >
          {initials(label)}
        </span>
        <h3 className={`${MK_CARD_NAME_CLASS} min-w-0 break-words`}>{label}</h3>
      </div>
      <p className="flex items-center gap-2 text-sm text-awc-fg-muted">
        <AppIcon icon={FolderIcon} size="sm" />
        {meta.project}
      </p>
      <p className="text-xs text-awc-fg-subtle">{meta.claimed}</p>
      {bot.memberships.map((membership) => (
        <div key={membership.membershipId} className="text-xs">
          <p className="text-awc-fg">
            {MY_BOTS_COPY.membershipLabel}: {membership.projectName}
          </p>
          <p className="text-awc-fg-subtle">
            {membership.grokWebhookRegistered
              ? MY_BOTS_COPY.wakesOnItsOwn
              : MY_BOTS_COPY.checksOnDemand}
          </p>
          <MyBotOwnedGrokWebhookForm
            projectId={membership.projectId}
            membershipId={membership.membershipId}
          />
        </div>
      ))}
      <div className="mt-auto">
        <button
          type="button"
          className={`${AWC_PROJECT_ACCESS_CTA.danger} gap-1.5`}
          disabled={unclaiming}
          aria-label={`${MY_BOTS_COPY.unclaim} ${label}`}
          onClick={onUnclaim}
        >
          <AppIcon icon={TrashBinIcon} size="sm" />
          {unclaiming ? MY_BOTS_COPY.unclaiming : MY_BOTS_COPY.unclaim}
        </button>
      </div>
    </li>
  );
}
