import { toGitHubWebUrl } from "@/features/projects/settings/folder/projectGitHubUrl";

/** "Open on GitHub" for the first GitHub remote; nothing for other hosts. */
export default function AwcProjectOpenOnGitHub({
  repoUrls,
}: {
  readonly repoUrls: readonly string[];
}) {
  const href = repoUrls.map(toGitHubWebUrl).find((url) => url !== null) ?? null;
  if (href === null) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="awc-focus-ring w-fit text-[13px] font-medium text-awc-primary underline"
    >
      Open on GitHub
    </a>
  );
}
