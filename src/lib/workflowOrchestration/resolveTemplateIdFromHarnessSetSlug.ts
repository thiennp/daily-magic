const TEMPLATE_HARNESS_PREFIX = "template-";

export const resolveTemplateIdFromHarnessSetSlug = (
  harnessSetSlug: string | null | undefined,
): string | null => {
  if (harnessSetSlug === null || harnessSetSlug === undefined) {
    return null;
  }

  if (!harnessSetSlug.startsWith(TEMPLATE_HARNESS_PREFIX)) {
    return null;
  }

  const templateId = harnessSetSlug
    .slice(TEMPLATE_HARNESS_PREFIX.length)
    .trim();
  return templateId.length > 0 ? templateId : null;
};

export default resolveTemplateIdFromHarnessSetSlug;
