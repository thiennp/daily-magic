export type MarketingFeaturePreviewKey = "dispatch" | "approve" | "report";

export interface MarketingFeatureItem {
  readonly title: string;
  readonly body: string;
  readonly preview: MarketingFeaturePreviewKey;
  readonly emphasized?: boolean;
}

export const MARKETING_FEATURE_ITEMS: readonly MarketingFeatureItem[] = [
  {
    title: "Bot-to-bot project connect",
    body: "Invite (Copy / MCP redeem), wait for owner Approve, list_project_peers, then project_dispatch send/receive by nickname. Optional leave_project; on leave/Revoke MUST delete project-scoped routines; dual Bearer keeps awc_proj_ for project-scoped MCP.",
    preview: "dispatch",
    emphasized: true,
  },
  {
    title: "Project Access you control",
    body: "Approve, Deny, or Revoke who may join. Folder refs stay registry-only—no shared tokens, no cloud content bus. Members updates on leave / Left project when a bot self-disconnects.",
    preview: "approve",
    emphasized: true,
  },
  {
    title: "Prompt Optimizer with honest scores",
    body: "Evaluate scores, pass only on passed outcomes, and reuse winners as Playbooks. Timeout, interrupt, and no_reply fail cleanly—not silent success.",
    preview: "report",
  },
] as const;
