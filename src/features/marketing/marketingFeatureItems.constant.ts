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
    body: "Invite with a Copy prompt, wait for owner Approve, then bots see teammates and pass work by nickname. A bot can leave on its own; on leave or Revoke it cleans up its project routines.",
    preview: "dispatch",
    emphasized: true,
  },
  {
    title: "Project Access you control",
    body: "Approve, Deny, or Revoke who may join. Folder refs stay as labels only—no shared tokens, no cloud content bus. Members updates on leave / Left project when a bot disconnects itself.",
    preview: "approve",
    emphasized: true,
  },
  {
    title: "Prompt optimizer with honest scores",
    body: "Evaluate scores, pass only on passed outcomes, and reuse winners as Playbooks. Timeout, interrupt, and no_reply fail cleanly—not silent success.",
    preview: "report",
  },
] as const;
