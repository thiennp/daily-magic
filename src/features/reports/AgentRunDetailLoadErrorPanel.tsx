import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";

interface AgentRunDetailLoadErrorPanelProps {
  readonly onRetry: () => void;
}

export default function AgentRunDetailLoadErrorPanel({
  onRetry,
}: AgentRunDetailLoadErrorPanelProps) {
  return (
    <AppPanel padding="compact" className="mx-auto w-full max-w-lg">
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          Could not load this run
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Something went wrong while fetching run details. Try again in a
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
