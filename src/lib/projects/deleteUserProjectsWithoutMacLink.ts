import { asRowArray, getSql } from "@/lib/db";

export const deleteUserProjectsWithoutMacLink = async (
  ownerUserId: string,
): Promise<readonly string[]> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      DELETE FROM user_projects AS project
      WHERE project.owner_user_id = ${ownerUserId}
        AND project.device_id IS NULL
        AND NOT EXISTS (
          SELECT 1
          FROM project_device_bindings AS binding
          WHERE binding.project_id = project.id
        )
      RETURNING project.id
    `,
  );

  return rows
    .map((row) => row.id)
    .filter((id): id is string => typeof id === "string" && id.length > 0);
};
