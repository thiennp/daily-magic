import {
  buildAgentWitchLocalAppShell,
  type AgentWitchLocalAppNavPath,
} from "@agent-witch/live-shell/presentation";

import { AGENT_WITCH_DEFAULT_ORIGIN } from "@/lib/agentWitch/constants";

export const renderAwlStorybookDocument = (input: {
  readonly title: string;
  readonly activePath: AgentWitchLocalAppNavPath;
  readonly body: string;
  readonly prependBody?: string;
}): string =>
  buildAgentWitchLocalAppShell({
    title: input.title,
    activePath: input.activePath,
    body: input.body,
    cloudAppOrigin: AGENT_WITCH_DEFAULT_ORIGIN,
    installBundleVersionLabel: "storybook",
    prependBody: input.prependBody,
  });
