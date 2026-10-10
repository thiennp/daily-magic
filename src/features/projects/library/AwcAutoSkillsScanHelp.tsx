interface AwcAutoSkillsScanHelpProps {
  /** Commits that will be read; null while the field is invalid. */
  readonly commits: number | null;
}

/** What "Scan past tasks" and "Scan project docs" read. */
export default function AwcAutoSkillsScanHelp({
  commits,
}: AwcAutoSkillsScanHelpProps) {
  return (
    <span className="flex flex-col text-[12.5px] text-awc-fg-muted dark:text-gray-400">
      <span>
        Tasks: checks finished tasks, and the last {commits ?? "N"} commits on
        the main branch if the folder uses git. The AI judges each one on its
        own and asks you about any that would make a reusable skill. Each commit
        takes an AI check, so a small number is quicker.
      </span>
      <span>
        Docs: turns this folder&apos;s skills, commands and Q&amp;A into
        questions. No AI runs; the text is stored in your cloud until you
        answer.
      </span>
    </span>
  );
}
