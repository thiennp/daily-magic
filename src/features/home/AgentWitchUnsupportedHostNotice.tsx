interface AgentWitchUnsupportedHostNoticeProps {
  readonly host: string;
}

export default function AgentWitchUnsupportedHostNotice({
  host,
}: AgentWitchUnsupportedHostNoticeProps) {
  return (
    <div className="rounded-lg border border-warning-200 bg-warning-50 p-4 text-sm text-warning-800 dark:border-warning-500/30 dark:bg-warning-500/10 dark:text-warning-100">
      <p className="font-medium">WebSocket is not available on this host</p>
      <p className="mt-2 text-warning-700 dark:text-warning-100/90">
        Agent Witch needs a long-running Node server with{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          server.ts
        </code>
        . Vercel and similar serverless hosts only run{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          next build
        </code>
        , so{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          wss://{host}/api/agent-witch/ws
        </code>{" "}
        cannot accept connections.
      </p>
      <p className="mt-2 text-warning-700 dark:text-warning-100/90">
        Run locally with{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          npm run dev
        </code>{" "}
        and install the client from{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          http://localhost:3000
        </code>
        , or deploy to{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          https://www.agentwitch.com
        </code>{" "}
        on a Node host that supports WebSockets (Railway, Render, Fly.io, VPS).
        Vercel serverless cannot run{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          server.ts
        </code>
        , so production must use{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          npm run start
        </code>{" "}
        instead of a plain{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-xs dark:bg-black/20">
          next build
        </code>{" "}
        deploy.
      </p>
    </div>
  );
}
