import type {
  CompositionSnapshotComponentKind,
  CompositionSnapshotItemScope,
  ProjectCompositionSnapshotItemWire,
  ProjectCompositionSnapshotWire,
} from "@agent-witch/shared/protocol";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const parseProjectCompositionSnapshotWire = (
  value: unknown,
): ProjectCompositionSnapshotWire | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id = typeof value.id === "string" ? value.id.trim() : "";
  const projectId =
    typeof value.projectId === "string" ? value.projectId.trim() : "";
  const digest = typeof value.digest === "string" ? value.digest.trim() : "";

  if (id.length === 0 || projectId.length === 0 || digest.length === 0) {
    return null;
  }

  if (!Array.isArray(value.entries)) {
    return null;
  }

  const entries: ProjectCompositionSnapshotItemWire[] = value.entries.flatMap(
    (entry) => {
      if (!isRecord(entry)) {
        return [];
      }

      const componentId =
        typeof entry.componentId === "string" ? entry.componentId.trim() : "";
      const versionId =
        typeof entry.versionId === "string" ? entry.versionId.trim() : "";
      const kind = entry.kind;
      const scope = entry.scope;

      if (
        componentId.length === 0 ||
        versionId.length === 0 ||
        (kind !== "harness" && kind !== "workflow" && kind !== "agent") ||
        (scope !== "project" && scope !== "run")
      ) {
        return [];
      }

      if (!Array.isArray(entry.items)) {
        return [];
      }

      const items = entry.items.flatMap((item) => {
        if (!isRecord(item)) {
          return [];
        }

        const itemKey =
          typeof item.itemKey === "string" ? item.itemKey.trim() : "";
        const relativePath =
          typeof item.relativePath === "string" ? item.relativePath : "";
        const contentSha256 =
          typeof item.contentSha256 === "string"
            ? item.contentSha256.trim()
            : "";

        if (itemKey.length === 0 || contentSha256.length === 0) {
          return [];
        }

        return [{ itemKey, relativePath, contentSha256 }];
      });

      if (items.length === 0) {
        return [];
      }

      return [
        {
          componentId,
          versionId,
          kind: kind as CompositionSnapshotComponentKind,
          scope: scope as CompositionSnapshotItemScope,
          items,
        },
      ];
    },
  );

  return { id, projectId, digest, entries };
};

export default parseProjectCompositionSnapshotWire;
