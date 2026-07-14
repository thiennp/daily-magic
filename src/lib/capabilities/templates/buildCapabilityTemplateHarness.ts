import buildTemplateHarnessItemContents from "@/lib/capabilities/templates/buildTemplateHarnessItemContents";
import type { CapabilityTemplateHarness } from "@/lib/capabilities/templates/types/CapabilityTemplate.type";
import type { CapabilityTypeValue } from "@/lib/capabilities/CapabilityType.constant";

interface BuildCapabilityTemplateHarnessInput {
  readonly id: string;
  readonly name: string;
  readonly type: CapabilityTypeValue;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
}

const buildCapabilityTemplateHarness = (
  input: BuildCapabilityTemplateHarnessInput,
): CapabilityTemplateHarness => ({
  slug: `template-${input.id}`,
  name: `${input.name} harness`,
  items: buildTemplateHarnessItemContents(input),
});

export default buildCapabilityTemplateHarness;
