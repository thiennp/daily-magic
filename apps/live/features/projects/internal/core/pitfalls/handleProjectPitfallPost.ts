import { randomBytes } from "node:crypto";

import {
  PROJECT_PITFALL_MAX_ACTIVE,
  countActiveProjectPitfalls,
  type ProjectPitfallUpsert,
  type ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";
import type { AgentWitchProjectPitfallsStore } from "./agentWitchProjectPitfallsStore.type";
import parseProjectPitfallForm from "./parseProjectPitfallForm";
import type { ProjectPitfallFlashCode } from "./resolveProjectPitfallFlash";

export type ProjectPitfallPostAction = "save" | "retire" | "restore";

export const PROJECT_PITFALL_POST_PATHS: Readonly<
  Record<ProjectPitfallPostAction, string>
> = {
  save: "/project/pitfalls/save",
  retire: "/project/pitfalls/retire",
  restore: "/project/pitfalls/restore",
};

export const resolveProjectPitfallPostAction = (
  pathname: string,
): ProjectPitfallPostAction | null => {
  const entry = Object.entries(PROJECT_PITFALL_POST_PATHS).find(
    ([, path]) => path === pathname,
  );
  return entry === undefined ? null : (entry[0] as ProjectPitfallPostAction);
};

const defaultRandomSuffix = (): string => randomBytes(3).toString("hex");

const buildLocation = (
  projectId: string,
  flash: ProjectPitfallFlashCode,
  extra: Readonly<Record<string, string>> = {},
): string => {
  const query = new URLSearchParams({
    tab: "pitfalls",
    ...extra,
    pitfall: flash,
  });
  return `/project?id=${encodeURIComponent(projectId)}&${query.toString()}`;
};

const toUpsert = (
  item: ProjectPitfallView,
  source: ProjectPitfallUpsert["source"],
): ProjectPitfallUpsert => ({
  id: item.id,
  symptom: item.symptom,
  cause: item.cause,
  avoidance: item.avoidance,
  check: item.check,
  keywords: item.keywords,
  tags: item.tags,
  severity: item.severity,
  source,
});

/**
 * Handles AWL Pitfalls tab POSTs and returns the 303 redirect location.
 * Project existence / ACL is checked by the caller (same as other /project
 * routes); the cloud enforces project ACL and the 64-active cap again.
 */
const handleProjectPitfallPost = async (input: {
  readonly action: ProjectPitfallPostAction;
  readonly form: URLSearchParams;
  readonly projectId: string;
  readonly store: AgentWitchProjectPitfallsStore | null;
  readonly randomSuffix?: () => string;
}): Promise<string> => {
  const { projectId, store } = input;
  const keepRetired: Readonly<Record<string, string>> =
    input.form.get("showRetired") === "1" ? { retired: "1" } : {};

  if (store === null) {
    return buildLocation(projectId, "unavailable", keepRetired);
  }

  const listed = await store.listPitfalls(projectId, { includeRetired: true });
  if (!listed.ok) {
    return buildLocation(projectId, "unavailable", keepRetired);
  }

  if (input.action === "save") {
    const parsed = parseProjectPitfallForm({
      form: input.form,
      randomSuffix: input.randomSuffix ?? defaultRandomSuffix,
    });
    if (!parsed.ok) {
      return buildLocation(projectId, "invalid", keepRetired);
    }
    const existing = listed.items.find((item) => item.id === parsed.pitfall.id);
    const addsActive = existing === undefined || existing.source === "retired";
    if (
      addsActive &&
      countActiveProjectPitfalls(listed.items) >= PROJECT_PITFALL_MAX_ACTIVE
    ) {
      return buildLocation(projectId, "limit", keepRetired);
    }
    const saved = await store.upsertPitfall(projectId, parsed.pitfall);
    return buildLocation(
      projectId,
      saved.ok
        ? "saved"
        : saved.reason === "active_limit"
          ? "limit"
          : saved.reason,
      keepRetired,
    );
  }

  const pitfallId = (input.form.get("pitfallId") ?? "").trim();
  const existing = listed.items.find((item) => item.id === pitfallId);
  if (existing === undefined) {
    return buildLocation(projectId, "missing", keepRetired);
  }

  if (input.action === "restore") {
    if (
      existing.source === "retired" &&
      countActiveProjectPitfalls(listed.items) >= PROJECT_PITFALL_MAX_ACTIVE
    ) {
      return buildLocation(projectId, "limit", keepRetired);
    }
    const restored = await store.upsertPitfall(
      projectId,
      toUpsert(existing, "project"),
    );
    return buildLocation(
      projectId,
      restored.ok
        ? "restored"
        : restored.reason === "active_limit"
          ? "limit"
          : restored.reason,
      keepRetired,
    );
  }

  const retired = await store.upsertPitfall(
    projectId,
    toUpsert(existing, "retired"),
  );
  return buildLocation(
    projectId,
    retired.ok
      ? "retired"
      : retired.reason === "active_limit"
        ? "limit"
        : retired.reason,
    keepRetired,
  );
};

export default handleProjectPitfallPost;
