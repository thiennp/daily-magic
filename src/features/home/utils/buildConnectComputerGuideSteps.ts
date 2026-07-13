import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

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
    title: "Copy the install command",
    description:
      "The command is the same for every account on this Mac — it does not contain your email.",
  },
  {
    title: "Paste into Terminal and run it",
    description:
      "Click inside Terminal, paste with Command (⌘) + V, then press Return.",
  },
  {
    title: "Link this account from the browser",
    description:
      "Come back here and click Link this Mac to my account. The browser calls http://127.0.0.1:47892/link-account on your Mac.",
  },
];

const buildConnectComputerGuideSteps = (
  operatingSystem: BrowserOperatingSystem,
): readonly ConnectComputerGuideStep[] => {
  if (operatingSystem === "windows") {
    return [
      {
        title: "Use a Mac",
        description:
          "Agent Witch installs on macOS. Switch to the Mac you want to connect, then follow the steps below on that computer.",
      },
      ...MAC_TERMINAL_STEPS,
    ];
  }

  if (operatingSystem === "mac") {
    return MAC_TERMINAL_STEPS;
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
