import { asRowArray, getSql } from "@/lib/db";

/** Name of THIS project for the wake body. Fails open to null (wake still posts). */
export const loadProjectGrokWakeProjectName = async (
  projectId: string,
): Promise<string | null> => {
  try {
    const rows = asRowArray(
      await getSql()`
        SELECT name FROM user_projects WHERE id = ${projectId} LIMIT 1
      `,
    );
    const name = rows[0]?.name;
    return typeof name === "string" && name.trim().length > 0
      ? name.trim()
      : null;
  } catch {
    return null;
  }
};
