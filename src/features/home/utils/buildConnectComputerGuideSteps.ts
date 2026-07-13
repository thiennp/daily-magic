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
    description: "Click the copy button next to the command below.",
  },
  {
    title: "Paste into Terminal and run it",
    description:
      "Click inside Terminal, paste with Command (⌘) + V, then press Return.",
  },
  {
    title: "Pair this browser",
    description:
      "When install finishes, copy the pairing code from Terminal. Open Your setup on the right, paste it under Connect this browser, and click Save and pair.",
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
