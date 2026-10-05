import { PROJECT_PAGE_SHELL_COPY } from "@/features/projects/projectPageShellCopy.constant";

/** Dashed placeholder for project-page tabs that have not landed yet. */
export default function AwcProjectTabStub({ label }: { readonly label: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 p-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
      <p className="font-medium text-gray-700 dark:text-gray-200">{label}</p>
      <p className="mt-1">{PROJECT_PAGE_SHELL_COPY.tabStubBody}</p>
    </div>
  );
}
