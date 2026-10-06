import Button from "@/components/ui/button/Button";
import { AWC_PROJECTS_PAGE_COPY } from "@/features/projects/awcProjectsPageCopy.constant";
import {
  PROJECTS_V5_HEADING_CLASS,
  PROJECTS_V5_MUTED_TEXT_CLASS,
} from "@/features/projects/projectsPageV5Classes.constant";

interface AwcProjectsListLoadErrorPanelProps {
  readonly onRetry: () => void;
}

export default function AwcProjectsListLoadErrorPanel({
  onRetry,
}: AwcProjectsListLoadErrorPanelProps) {
  return (
    <div className="flex flex-col gap-3 py-6">
      <p className={PROJECTS_V5_HEADING_CLASS}>
        {AWC_PROJECTS_PAGE_COPY.loadFailedTitle}
      </p>
      <p className={PROJECTS_V5_MUTED_TEXT_CLASS}>
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
