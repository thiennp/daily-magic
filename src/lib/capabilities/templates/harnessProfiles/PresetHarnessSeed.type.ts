import type { PresetHarnessProfile } from "@/lib/capabilities/templates/harnessProfiles/PresetHarnessProfile.type";

export interface PresetHarnessSeed {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly description: string;
  readonly exampleRequest: string;
  readonly profile: PresetHarnessProfile;
}
