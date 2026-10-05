/** Delete stays disabled until the typed text equals the project name (trimmed, case-sensitive). */
const isProjectDeleteConfirmNameMatch = (
  typedName: string,
  projectName: string,
): boolean => {
  const expected = projectName.trim();
  return expected.length > 0 && typedName.trim() === expected;
};

export default isProjectDeleteConfirmNameMatch;
