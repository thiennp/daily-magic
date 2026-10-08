"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import { MY_BOTS_COPY } from "@/features/my-bots/myBotsCopy.constant";
import { CloseIcon } from "@/icons";

export default function MyBotsClaimHead({
  onClose,
}: {
  readonly onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 id="cl-h" className="text-base font-semibold text-awc-fg">
        {MY_BOTS_COPY.claimHeading}
      </h3>
      <button
        type="button"
        aria-label={MY_BOTS_COPY.claimClose}
        className="inline-grid size-8 place-items-center rounded-md text-awc-fg-muted hover:bg-awc-fill"
        onClick={onClose}
      >
        <AppIcon icon={CloseIcon} size="sm" />
      </button>
    </div>
  );
}
