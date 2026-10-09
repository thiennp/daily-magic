import type { AutoSkillsOverview } from "@/features/project-auto-skills/internal/core/projectAutoSkills.type";
import { getAutoSkillsSettingsRow } from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSettingsDb";
import { listAutoSkillSuggestions } from "@/features/project-auto-skills/internal/infrastructure/autoSkillsSuggestionsDb";
import { resolveProjectSkillMemberRole } from "@/features/project-skill-share/public-api/infrastructure";

/** Owner-only view for the Library strip; null for everyone else. */
export const getAutoSkillsOverview = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<AutoSkillsOverview | null> => {
  const role = await resolveProjectSkillMemberRole(input);
  if (!role.ok || role.role !== "owner") {
    return null;
  }
  const [settings, pending, saved] = await Promise.all([
    getAutoSkillsSettingsRow(input.projectId),
    listAutoSkillSuggestions(input.projectId, ["pending"]),
    listAutoSkillSuggestions(input.projectId, ["saved"]),
  ]);
  return {
    ...settings,
    pending,
    autoSkillIds: saved.flatMap((s) => (s.skillId === null ? [] : [s.skillId])),
  };
};

/** Device view: toggles plus which clusters are pending / saved / never. */
export const getAutoSkillsDeviceView = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<{
  readonly enabled: boolean;
  readonly judgePref: string;
  readonly judgeAgent: string | null;
  readonly publishMode: string;
  readonly neverClusterIds: readonly string[];
  readonly savedClusterIds: readonly string[];
  readonly pendingClusterIds: readonly string[];
}> => {
  const role = await resolveProjectSkillMemberRole(input);
  if (!role.ok) {
    return {
      enabled: false,
      judgePref: "",
      judgeAgent: null,
      publishMode: "",
      neverClusterIds: [],
      savedClusterIds: [],
      pendingClusterIds: [],
    };
  }
  const settings = await getAutoSkillsSettingsRow(input.projectId);
  const rows = await listAutoSkillSuggestions(input.projectId, [
    "pending",
    "saved",
    "never",
  ]);
  const ids = (status: string): string[] =>
    rows.filter((r) => r.status === status).map((r) => r.clusterId);
  return {
    enabled: role.role === "owner" && settings.enabled,
    judgePref: settings.judgePref,
    judgeAgent: settings.judgeAgent,
    publishMode: settings.publishMode,
    neverClusterIds: ids("never"),
    savedClusterIds: ids("saved"),
    pendingClusterIds: ids("pending"),
  };
};
