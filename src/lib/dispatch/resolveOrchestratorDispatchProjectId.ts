import { getUserById } from "@/lib/auth/userRepository";
import { isCursorCloudExecutorDeviceId } from "@/lib/cursorCloud/cursorCloudExecutorDeviceId.constant";

type MaybeId = string | null | undefined;

const readTrimmed = (value: MaybeId): string =>
  typeof value === "string" ? value.trim() : "";

const firstNonEmpty = (values: readonly MaybeId[]): string | undefined =>
  values.map(readTrimmed).find((value) => value.length > 0);

const readOwnerEmail = async (
  ownerUserId: string,
  ownerEmail: MaybeId,
): Promise<string> => {
  const known = readTrimmed(ownerEmail);
  if (known.length > 0) {
    return known;
  }
  const user = await getUserById(ownerUserId);
  return readTrimmed(user?.email);
};

/**
 * Thien LOCK: every orchestrated run belongs to a project.
 * 1) Prefer the domain-bound id (explicit body, automation, capability).
 * 2) Else an existing Default on the run's computer (lookup only —
 *    never auto-creates Default; new users must pick/create a project).
 * Returns null when neither resolves; dispatch then answers
 * `project_required` with a hint. Never throws (no 500 from orchestrators),
 * never invents a no-project path.
 */
export const resolveOrchestratorDispatchProjectId = async (input: {
  readonly ownerUserId: string;
  readonly ownerEmail?: MaybeId;
  readonly boundProjectIds: readonly MaybeId[];
  readonly deviceIds: readonly MaybeId[];
}): Promise<string | null> => {
  const bound = firstNonEmpty(input.boundProjectIds);
  if (bound !== undefined) {
    return bound;
  }

  const deviceId = firstNonEmpty(
    input.deviceIds.filter(
      (id) => !isCursorCloudExecutorDeviceId(readTrimmed(id)),
    ),
  );
  if (deviceId === undefined) {
    return null;
  }

  try {
    const email = await readOwnerEmail(input.ownerUserId, input.ownerEmail);
    if (email.length === 0) {
      return null;
    }
    // Lazy: keeps project-mutation modules out of every dispatch import graph.
    const { ensureDefaultUserProject } =
      await import("@/lib/projects/ensureDefaultUserProject");
    const project = await ensureDefaultUserProject(
      input.ownerUserId,
      email,
      deviceId,
    );
    return project?.id ?? null;
  } catch {
    return null;
  }
};

export default resolveOrchestratorDispatchProjectId;
