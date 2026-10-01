export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
  readonly emphasized?: boolean;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Mac Tasks and Playbooks",
    body: "Connect Macs you control, run Tasks, and turn winning prompts into reusable Playbooks—most teams complete a first Run the same day.",
    preview: "dispatch",
    emphasized: true,
  },
  {
    title: "Project Access you control",
    body: "Approve, Deny, or Revoke who may join a project. Folder refs stay registry-only—no shared tokens, no cloud content bus.",
    preview: "approve",
    emphasized: true,
  },
  {
    title: "Prompt Optimizer with honest scores",
    body: "Evaluate scores, pass only on passed outcomes, and reuse winners as Playbooks. Timeout, interrupt, and no_reply fail cleanly—not silent success.",
    preview: "report",
  },
] as const;
