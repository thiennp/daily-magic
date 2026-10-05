// Compare before/after snapshots of one 069 run.
export const assertNoDataLoss = (before, after, duplicateProjectIds, allowNull = []) => {
  const problems = [];
  for (const [id, row] of Object.entries(before.user_projects)) {
    if (after.user_projects[id] !== row) problems.push(`user_projects ${id} deleted or changed`);
  }
  for (const id of duplicateProjectIds) {
    if (!(id in after.user_projects)) problems.push(`duplicate project ${id} missing`);
  }
  const newProjects = Object.keys(after.user_projects).filter((id) => !(id in before.user_projects));
  for (const [table, rows] of Object.entries(before)) {
    if (table === "user_projects") continue;
    const afterRows = after[table] ?? {};
    if (Object.keys(afterRows).length !== Object.keys(rows).length) {
      problems.push(`${table}: count ${Object.keys(rows).length} → ${Object.keys(afterRows).length}`);
    }
    for (const [key, projectId] of Object.entries(rows)) {
      if (!(key in afterRows)) problems.push(`${table} ${key} deleted`);
      else if (projectId !== null && afterRows[key] !== projectId) {
        problems.push(`${table} ${key} moved ${projectId} → ${afterRows[key]}`);
      }
    }
  }
  for (const table of ["published_capabilities", "agent_runs"]) {
    for (const [key, projectId] of Object.entries(after[table] ?? {})) {
      if (projectId === null && !allowNull.includes(key)) problems.push(`${table} ${key} still NULL`);
      if (projectId !== null && allowNull.includes(key)) problems.push(`${table} ${key} should stay NULL`);
    }
  }
  return { problems, newProjects };
};

export const assertSameSnapshot = (left, right, label) =>
  JSON.stringify(left) === JSON.stringify(right) ? [] : [`${label}: snapshot changed on re-run`];
