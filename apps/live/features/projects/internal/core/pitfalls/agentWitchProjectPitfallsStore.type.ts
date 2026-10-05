import type {
  AgentWitchProjectPitfall,
  AgentWitchProjectPitfallUpsert,
} from "./agentWitchProjectPitfall.type";

export type ListAgentWitchPitfallsResult =
  | {
      readonly ok: true;
      readonly items: readonly AgentWitchProjectPitfall[];
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
 * Today: `createCloudAgentWitchProjectPitfallsStore` (cloud is the source of
 * truth). AW Mac's SQLite cache (`feat/awl-pitfall-cache`: listPitfalls /
 * getPitfall / upsertPitfall / recordHit / matchPitfalls) can wrap this store
 * as write-through (upsert cloud, then refresh local) without changing the
 * tab or the POST handler — they depend on this interface only.
 */
export interface AgentWitchProjectPitfallsStore {
  readonly listPitfalls: (
    projectId: string,
    options: { readonly includeRetired: boolean },
  ) => Promise<ListAgentWitchPitfallsResult>;
  readonly upsertPitfall: (
    projectId: string,
    pitfall: AgentWitchProjectPitfallUpsert,
  ) => Promise<UpsertAgentWitchPitfallResult>;
}
