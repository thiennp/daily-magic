import type { AppIconComponent } from "@/components/ui/icon/appIconComponent.type";
import { DocsIcon, UserIcon } from "@/icons";
import {
  CapabilityType,
  type CapabilityTypeValue,
} from "@/lib/capabilities/CapabilityType.constant";

/**
 * Type chrome maps live CapabilityType → Claude HTML v2 play/bot colours.
 * workflow → play (blue); agent → bot/assistant (violet). No harness-set type in API.
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
  borderClass: "border-t-[3px] border-t-[#2457f0]",
  iconWrapClass: "bg-[#e1ebff] text-[#2457f0]",
  chipClass: "bg-[#e1ebff] text-[#1b45c8]",
};

const AGENT_CHROME: MarketplaceListingTypeChrome = {
  label: "Assistant",
  plural: "Assistants",
  icon: UserIcon as unknown as AppIconComponent,
  borderClass: "border-t-[3px] border-t-[#7c3aed]",
  iconWrapClass: "bg-[#f0e8ff] text-[#7c3aed]",
  chipClass: "bg-[#f0e8ff] text-[#5b21b6]",
};

export const resolveMarketplaceListingTypeChrome = (
  type: CapabilityTypeValue,
): MarketplaceListingTypeChrome =>
  type === CapabilityType.WORKFLOW ? WORKFLOW_CHROME : AGENT_CHROME;
