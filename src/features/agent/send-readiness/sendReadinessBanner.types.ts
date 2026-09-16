import type { MacPresenceTier } from "@/features/agent-witch/online-wake";

export type SendReadinessReasonCode =
  | "update_needed"
  | "unreachable_dns"
  | "offline"
  | "recent"
  | "live_other_instance_connecting"
  | "live_other_instance_failed"
  | "not_dispatch_ready"
  | "empty_prompt";

export type SendReadinessSeverity = "danger" | "warning" | "info";

export type SendReadinessCtaAction =
  "retry" | "setup" | "update" | "reconnect" | "focus_prompt";

export interface SendReadinessBannerCta {
  readonly label: string;
  readonly action: SendReadinessCtaAction;
  readonly href?: string;
}

export interface SendReadinessBannerModel {
  readonly reasonCode: SendReadinessReasonCode;
  readonly title: string;
  readonly body: string;
  readonly severity: SendReadinessSeverity;
  readonly blocksSend: boolean;
  readonly primaryCta: SendReadinessBannerCta | null;
  readonly secondaryCta: SendReadinessBannerCta | null;
}

export type SendReadinessRelayState = "idle" | "connecting" | "failed";

export interface ResolveSendReadinessBannerDevice {
  readonly id: string;
  readonly isConnected: boolean;
  readonly isOnline: boolean;
  readonly presenceTier?: MacPresenceTier;
  readonly isDispatchReady?: boolean;
  readonly installBundleVersion?: string | null;
}

export interface ResolveSendReadinessBannerInput {
  readonly isTeamDispatch: boolean;
  readonly browserConnectionReady: boolean;
  readonly selectedDeviceId: string;
  readonly devices: readonly ResolveSendReadinessBannerDevice[];
  readonly serverInstallBundleVersion: string | null;
  readonly dnsUnreachable?: boolean;
  readonly relayState?: SendReadinessRelayState;
  readonly formPromptEmpty?: boolean;
  readonly isWorkflowTask?: boolean;
  readonly workflowValidationErrors?: readonly string[];
  readonly isLibraryPlaybook?: boolean;
}
