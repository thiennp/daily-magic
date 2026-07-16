import type { ReactElement } from "react";

import AppIcon from "@/components/ui/icon/AppIcon";
import type { MarketingTrustIconKey } from "@/features/marketing/types/MarketingTrustItem.type";
import { BoltIcon, CheckCircleIcon, LockIcon, PlugInIcon } from "@/icons";

const TRUST_ICON_MAP: Record<MarketingTrustIconKey, () => ReactElement> = {
  mac: () => <AppIcon icon={PlugInIcon} size="sm" />,
  shield: () => <AppIcon icon={LockIcon} size="sm" />,
  approval: () => <AppIcon icon={CheckCircleIcon} size="sm" />,
  connect: () => <AppIcon icon={BoltIcon} size="sm" />,
};

interface MarketingTrustIconProps {
  readonly icon: MarketingTrustIconKey;
}

export default function MarketingTrustIcon({ icon }: MarketingTrustIconProps) {
  return TRUST_ICON_MAP[icon]();
}
