import type {
  AwcMessengerMessageState,
  AwcMessengerStateChip,
  AwcMessengerTimelineEntry,
} from "@/features/projects/messenger/types/awcProjectMessenger.type";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** OW9 F1/F2 parity fixtures: one table run through server + client rules. */
export const chip = (
  state: AwcMessengerMessageState,
  name: string,
): AwcMessengerStateChip => ({
  membershipId: `m-${name}`,
  displayName: name,
  state,
  reason: null,
});

export const entry = (
  over: Partial<AwcMessengerTimelineEntry>,
): AwcMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T10:00:00.000Z",
  author: { kind: "owner", membershipId: null, displayName: "Owner" },
  kind: "task.assign",
  text: "t",
  needsReply: true,
  inReplyTo: null,
  states: [],
  ...over,
});

/** Same row as the server builds it (session.agentRunId is required there). */
export const serverEntry = (
  over: Partial<ProjectMessengerTimelineEntry>,
): ProjectMessengerTimelineEntry => ({
  ...entry({}),
  session: undefined,
  ...over,
});

export const DELIVERY_TABLE: readonly (readonly AwcMessengerStateChip[])[] = [
  [],
  [chip("working", "Kai")],
  [chip("done", "Kai"), chip("blocked", "Lead")],
  [chip("done", "Kai"), chip("done", "Lead")],
  [chip("got_it", "Kai"), chip("no_answer", "Lead"), chip("done", "Bo")],
  [chip("received", "Kai"), chip("checks_on_demand", "Lead")],
];
export const RUN_TABLE = [
  "running",
  "pending_approval",
  " PENDING_APPROVAL ",
  "",
  "completed",
];
/** [reply kind, pill label the client shows from the server codes]. */
export const REPLY_TABLE: readonly (readonly [string, string | null])[] = [
  ["task.done", "Done"],
  ["task.blocked", "Blocked"],
  ["task.received", "Queued"],
  ["task.processing", "Running"],
  ["task.status", "Running"],
  ["chat.note", null],
];
