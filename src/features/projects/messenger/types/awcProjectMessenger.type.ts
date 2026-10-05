export type AwcMessengerBotStatus = "working" | "idle" | "silent";

export type AwcMessengerMessageState =
  | "received"
  | "got_it"
  | "working"
  | "done"
  | "blocked"
  | "waiting"
  | "no_answer";

export type AwcMessengerThreadSummary = {
  readonly lastMessageAt: string | null;
  readonly lastPreview: string | null;
  readonly unreadCount: number;
};

export type AwcMessengerBotThread = AwcMessengerThreadSummary & {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly status: AwcMessengerBotStatus;
};

export type AwcMessengerThreadList = {
  readonly wholeProject: AwcMessengerThreadSummary;
  readonly bots: readonly AwcMessengerBotThread[];
  readonly canSend: boolean;
};

export type AwcMessengerStateChip = {
  readonly membershipId: string;
  readonly displayName: string | null;
  readonly state: AwcMessengerMessageState;
  readonly reason: string | null;
};

export type AwcMessengerTimelineEntry = {
  readonly messageId: string;
  readonly createdAt: string;
  readonly author: {
    readonly kind: "owner" | "member" | "bot";
    readonly membershipId: string | null;
    readonly displayName: string | null;
  };
  readonly kind: string;
  readonly text: string;
  readonly needsReply: boolean;
  readonly inReplyTo: string | null;
  readonly states: readonly AwcMessengerStateChip[];
};

export type AwcMessengerOpenThread = {
  readonly threadKey: string;
  readonly entries: readonly AwcMessengerTimelineEntry[];
  readonly canSend: boolean;
};
