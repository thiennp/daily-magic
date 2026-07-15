import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_SETUP_SECTION: AgentWitchInstructionSection =
  {
    id: "setup",
    title: "Mac setup and pairing",
    summary:
      "Install the local bridge, pair your Mac, and keep the WebSocket connection healthy for dispatch and harness sync.",
    topics: [
      {
        id: "install",
        title: "Installing on a Mac",
        body: "Run the install script from the app origin (Install on your Mac on Home). It creates the local Agent Witch profile, downloads the bridge, and can register a login autostart agent on macOS.",
      },
      {
        id: "pairing",
        title: "Pairing",
        body: "After install, sign in on the same Mac and complete pairing from Home → Your setup. Pairing binds the local pairing token to your account so only you can dispatch to that computer.",
      },
      {
        id: "multiple-macs",
        title: "Multiple Macs",
        body: "You can pair more than one Mac. Label devices in Your setup so the composer and dispatch previews stay clear.",
      },
      {
        id: "multi-profile",
        title: "Multiple accounts on one computer",
        body: "Use AGENT_WITCH_PROFILE=user@example.com when installing or running the bridge so each sign-in gets an isolated config under ~/.agent-witch/profiles/<email>/.",
      },
      {
        id: "local-config",
        title: "Local files",
        body: "Configuration, logs, harness content, and pending run-input state live under ~/.agent-witch/ on the Mac. The bridge reconnects automatically with exponential backoff and periodic heartbeats.",
      },
      {
        id: "watchdog",
        title: "Staying online",
        body: "A watchdog can revive stale WebSocket connections and reinstall from the published install bundle when revive fails (with cooldown). This keeps dispatch available without manual restarts.",
      },
      {
        id: "your-setup-panel",
        title: "Your setup in the app",
        body: "Your setup on Home covers harness sharing, catalog publish, dispatch preference for your Mac, and the harness item editor for local writer sync.",
      },
    ],
  };
