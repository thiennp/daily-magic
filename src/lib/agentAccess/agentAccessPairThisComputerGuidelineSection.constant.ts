import { AWL_REPAIR_THIS_COMPUTER_POINTER_COPY } from "@/lib/agentAccess/awlRepairThisComputerPointerCopy.constant";

/** Guideline section "Pair this computer" (`/for-agents`, llms.txt). Ends with the repair docs pointer (COPY.md awl-hard-fix §6). */
export const AGENT_ACCESS_PAIR_THIS_COMPUTER_GUIDELINE_SECTION = {
  heading: "Pair this computer",
  body: [
    "get_install_command returns installCommand. Run that command in a shell on this computer.",
    "list_macs until this computer appears. Use its id as targetDeviceId.",
    AWL_REPAIR_THIS_COMPUTER_POINTER_COPY.guideline,
  ],
} as const;
