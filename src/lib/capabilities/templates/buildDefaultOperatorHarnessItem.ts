import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";
import type { CapabilityTemplateHarnessItem } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";

interface BuildDefaultOperatorHarnessItemInput {
  readonly id: string;
  readonly name: string;
  readonly type: CapabilityTypeValue;
}

const buildDefaultOperatorHarnessItem = (
  input: BuildDefaultOperatorHarnessItemInput,
): CapabilityTemplateHarnessItem => {
  const isWorkflow = input.type === CapabilityType.WORKFLOW;

  return {
    id: `${input.id}-operator-prep`,
    kind: "operator",
    title: isWorkflow ? "Prepare workflow inputs" : "Prepare your Mac",
    path: `operator/${input.id}-prep.md`,
    content: isWorkflow
      ? [
          "1. Fill in every required workflow field in the task composer.",
          "2. Skim the inputs for missing context before you send the task.",
          "3. Reply in the live terminal when the agent asks for confirmation.",
        ].join("\n")
      : [
          "1. Confirm Agent Witch is running on your Mac.",
          "2. Verify the Mac is online in the task composer before sending.",
          "3. Reply in the live terminal when the agent asks for confirmation.",
        ].join("\n"),
  };
};

export default buildDefaultOperatorHarnessItem;
