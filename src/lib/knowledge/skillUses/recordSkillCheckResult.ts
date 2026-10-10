import { asRowArray, getSql } from "@/lib/db";

export type SkillCheckResult = {
  readonly checkId: number;
  readonly verdict: "fine" | "improve";
  readonly note: string;
  /** Full improved skill text; required for "improve". */
  readonly proposedBody: string | null;
};

const MAX_NOTE_CHARS = 2_000;
const MAX_BODY_BYTES = 65_536;

/** Judge result for a due check of this project. False when it is not due or the result is malformed. */
export const recordSkillCheckResult = async (
  projectId: string,
  result: SkillCheckResult,
): Promise<boolean> => {
  const note = result.note.trim().slice(0, MAX_NOTE_CHARS);
  const body = result.proposedBody?.trim() ?? "";
  if (
    note.length === 0 ||
    (result.verdict === "improve" &&
      (body.length === 0 || Buffer.byteLength(body, "utf8") > MAX_BODY_BYTES))
  ) {
    return false;
  }
  const rows = asRowArray(
    await getSql()`
      UPDATE project_skill_checks SET status = 'judged', verdict = ${result.verdict},
        note = ${note}, proposed_body = ${result.verdict === "improve" ? body : null},
        judged_at = NOW()
      WHERE id = ${result.checkId} AND project_id = ${projectId} AND status = 'due'
      RETURNING id`,
  );
  return rows.length > 0;
};
