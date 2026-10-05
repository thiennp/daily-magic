import type { getSql } from "@/lib/db";

type Sql = ReturnType<typeof getSql>;

/** One pending (not yet sent) statement for the delete transaction. */
type ProjectDeleteQuery = ReturnType<Sql>;

export default ProjectDeleteQuery;
