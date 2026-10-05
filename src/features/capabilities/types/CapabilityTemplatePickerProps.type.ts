import type SaveCapabilityTemplateOutcome from "@/features/capabilities/types/SaveCapabilityTemplateOutcome.type";

export default interface CapabilityTemplatePickerProps {
  readonly onSaved?: () => void;
  readonly saveTemplate?: (
    templateId: string,
    projectId: string,
  ) => Promise<SaveCapabilityTemplateOutcome>;
  readonly saveButtonLabel?: string;
  readonly savedButtonLabel?: string;
  /** Current project when the picker is opened inside a project. */
  readonly contextProjectId?: string;
}
