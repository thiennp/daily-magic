import type { AgentWitchLocalLayout } from "@agent-witch/install-layout/types";
import {
  createPitfallRegistry,
  resolveTokenSaverDbPath,
  type PitfallRegistry,
} from "@agent-witch/live-token-saver";
import {
  PITFALL_MAX_ACTIVE_PER_PROJECT,
  type Pitfall,
} from "@agent-witch/live-token-saver/types";
import type {
  ProjectPitfallUpsert,
  ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";

import type {
  AgentWitchProjectPitfallsStore,
  UpsertAgentWitchPitfallResult,
} from "./agentWitchProjectPitfallsStore.type";
import { mapLocalPitfallToView } from "./mapLocalPitfallToView";

export type CreateMacAgentWitchProjectPitfallsStoreInput = {
  /** Profile layout → `…/profiles/<email>/token-saver.db`. */
  readonly layout?: Pick<AgentWitchLocalLayout, "installDir" | "profileEmail">;
  /** Test seam: absolute DB path (never the real profile). */
  readonly dbPath?: string;
  /**
   * Optional cloud SoT client. When present, list refreshes local from cloud
   * content and upsert writes cloud first then local (write-through).
   * AWC keeps using its own cloud routes — this store is AWL-only.
   */
  readonly cloud?: AgentWitchProjectPitfallsStore | null;
};

const openRegistry = (
  input: CreateMacAgentWitchProjectPitfallsStoreInput,
): PitfallRegistry | null => {
  try {
    if (input.dbPath !== undefined) {
      return createPitfallRegistry({ dbPath: input.dbPath });
    }
    if (input.layout !== undefined) {
      // Resolve first so a missing profile still yields a stable path; open
      // may create the file. Failures (permissions, etc.) become null.
      resolveTokenSaverDbPath(input.layout);
      return createPitfallRegistry({ layout: input.layout });
    }
    return null;
  } catch {
    return null;
  }
};

const listFull = (
  registry: PitfallRegistry,
  projectId: string,
  includeRetired: boolean,
): readonly Pitfall[] => {
  const listed = registry.listPitfalls({
    projectId,
    includeRetired,
    format: "full",
  });
  return listed.format === "full" ? listed.items : [];
};

const syncCloudItemsIntoLocal = (
  registry: PitfallRegistry,
  projectId: string,
  items: readonly ProjectPitfallView[],
): void => {
  for (const item of items) {
    if (item.source === "seed") {
      // Bundled seeds are already seeded idempotently; never rewrite them.
      continue;
    }
    registry.upsertPitfall({
      id: item.id,
      projectId,
      symptom: item.symptom,
      cause: item.cause,
      avoidance: item.avoidance,
      check: item.check,
      keywords: item.keywords,
      tags: item.tags,
      severity: item.severity,
      source: item.source === "retired" ? "retired" : "project",
    });
  }
};

const mapLocalUpsertError = (error: {
  readonly kind: string;
}): UpsertAgentWitchPitfallResult => {
  if (error.kind === "active_cap") {
    return { ok: false, reason: "active_limit" };
  }
  return { ok: false, reason: "rejected" };
};

/**
 * AWL Pitfalls store backed by Mac SQLite (`createPitfallRegistry`).
 *
 * Sync direction (judgment): cloud content is SoT when `cloud` is provided —
 * list pulls cloud then upserts content into SQLite; upsert writes cloud first,
 * then local. Hit counters stay in local `pitfall_hits` (upsert never writes
 * them). Missing DB / open failure falls back to cloud-only when available,
 * otherwise `{ ok: false, reason: "unavailable" }`.
 */
const createMacAgentWitchProjectPitfallsStore = (
  input: CreateMacAgentWitchProjectPitfallsStoreInput,
): AgentWitchProjectPitfallsStore => {
  const cloud = input.cloud ?? null;

  return {
    listPitfalls: async (projectId, options) => {
      const registry = openRegistry(input);
      try {
        if (cloud !== null) {
          const remote = await cloud.listPitfalls(projectId, options);
          if (remote.ok) {
            if (registry !== null) {
              syncCloudItemsIntoLocal(registry, projectId, remote.items);
              const localItems = listFull(
                registry,
                projectId,
                options.includeRetired,
              );
              return {
                ok: true,
                items: localItems.map(mapLocalPitfallToView),
                syncedAt: remote.syncedAt,
              };
            }
            // No local DB — still serve cloud so the tab works.
            return remote;
          }
        }

        if (registry === null) {
          return { ok: false, reason: "unavailable" };
        }

        const localItems = listFull(
          registry,
          projectId,
          options.includeRetired,
        );
        return {
          ok: true,
          items: localItems.map(mapLocalPitfallToView),
          syncedAt: null,
        };
      } finally {
        registry?.close();
      }
    },

    upsertPitfall: async (projectId, pitfall: ProjectPitfallUpsert) => {
      if (cloud !== null) {
        const remote = await cloud.upsertPitfall(projectId, pitfall);
        if (!remote.ok) {
          return remote;
        }
      }

      const registry = openRegistry(input);
      if (registry === null) {
        // Cloud already accepted (or no cloud): local cache miss is soft.
        return cloud !== null
          ? { ok: true }
          : { ok: false, reason: "unavailable" };
      }

      try {
        // Enforce the same active cap the registry uses (re-exported shared).
        void PITFALL_MAX_ACTIVE_PER_PROJECT;
        const result = registry.upsertPitfall({
          id: pitfall.id,
          projectId,
          symptom: pitfall.symptom,
          cause: pitfall.cause,
          avoidance: pitfall.avoidance,
          check: pitfall.check,
          keywords: pitfall.keywords,
          tags: pitfall.tags,
          severity: pitfall.severity,
          source: pitfall.source,
        });
        if (!result.ok) {
          // If cloud already wrote, local rejection should still surface.
          return mapLocalUpsertError(result.error);
        }
        return { ok: true };
      } finally {
        registry.close();
      }
    },
  };
};

export default createMacAgentWitchProjectPitfallsStore;
