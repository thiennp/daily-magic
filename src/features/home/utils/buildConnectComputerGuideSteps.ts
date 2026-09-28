import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

export const CONNECT_COMPUTER_COPY_STEP_TITLE = "Copy the install command";

export interface ConnectComputerGuideStep {
  readonly title: string;
  readonly description: string;
}

const MAC_TERMINAL_STEPS: readonly ConnectComputerGuideStep[] = [
  {
    title: "Open Terminal",
    description:
      'Press Command (⌘) + Space to open Spotlight, type "Terminal", then press Return.',
  },
  {
    title: CONNECT_COMPUTER_COPY_STEP_TITLE,
    description:
      "The command is tied to the account you are signed in with. On a shared Mac it adds your profile beside any others — it does not replace them.",
  },
  {
    title: "Paste into Terminal and run it",
    description:
      "Click inside Terminal, paste with Command (⌘) + V, then press Return.",
  },
];

const buildConnectComputerGuideSteps = (
  operatingSystem: BrowserOperatingSystem,
): readonly ConnectComputerGuideStep[] => {
  if (operatingSystem === "windows") {
    return [
      {
        title: "Open Windows Terminal",
        description:
          "On this Windows computer, open Windows Terminal or PowerShell. The agent host runs inside WSL (a Linux environment on Windows).",
      },
      {
        title: "Install WSL if this PC does not have it",
        description:
          "Run wsl --install, restart if Windows asks, then open the Ubuntu tab. Skip this step when wsl -l already lists a distribution.",
      },
      {
        title: CONNECT_COMPUTER_COPY_STEP_TITLE,
        description:
          "The command is tied to the account you are signed in with. Paste it inside the WSL terminal, not in PowerShell.",
      },
      {
        title: "Paste into WSL and run it",
        description:
          "In the Ubuntu tab, paste with Ctrl+Shift+V, then press Enter. The installer starts a systemd user service inside WSL. This computer then appears as a Linux device.",
      },
    ];
  }

  if (operatingSystem === "mac") {
    return MAC_TERMINAL_STEPS;
  }

  if (operatingSystem === "linux") {
    return [
      {
        title: "Open a terminal",
        description:
          "On this Linux computer, open a terminal. The install command pairs this machine to the account you are signed in with.",
      },
      {
        title: CONNECT_COMPUTER_COPY_STEP_TITLE,
        description:
          "The command is tied to the account you are signed in with. It installs the agent host for this Linux user and does not replace other accounts.",
      },
      {
        title: "Paste into the terminal and run it",
        description:
          "Click inside the terminal, paste with Ctrl+Shift+V, then press Enter. The installer starts a systemd user service on this computer.",
      },
    ];
  }

  return [
    {
      title: "Use a Mac",
      description:
        "Agent Witch installs on macOS. On your Mac, open Terminal and follow the steps below.",
    },
    ...MAC_TERMINAL_STEPS,
  ];
};

export default buildConnectComputerGuideSteps;
