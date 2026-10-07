import type { HumanInviteAcceptTerminalState } from "@/features/projects/access/humanInvites/AwcHumanInviteAcceptTerminalView";

const TERMINAL: readonly string[] = [
  "invalid",
  "expired",
  "used",
  "revoked",
  "already_member",
];

/** Accept states that render AwcHumanInviteAcceptTerminalView. */
export const isHumanInviteAcceptTerminalState = (
  viewState: string,
): viewState is HumanInviteAcceptTerminalState => TERMINAL.includes(viewState);
