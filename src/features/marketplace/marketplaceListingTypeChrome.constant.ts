import type { AppIconComponent } from "@/components/ui/icon/appIconComponent.type";
import { DocsIcon, UserIcon } from "@/icons";
import {
  CapabilityType,
  type CapabilityTypeValue,
} from "@/lib/capabilities/CapabilityType.constant";

/**
 * Type chrome maps live CapabilityType to playbook / assistant chrome.
 * workflow = playbook (accent-soft + awc-blue); agent = sand + accent-soft / awc-blue.
 * No harness-set type in API. No Claude violet.
 */
export interface MarketplaceListingTypeChrome {
  readonly label: string;
  readonly plural: string;
  readonly icon: AppIconComponent;
  readonly borderClass: string;
  readonly iconWrapClass: string;
  readonly chipClass: string;
}

const WORKFLOW_CHROME: MarketplaceListingTypeChrome = {
  label: "Playbook",
  plural: "Playbooks",
  icon: DocsIcon as unknown as AppIconComponent,
  borderClass: "border-t-[3px] border-t-awc-blue-600",
  iconWrapClass: "bg-awc-accent-soft text-awc-blue-600",
  chipClass: "bg-awc-accent-soft-2 text-awc-blue-700",
};

const AGENT_CHROME: MarketplaceListingTypeChrome = {
  label: "Assistant",
  plural: "Assistants",
  icon: UserIcon as unknown as AppIconComponent,
  borderClass: "border-t-[3px] border-t-awc-border-strong",
  iconWrapClass: "bg-awc-accent-soft text-awc-blue-700",
  chipClass: "bg-awc-accent-soft text-awc-blue-800",
};

export const resolveMarketplaceListingTypeChrome = (
  type: CapabilityTypeValue,
): MarketplaceListingTypeChrome =>
  type === CapabilityType.WORKFLOW ? WORKFLOW_CHROME : AGENT_CHROME;
