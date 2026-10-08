/**
 * Keyset cursor for sort "priority": base64url("<rank>|<created_at µs>|<id>").
 * rank 0–3 = p0–p3, 4 = no priority. Order is (rank, created_at, id) ASC.
 */
export type ProjectTaskPriorityCursor = {
  readonly rank: number;
  readonly at: string;
  readonly id: string;
};

const AT_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z$/;

export const encodeProjectTaskPriorityCursor = (
  cursor: ProjectTaskPriorityCursor,
): string =>
  Buffer.from(`${cursor.rank}|${cursor.at}|${cursor.id}`, "utf8").toString(
    "base64url",
  );

/** null when absent; "invalid" when present but malformed. */
export const decodeProjectTaskPriorityCursor = (
  raw: string | null | undefined,
): ProjectTaskPriorityCursor | null | "invalid" => {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return null;
  }
  const decoded = Buffer.from(raw.trim(), "base64url").toString("utf8");
  const [rank, at, ...idParts] = decoded.split("|");
  const id = idParts.join("|");
  const rankNumber = Number(rank);
  if (
    !Number.isInteger(rankNumber) ||
    rankNumber < 0 ||
    rankNumber > 4 ||
    at === undefined ||
    !AT_PATTERN.test(at) ||
    id.length === 0 ||
    id.length > 200
  ) {
    return "invalid";
  }
  return { rank: rankNumber, at, id };
};
