export default function AgentLiveProgressActivityBar() {
  return (
    <div
      className="mt-3 h-1 overflow-hidden rounded-full bg-brand-100 dark:bg-brand-950/50"
      aria-hidden="true"
    >
      <div className="agent-live-progress-activity-bar h-full w-2/5 rounded-full bg-brand-500" />
    </div>
  );
}
