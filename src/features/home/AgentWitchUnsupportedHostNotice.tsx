interface AgentWitchUnsupportedHostNoticeProps {
  readonly host: string;
}

export default function AgentWitchUnsupportedHostNotice({
  host,
}: AgentWitchUnsupportedHostNoticeProps) {
  return (
    <div className="rounded-lg border border-warning-200 bg-warning-50 p-4 text-sm text-warning-800 dark:border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-100">
      <p className="font-medium">Live Mac connection is not available here</p>
      <p className="mt-2 text-warning-700 dark:text-warning-100/90">
        This site cannot keep a live link to your Mac. Agent Witch needs a
        server that stays running — not a basic static deploy.
      </p>
      <p className="mt-2 text-warning-700 dark:text-warning-100/90">
        For local development, run{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          npm run dev
        </code>{" "}
        and install from{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          http://localhost:3000
        </code>
        . For production, use{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          https://www.agentwitch.com
        </code>{" "}
        or another host that supports live connections (Railway, Render, Fly.io,
        VPS).
      </p>
      <p className="mt-2 text-xs text-warning-600 dark:text-warning-100/80">
        Current host: {host}
      </p>
    </div>
  );
}
