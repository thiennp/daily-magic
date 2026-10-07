"use client";

import AppIcon from "@/components/ui/icon/AppIcon";
import { COMPANIES_RULES_HUB_COPY } from "@/features/admin/companiesRulesHubCopy.constant";
import { GearIcon } from "@/icons";

interface GroupCompanySettingsGearButtonProps {
  readonly className: string;
  readonly companyName?: string;
  readonly onOpen: () => void;
}

export default function GroupCompanySettingsGearButton({
  className,
  companyName,
  onOpen,
}: GroupCompanySettingsGearButtonProps) {
  const ariaLabel = companyName
    ? `${COMPANIES_RULES_HUB_COPY.companySettings} for ${companyName}`
    : COMPANIES_RULES_HUB_COPY.companySettingsGearAria;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={className}
      onClick={onOpen}
    >
      <AppIcon icon={GearIcon} size="sm" />
    </button>
  );
}
