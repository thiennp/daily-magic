/**
 * Which version a get returns. Members read the published version (or an
 * older non-draft version they name). Publisher/owner may read any version;
 * default = published, else latest (draft-only skill).
 */
export const resolveProjectSkillReadVersion = (input: {
  readonly requestedVersion: number | undefined;
  readonly publishedVersion: number | null;
  readonly latestVersion: number;
  readonly canManage: boolean;
}): number | null => {
  if (input.requestedVersion !== undefined) {
    return Number.isInteger(input.requestedVersion) &&
      input.requestedVersion > 0
      ? input.requestedVersion
      : null;
  }
  if (input.publishedVersion !== null) {
    return input.publishedVersion;
  }
  return input.canManage && input.latestVersion > 0
    ? input.latestVersion
    : null;
};
