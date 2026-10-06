import {
  type AgentWitchReviveStep,
  buildAgentWitchReviveSteps,
  resolveAgentWitchRevivePlatform,
} from "@agent-witch/install-layout/presentation";
import { resolveAgentWitchAppHome } from "@/lib/agentWitch/resolveAgentWitchAppHome";

const resolveHostnameForReviveCommand = (): string => {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  }
  return "www.agentwitch.com";
};

/**
 * Revive steps for AgentWitch Local (`:43347`) on the computer in front of the browser.
 * `operatingSystem` is the browser OS ("mac" | "windows" | "linux" | "other");
 * "other" lists the command for every OS. The current AWC hostname picks the
 * production vs localhost install dir and LaunchAgent prefix.
 */
export const buildAgentWitchReviveAwlSteps = (input: {
  readonly operatingSystem: string;
  readonly hostname?: string;
}): readonly AgentWitchReviveStep[] => {
  const { launchAgentPrefix, installDirName } = resolveAgentWitchAppHome(
    input.hostname ?? resolveHostnameForReviveCommand(),
  );
  return buildAgentWitchReviveSteps({
    platform: resolveAgentWitchRevivePlatform(input.operatingSystem),
    installDirName,
    launchAgentPrefix,
  });
};

/** macOS terminal steps (launchctl kickstart) for the current AWC hostname. */
export const buildAgentWitchReviveAwlTerminalCommand = (
  hostname: string = resolveHostnameForReviveCommand(),
): string =>
  buildAgentWitchReviveAwlSteps({ operatingSystem: "mac", hostname })[0]
    ?.command ?? "";
