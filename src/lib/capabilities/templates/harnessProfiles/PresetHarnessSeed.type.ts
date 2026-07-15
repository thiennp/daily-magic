import type { PresetHarnessProfile } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessProfile.type";
import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export interface PresetHarnessSeed {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
  readonly operatorSteps?: readonly OperatorStepDefinition[];
}
