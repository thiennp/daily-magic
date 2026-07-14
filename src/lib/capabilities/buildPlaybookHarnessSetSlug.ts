import sanitizeHarnessSlug from "@/lib/agentWitch/harness/sanitizeHarnessSlug";

const buildPlaybookHarnessSetSlug = (playbookName: string): string => {
  const slug = sanitizeHarnessSlug(playbookName);
  return `playbook-${slug}`;
};

export default buildPlaybookHarnessSetSlug;
