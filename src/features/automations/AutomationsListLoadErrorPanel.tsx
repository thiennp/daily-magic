import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { AUTOMATIONS_PAGE_COPY } from "@/features/automations/automationsPageCopy.constant";

export default function AutomationsListLoadErrorPanel({
  onRetry,
}: {
  readonly onRetry: () => void;
}) {
  return (
    <AppPanel padding="compact" className="mx-auto w-full max-w-lg">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {AUTOMATIONS_PAGE_COPY.loadFailedTitle}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {AUTOMATIONS_PAGE_COPY.loadFailedBody}
        </p>
        <div>
          <Button size="sm" variant="outline" onClick={onRetry}>
            {AUTOMATIONS_PAGE_COPY.loadFailedRetry}
          </Button>
        </div>
      </div>
    </AppPanel>
  );
}
