import { CAPABILITY_TEMPLATE_PICKER_VISIBLE_COUNT } from "@/features/capabilities/constants/capabilityTemplatePicker.constant";

interface CapabilityTemplateShowAllButtonProps {
  readonly totalCount: number;
  readonly showAll: boolean;
  readonly tabLabel: string;
  readonly onToggle: () => void;
}

export default function CapabilityTemplateShowAllButton({
  totalCount,
  showAll,
  tabLabel,
  onToggle,
}: CapabilityTemplateShowAllButtonProps) {
  if (totalCount <= CAPABILITY_TEMPLATE_PICKER_VISIBLE_COUNT) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
    >
      {showAll
        ? `Show fewer ${tabLabel.toLowerCase()}`
        : `Show all ${tabLabel.toLowerCase()} (${totalCount})`}
    </button>
  );
}
