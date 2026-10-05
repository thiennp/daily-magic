import {
  PROJECT_PITFALL_LIMITS,
  type ProjectPitfallSeverity,
  type ProjectPitfallUpsert,
} from "@agent-witch/shared/pitfalls";

export type ParseProjectPitfallFormResult =
  | { readonly ok: true; readonly pitfall: ProjectPitfallUpsert }
  | { readonly ok: false };

const collapseSpaces = (value: string): string =>
  value.replace(/\s+/g, " ").trim();

export const splitPitfallList = (
  raw: string,
  maxItems: number,
  maxLength: number,
): readonly string[] => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(/[,\n]/)) {
    const value = collapseSpaces(part).slice(0, maxLength).toLowerCase();
    if (value.length > 0 && !seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
  }
  return out.slice(0, maxItems);
};

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");

/** New ids must match NRG `/^[a-z0-9][a-z0-9-]{0,63}$/`. */
export const buildNewProjectPitfallId = (
  symptom: string,
  randomSuffix: string,
): string => {
  const slug = slugify(symptom);
  const base = `project-${slug.length > 0 ? slug : "pitfall"}-${randomSuffix}`;
  return base.slice(0, PROJECT_PITFALL_LIMITS.id).replace(/-+$/g, "");
};

const readSeverity = (value: string | null): ProjectPitfallSeverity =>
  value === "block" || value === "info" ? value : "warn";

/**
 * Turns the AWL Pitfalls form into a collection upsert body.
 * Editing a seed keeps its id and saves as `source: "project"` — the server
 * stores that as a project override; the global seed is never mutated.
 * Cause is required by the cloud validator (non-empty).
 */
const parseProjectPitfallForm = (input: {
  readonly form: URLSearchParams;
  readonly randomSuffix: () => string;
}): ParseProjectPitfallFormResult => {
  const { form } = input;
  const symptom = collapseSpaces(form.get("symptom") ?? "");
  const avoidance = (form.get("avoidance") ?? "").trim();
  const cause = (form.get("cause") ?? "").trim();
  const checkCommand = collapseSpaces(form.get("checkCommand") ?? "");

  if (
    symptom.length === 0 ||
    avoidance.length === 0 ||
    cause.length === 0 ||
    symptom.length > PROJECT_PITFALL_LIMITS.symptom ||
    avoidance.length > PROJECT_PITFALL_LIMITS.avoidance ||
    cause.length > PROJECT_PITFALL_LIMITS.cause ||
    checkCommand.length > PROJECT_PITFALL_LIMITS.checkValue
  ) {
    return { ok: false };
  }

  const existingId = (form.get("pitfallId") ?? "").trim();
  const id =
    existingId.length > 0
      ? existingId
      : buildNewProjectPitfallId(symptom, input.randomSuffix());

  return {
    ok: true,
    pitfall: {
      id,
      symptom,
      cause,
      avoidance,
      check:
        checkCommand.length > 0
          ? { kind: "command", value: checkCommand }
          : { kind: "id", value: id },
      keywords: splitPitfallList(
        form.get("keywords") ?? "",
        PROJECT_PITFALL_LIMITS.keywords,
        PROJECT_PITFALL_LIMITS.keyword,
      ),
      tags: splitPitfallList(
        form.get("tags") ?? "",
        PROJECT_PITFALL_LIMITS.tags,
        PROJECT_PITFALL_LIMITS.tag,
      ),
      source: "project",
      severity: readSeverity(form.get("severity")),
    },
  };
};

export default parseProjectPitfallForm;
