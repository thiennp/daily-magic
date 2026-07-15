import { demoTimestamp } from "./demoTimestamp.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";

export const demoOnboardingSteps = [
  {
    id: "connect-mac",
    label: "Connect your Mac",
    done: true,
    href: "/#your-setup",
  },
  {
    id: "create-workflow",
    label: "Create your first workflow or agent",
    done: true,
    href: "/library",
  },
  {
    id: "publish-assistant",
    label: "Publish an assistant",
    done: true,
    href: "/",
  },
  {
    id: "send-task",
    label: "Send your first task",
    done: false,
    href: buildAgentComposerHref(),
  },
] as const;

export const demoConnectedClients = [
  {
    id: "client-demo-alex-macbook",
    role: "agent",
    connectedAt: demoTimestamp,
  },
  {
    id: "client-demo-jordan-imac",
    role: "agent",
    connectedAt: demoTimestamp,
  },
] as const;
