import type { ReactElement } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import { MARKETING_ACCENT_EMERALD_CLASSES } from "@/features/marketing/marketingPalette.constant";
import type { MarketingTrustIconKey } from "@/features/marketing/types/MarketingTrustItem.type";
import { BoltIcon, CheckCircleIcon, LockIcon, PlugInIcon } from "@/icons";

const TRUST_ICON_MAP: Record<MarketingTrustIconKey, () => ReactElement> = {
  mac: () => <AppIcon icon={PlugInIcon} size="sm" className="text-zinc-500" />,
  shield: () => (
    <AppIcon
      icon={LockIcon}
      size="sm"
      className={MARKETING_ACCENT_EMERALD_CLASSES.icon}
    />
  ),
  approval: () => (
    <AppIcon
      icon={CheckCircleIcon}
      size="sm"
      className={MARKETING_ACCENT_EMERALD_CLASSES.icon}
    />
  ),
  connect: () => (
    <AppIcon icon={BoltIcon} size="sm" className="text-zinc-500" />
  ),
};

interface MarketingTrustIconProps {
  readonly icon: MarketingTrustIconKey;
}

export default function MarketingTrustIcon({ icon }: MarketingTrustIconProps) {
  return TRUST_ICON_MAP[icon]();
}
