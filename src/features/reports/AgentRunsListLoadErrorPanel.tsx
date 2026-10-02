import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";

interface AgentRunsListLoadErrorPanelProps {
  readonly onRetry: () => void;
}

export default function AgentRunsListLoadErrorPanel({
  onRetry,
}: AgentRunsListLoadErrorPanelProps) {
  return (
    <AppPanel padding="compact" className="w-full">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Could not load your reports
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Something went wrong while fetching run history. Try again in a
          moment.
        </p>
        <div>
          <Button size="sm" variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </div>
      </div>
    </AppPanel>
  );
}
