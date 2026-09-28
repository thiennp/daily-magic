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

const DEVICE_SUPERSESSION_MIGRATION_CACHE_MS = 60_000;

const deviceSupersessionMigrationCacheHolder: {
  value: {
    readonly value: boolean;
    readonly expiresAt: number;
  } | null;
} = { value: null };

const readDeviceSupersessionMigrationAppliedForHealth =
  async (): Promise<boolean> => {
    const now = Date.now();
    const cached = deviceSupersessionMigrationCacheHolder.value;
    if (cached !== null && cached.expiresAt > now) {
      return cached.value;
    }

    const value = await readDeviceSupersessionMigrationApplied().catch(
      () => false,
    );
    deviceSupersessionMigrationCacheHolder.value = {
      value,
      expiresAt: now + DEVICE_SUPERSESSION_MIGRATION_CACHE_MS,
    };

    return value;
  };

export const resetAgentWitchHealthPayloadCachesForTests = (): void => {
  deviceSupersessionMigrationCacheHolder.value = null;
};

export const buildAgentWitchHealthPayloadSync =
  (): AgentWitchHealthPayload => ({
    ok: true,
    release: readAgentWitchServerRelease(),
    deviceSupersessionMigrationApplied: false,
  });

export const buildAgentWitchHealthPayload =
  async (): Promise<AgentWitchHealthPayload> => {
    const release = readAgentWitchServerRelease();
    const deviceSupersessionMigrationApplied =
      await readDeviceSupersessionMigrationAppliedForHealth();

    return {
      ok: true,
      release,
      deviceSupersessionMigrationApplied,
    };
  };
