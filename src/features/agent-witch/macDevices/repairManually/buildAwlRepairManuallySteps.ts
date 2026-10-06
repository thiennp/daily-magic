import {
  AWL_REPAIR_MANUALLY_COPY,
  AWL_REPAIR_MANUALLY_HEALTH_COMMAND,
  AWL_REPAIR_MANUALLY_UPDATE_COMMAND,
} from "@/features/agent-witch/macDevices/repairManually/awlRepairManuallyCopy.constant";
import { buildAgentWitchReviveAwlSteps } from "@/lib/agentWitch/buildAgentWitchReviveAwlTerminalCommand";

export interface AwlRepairManuallyCommand {
  /** OS label, only when more than one revive block is shown. */
  readonly label: string | null;
  readonly command: string;
  readonly note: string | null;
}

export interface AwlRepairManuallyStep {
  readonly id: "restart" | "update" | "reconnect" | "check";
  readonly title: string;
  readonly helper: string | null;
  readonly commands: readonly AwlRepairManuallyCommand[];
}

const single = (command: string): readonly AwlRepairManuallyCommand[] => [
  { label: null, command, note: null },
];

/**
 * Static Repair manually steps (no health poll in v1). Step 1 reuses the
 * ReviveAwlMacModal block for the browser OS + hostname-resolved install home.
 */
export const buildAwlRepairManuallySteps = (input: {
  readonly operatingSystem: string;
  readonly hostname?: string;
}): readonly AwlRepairManuallyStep[] => {
  const copy = AWL_REPAIR_MANUALLY_COPY;
  const revive = buildAgentWitchReviveAwlSteps(input);
  const showLabels = revive.length > 1;
  return [
    {
      id: "restart",
      title: copy.restartTitle,
      helper: null,
      commands: revive.map((step) => ({
        label: showLabels ? step.label : null,
        command: step.command,
        note: step.note,
      })),
    },
    {
      id: "update",
      title: copy.updateTitle,
      helper: copy.updateHelper,
      commands: single(AWL_REPAIR_MANUALLY_UPDATE_COMMAND),
    },
    {
      id: "reconnect",
      title: copy.reconnectTitle,
      helper: copy.reconnectHelper,
      commands: [],
    },
    {
      id: "check",
      title: copy.checkTitle,
      helper: copy.checkHelper,
      commands: single(AWL_REPAIR_MANUALLY_HEALTH_COMMAND),
    },
  ];
};
