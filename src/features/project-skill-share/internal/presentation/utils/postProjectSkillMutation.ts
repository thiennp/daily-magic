import type { ProjectSkillMutationResult } from "@/features/project-skill-share/internal/presentation/utils/projectSkillsRequest.type";
import { readProjectSkillsJson } from "@/features/project-skill-share/internal/presentation/utils/readProjectSkillsJson";

/** POST helper for publish (…/skills) and revoke (…/skills/:skillId/revoke). */
export const postProjectSkillMutation = async (input: {
  readonly url: string;
  readonly payload: Readonly<Record<string, unknown>>;
}): Promise<ProjectSkillMutationResult> => {
  const response = await fetch(input.url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input.payload),
    cache: "no-store",
  }).catch(() => null);
  const body = await readProjectSkillsJson(response);
  if (response?.ok === true && body?.ok === true) {
    return { ok: true };
  }
  return {
    ok: false,
    errorMessage:
      typeof body?.errorMessage === "string"
        ? body.errorMessage
        : "Request failed.",
  };
};
