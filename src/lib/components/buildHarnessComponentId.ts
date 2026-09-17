const buildHarnessComponentId = (
  ownerUserId: string,
  setSlug: string,
): string => {
  const owner = ownerUserId.trim();
  const slug = setSlug.trim().toLowerCase();
  return `${owner}:harness:${slug}`;
};

export default buildHarnessComponentId;
