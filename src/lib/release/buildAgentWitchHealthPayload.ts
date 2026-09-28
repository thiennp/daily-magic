import {
  readAgentWitchServerRelease,
  type AgentWitchServerRelease,
} from "@/lib/release/readAgentWitchServerRelease";
import { readDeviceSupersessionMigrationApplied } from "@/lib/release/readDeviceSupersessionMigrationApplied";

export interface AgentWitchHealthPayload {
  readonly ok: true;
  readonly release: AgentWitchServerRelease;
  readonly deviceSupersessionMigrationApplied: boolean;
}

export const buildAgentWitchHealthPayload =
  async (): Promise<AgentWitchHealthPayload> => {
    const release = readAgentWitchServerRelease();
    const deviceSupersessionMigrationApplied =
      await readDeviceSupersessionMigrationApplied().catch(() => false);

    return {
      ok: true,
      release,
      deviceSupersessionMigrationApplied,
    };
  };
