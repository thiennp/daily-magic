import type {
  AutoSkillClusterState,
  AutoSkillModuleCluster,
} from "./autoSkillModule.types";
import type { AutoSkillModuleDb } from "./autoSkillModuleDb";

export const ensureCluster = (
  db: AutoSkillModuleDb,
  input: {
    readonly id: string;
    readonly projectId: string;
    readonly label: string;
  },
): void => {
  db.prepare(
    `INSERT OR IGNORE INTO module_cluster (id, project_id, label, updated_at)
     VALUES (?, ?, ?, ?)`,
  ).run(input.id, input.projectId, input.label, new Date().toISOString());
};

export const addOccurrence = (
  db: AutoSkillModuleDb,
  input: {
    readonly moduleId: string;
    readonly clusterId: string;
    readonly runId: string;
    readonly promptId: string;
    readonly position: number;
  },
): void => {
  db.prepare(
    `INSERT OR IGNORE INTO module_occurrence
      (module_id, cluster_id, run_id, prompt_id, position) VALUES (?, ?, ?, ?, ?)`,
  ).run(
    input.moduleId,
    input.clusterId,
    input.runId,
    input.promptId,
    input.position,
  );
};

/** Recount distinct runs / prompts of a cluster, then read it back. */
export const refreshCluster = (
  db: AutoSkillModuleDb,
  clusterId: string,
): AutoSkillModuleCluster | null => {
  db.prepare(
    `UPDATE module_cluster SET updated_at = ?,
      occurrences = (SELECT COUNT(DISTINCT run_id) FROM module_occurrence WHERE cluster_id = ?),
      distinct_prompts = (SELECT COUNT(DISTINCT prompt_id) FROM module_occurrence WHERE cluster_id = ?)
     WHERE id = ?`,
  ).run(new Date().toISOString(), clusterId, clusterId, clusterId);
  const r = db
    .prepare("SELECT * FROM module_cluster WHERE id = ?")
    .get(clusterId) as Record<string, unknown> | undefined;
  return r === undefined
    ? null
    : {
        id: String(r.id),
        label: String(r.label),
        occurrences: Number(r.occurrences),
        distinctPrompts: Number(r.distinct_prompts),
        state: String(r.state) as AutoSkillClusterState,
      };
};

export const setClusterState = (
  db: AutoSkillModuleDb,
  clusterId: string,
  state: AutoSkillClusterState,
): void => {
  db.prepare("UPDATE module_cluster SET state = ? WHERE id = ?").run(
    state,
    clusterId,
  );
};

/** Latest module text per distinct run of a cluster (for the draft). */
export const listClusterOccurrences = (
  db: AutoSkillModuleDb,
  clusterId: string,
  limit: number,
): { readonly runId: string; readonly text: string }[] =>
  (
    db
      .prepare(
        `SELECT o.run_id AS run_id, m.canonical AS canonical
         FROM module_occurrence o JOIN module m ON m.id = o.module_id
         WHERE o.cluster_id = ? GROUP BY o.run_id ORDER BY MAX(o.rowid) DESC LIMIT ?`,
      )
      .all(clusterId, limit) as Record<string, unknown>[]
  ).map((r) => ({ runId: String(r.run_id), text: String(r.canonical) }));

/** Clusters a run already fed (a rescan re-asks them without extracting again). */
export const listRunClusterIds = (
  db: AutoSkillModuleDb,
  runId: string,
): string[] =>
  (
    db
      .prepare(
        "SELECT DISTINCT cluster_id FROM module_occurrence WHERE run_id = ?",
      )
      .all(runId) as Record<string, unknown>[]
  ).map((r) => String(r.cluster_id));
