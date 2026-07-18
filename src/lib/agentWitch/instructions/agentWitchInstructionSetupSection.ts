import type { AgentWitchInstructionSection } from "@/lib/agentWitch/instructions/agentWitchInstructionDocument.type";

export const AGENT_WITCH_INSTRUCTION_SETUP_SECTION: AgentWitchInstructionSection =
  {
    id: "setup",
    title: "Mac setup",
    summary:
      "Install Agent Witch on your Mac and keep it connected so you can send tasks from the browser.",
    topics: [
      {
        id: "install",
        title: "Installing on a Mac",
        body: "Run the install script from Home. It creates your local Agent Witch profile, downloads the bridge, and can start automatically when you log in on macOS.",
      },
      {
        id: "pairing",
        title: "Connecting your Mac",
        body: "After install, sign in on the same Mac and finish setup from Home → Your Devices. That links this Mac to your account so only you can run tasks on it.",
      },
      {
        id: "multiple-macs",
        title: "Multiple Macs",
        body: "You can connect more than one Mac. Name each device in Your Devices so task sending stays clear.",
      },
      {
        id: "multi-profile",
        title: "Multiple accounts on one computer",
        body: "Use AGENT_WITCH_PROFILE=user@example.com when installing or running the bridge so each sign-in gets an isolated config under profiles/<email>/ in the app home for that origin.",
      },
      {
        id: "local-config",
        title: "Local files",
        body: "Production installs live under ~/.agent-witch/; localhost installs use ~/.local-agent-witch/ so the two never overwrite each other. Configuration, logs, rules, and paused job answers stay in that app home. The bridge reconnects automatically if the connection drops.",
      },
      {
        id: "watchdog",
        title: "Staying online",
        body: "A background helper can restart stale connections and reinstall from the published install bundle when needed. That keeps send available without manual restarts.",
      },
      {
        id: "your-setup-panel",
        title: "Your setup in the app",
        body: "Your setup on Home covers rule sharing, publishing your catalog, dispatch preferences, and editing rules that sync to your Mac.",
      },
    ],
  };
