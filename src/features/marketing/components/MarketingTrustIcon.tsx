import type { ReactElement } from "react";

import type { MarketingTrustIconKey } from "@/features/marketing/types/MarketingTrustItem.type";
import {
  CheckCircleIcon,
  DocsIcon,
  LockIcon,
  PlugInIcon,
} from "@/icons";

const TRUST_ICON_MAP: Record<MarketingTrustIconKey, () => ReactElement> = {
  mac: () => <PlugInIcon className="h-4 w-4 shrink-0" aria-hidden />,
  shield: () => <LockIcon className="h-4 w-4 shrink-0" aria-hidden />,
  approval: () => (
    <CheckCircleIcon className="h-4 w-4 shrink-0" aria-hidden />
  ),
  history: () => <DocsIcon className="h-4 w-4 shrink-0" aria-hidden />,
};

interface MarketingTrustIconProps {
  readonly icon: MarketingTrustIconKey;
}

export default function MarketingTrustIcon({ icon }: MarketingTrustIconProps) {
  return TRUST_ICON_MAP[icon]();
}
