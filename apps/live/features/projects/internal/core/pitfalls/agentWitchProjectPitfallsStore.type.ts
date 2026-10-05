import type {
  ProjectPitfallUpsert,
  ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";

export type ListAgentWitchPitfallsResult =
  | {
      readonly ok: true;
      readonly items: readonly ProjectPitfallView[];
      readonly syncedAt: string | null;
    }
  | { readonly ok: false; readonly reason: "unavailable" };

export type UpsertAgentWitchPitfallResult =
  | { readonly ok: true }
  | {
      readonly ok: false;
      readonly reason: "active_limit" | "rejected" | "unavailable";
    };

/**
 * Adapter seam for the AWL Pitfalls tab.
 *
 * - Cloud SoT client: `createCloudAgentWitchProjectPitfallsStore`
 * - Mac SQLite cache: `createMacAgentWitchProjectPitfallsStore` (write-through
 *   cloud → local via `createPitfallRegistry`; AWL tab reads SQLite hits)
 * AWC keeps its own cloud list routes — this seam is AWL-only.
 */
export interface AgentWitchProjectPitfallsStore {
  readonly listPitfalls: (
    projectId: string,
    options: { readonly includeRetired: boolean },
  ) => Promise<ListAgentWitchPitfallsResult>;
  readonly upsertPitfall: (
    projectId: string,
    pitfall: ProjectPitfallUpsert,
  ) => Promise<UpsertAgentWitchPitfallResult>;
}
