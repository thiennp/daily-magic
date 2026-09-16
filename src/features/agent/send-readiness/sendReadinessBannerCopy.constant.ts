import type {
  SendReadinessBannerModel,
  SendReadinessReasonCode,
} from "@/features/agent/send-readiness/sendReadinessBanner.types";

const SETUP_HREF = "/#your-setup";

export const SEND_READINESS_BANNER_COPY: Record<
  SendReadinessReasonCode,
  Omit<SendReadinessBannerModel, "reasonCode">
> = {
  update_needed: {
    title: "Update needed",
    body: "Your Mac agent needs an update before new jobs can run.",
    severity: "warning",
    blocksSend: true,
    primaryCta: { label: "Update agent", action: "update", href: SETUP_HREF },
    secondaryCta: null,
  },
  unreachable_dns: {
    title: "Mac unreachable",
    body: "We couldn’t resolve your Mac (DNS). Check network or reconnect the agent.",
    severity: "warning",
    blocksSend: true,
    primaryCta: {
      label: "Reconnect Mac",
      action: "reconnect",
      href: SETUP_HREF,
    },
    secondaryCta: { label: "Setup help", action: "setup", href: SETUP_HREF },
  },
  offline: {
    title: "Mac offline",
    body: "Agent Witch can’t reach your Mac right now.",
    severity: "danger",
    blocksSend: true,
    primaryCta: { label: "Retry", action: "retry" },
    secondaryCta: { label: "Setup help", action: "setup", href: SETUP_HREF },
  },
  recent: {
    title: "Reconnecting",
    body: "Mac was just online — reconnecting…",
    severity: "info",
    blocksSend: true,
    primaryCta: { label: "Retry", action: "retry" },
    secondaryCta: null,
  },
  live_other_instance_connecting: {
    title: "Connecting",
    body: "Connecting to your Mac…",
    severity: "info",
    blocksSend: true,
    primaryCta: null,
    secondaryCta: null,
  },
  live_other_instance_failed: {
    title: "New task isn’t ready",
    body: "Couldn’t finish connecting to your Mac. Try again.",
    severity: "warning",
    blocksSend: true,
    primaryCta: { label: "Retry", action: "retry" },
    secondaryCta: null,
  },
  not_dispatch_ready: {
    title: "New task isn’t ready",
    body: "Finish setup so your Mac can take this job.",
    severity: "warning",
    blocksSend: true,
    primaryCta: { label: "Fix setup", action: "setup", href: SETUP_HREF },
    secondaryCta: null,
  },
  empty_prompt: {
    title: "Add a task",
    body: "Write what you want done before sending.",
    severity: "info",
    blocksSend: true,
    primaryCta: { label: "Focus field", action: "focus_prompt" },
    secondaryCta: null,
  },
};

export const buildSendReadinessBannerFromReasonCode = (
  reasonCode: SendReadinessReasonCode,
): SendReadinessBannerModel => ({
  reasonCode,
  ...SEND_READINESS_BANNER_COPY[reasonCode],
});
