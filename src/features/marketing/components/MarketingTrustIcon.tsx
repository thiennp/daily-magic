import type { ReactElement } from "react";

import { MARKETING_ACCENT_EMERALD_CLASSES } from "@/features/marketing/marketingPalette.constant";
import type { MarketingTrustIconKey } from "@/features/marketing/types/MarketingTrustItem.type";
import {
  CheckCircleIcon,
  DocsIcon,
  LockIcon,
  PlugInIcon,
} from "@/icons";

const ACCENT_ICON_CLASS = `h-4 w-4 shrink-0 ${MARKETING_ACCENT_EMERALD_CLASSES.icon}`;

const TRUST_ICON_MAP: Record<MarketingTrustIconKey, () => ReactElement> = {
  mac: () => <PlugInIcon className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />,
  shield: () => <LockIcon className={ACCENT_ICON_CLASS} aria-hidden />,
  approval: () => <CheckCircleIcon className={ACCENT_ICON_CLASS} aria-hidden />,
  history: () => <DocsIcon className="h-4 w-4 shrink-0 text-zinc-500" aria-hidden />,
};

interface MarketingTrustIconProps {
  readonly icon: MarketingTrustIconKey;
}

export default function MarketingTrustIcon({ icon }: MarketingTrustIconProps) {
  return TRUST_ICON_MAP[icon]();
}
