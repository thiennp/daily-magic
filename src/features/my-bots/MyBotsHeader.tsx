"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import {
  APP_SURFACE_CTA_PRIMARY_SM_CLASS,
  APP_SURFACE_PAGE_DESCRIPTION_CLASS,
  APP_SURFACE_PAGE_TITLE_CLASS,
} from "@/components/surfaces/appSurfaceStyles.constant";
import { PlusIcon } from "@/icons";

interface MyBotsHeaderProps {
  readonly claimOpen: boolean;
  readonly onToggleClaim: () => void;
}

export default function MyBotsHeader({
  claimOpen,
  onToggleClaim,
}: MyBotsHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <header className="min-w-0 flex-1 basis-[360px]">
        <h1 className={APP_SURFACE_PAGE_TITLE_CLASS}>{MY_BOTS_COPY.title}</h1>
        <p className={APP_SURFACE_PAGE_DESCRIPTION_CLASS}>
          {MY_BOTS_COPY.description}
        </p>
      </header>
      <button
        type="button"
        id="claim-btn"
        className={`${APP_SURFACE_CTA_PRIMARY_SM_CLASS} gap-2`}
        aria-expanded={claimOpen}
        aria-controls="claim-card"
        onClick={onToggleClaim}
      >
        <AppIcon icon={PlusIcon} size="sm" />
        {MY_BOTS_COPY.claimOpen}
      </button>
    </div>
  );
}
