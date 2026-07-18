import type { BrowserOperatingSystem } from "@/features/home/utils/detectBrowserOperatingSystem";

export const CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE = "Download Agent Witch";

export interface ConnectComputerGuideStep {
  readonly title: string;
  readonly description: string;
}

const MAC_DOWNLOAD_STEPS: readonly ConnectComputerGuideStep[] = [
  {
    title: CONNECT_COMPUTER_DOWNLOAD_STEP_TITLE,
    description:
      "Download the Agent Witch installer for this Mac. Open the DMG and double-click Agent Witch Installer.",
  },
  {
    title: "Install or update",
    description:
      "Follow the installer prompts. Background helpers start at login so this Mac can run workflows.",
  },
  {
    title: "Stay signed in here",
    description:
      "Keep this page open while signed in so Agent Witch can link this Mac to your account.",
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
          "Agent Witch installs on macOS. Switch to the Mac you want to connect, then download the app on that computer.",
      },
      ...MAC_DOWNLOAD_STEPS,
    ];
  }

  if (operatingSystem === "mac") {
    return MAC_DOWNLOAD_STEPS;
  }

  return [
    {
      title: "Use a Mac",
      description:
        "Agent Witch installs on macOS. On your Mac, open this site and download the app.",
    },
    ...MAC_DOWNLOAD_STEPS,
  ];
};

export default buildConnectComputerGuideSteps;
