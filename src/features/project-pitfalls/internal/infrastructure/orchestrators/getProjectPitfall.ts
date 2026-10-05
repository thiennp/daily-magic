import { isValidProjectPitfallId } from "@/features/project-pitfalls/internal/core/isValidProjectPitfallId";
import type {
  ProjectPitfallFailure,
  ProjectPitfallView,
} from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { listProjectPitfalls } from "@/features/project-pitfalls/internal/infrastructure/orchestrators/listProjectPitfalls";

/** get_pitfall: one merged pitfall by id (retired included so callers see state). */
export const getProjectPitfall = async (input: {
  readonly actorUserId: string;
  readonly projectId: string;
  readonly pitfallId: string;
}): Promise<
  | { readonly ok: true; readonly pitfall: ProjectPitfallView }
  | ProjectPitfallFailure
> => {
  if (!isValidProjectPitfallId(input.pitfallId)) {
    return { ok: false, code: "invalid_arguments", field: "id" };
  }
  const listed = await listProjectPitfalls({ ...input, includeRetired: true });
  if (!listed.ok) {
    return listed;
  }
  const pitfall = listed.pitfalls.find((view) => view.id === input.pitfallId);
  return pitfall === undefined
    ? { ok: false, code: "not_found" }
    : { ok: true, pitfall };
};
