import Button from "@/components/ui/button/Button";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";

interface AwcProjectsListLoadErrorPanelProps {
  readonly onRetry: () => void;
}

export default function AwcProjectsListLoadErrorPanel({
  onRetry,
}: AwcProjectsListLoadErrorPanelProps) {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {AWC_PROJECTS_PAGE_COPY.loadFailedTitle}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {AWC_PROJECTS_PAGE_COPY.loadFailedBody}
      </p>
      <div>
        <Button size="sm" variant="outline" onClick={onRetry}>
          {AWC_PROJECTS_PAGE_COPY.loadFailedRetry}
        </Button>
      </div>
    </div>
  );
}
