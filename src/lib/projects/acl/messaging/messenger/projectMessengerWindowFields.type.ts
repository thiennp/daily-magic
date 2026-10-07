import type { ProjectMessageWindowKind } from "@/lib/projects/acl/messaging/messenger/projectMessageWindowKind.constant";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

/** OW9 live subject state (codes only; never stored, read at query time). */
export type ProjectMessengerSubjectState = {
  /** deliveries = PD chips; agent_run = agent_runs.status; reply_kind = bot task reply kind. */
  readonly source: "deliveries" | "agent_run" | "reply_kind";
  /** Lead delivery state (worst first), agent_runs.status, or reply_kind queued / running / done / blocked. */
  readonly status: string;
  /** deliveries: recipients done / total. reply_kind running: progress (of 100 = percent). */
  readonly done?: number;
  readonly of?: number;
  /** Human action wanted: blocked / no answer / run waiting for approval. */
  readonly needsYou: boolean;
  /** agent_runs row is pending_approval. */
  readonly awaitingApproval: boolean;
};

/** A timeline row that may already carry a window kind (e.g. a local AWL page row). */
export type ProjectMessengerTimelineEntryInput =
  ProjectMessengerTimelineEntry & {
    readonly windowKind?: ProjectMessageWindowKind;
  };

/** OW9 wire row: every messenger thread entry carries both fields. */
export type ProjectMessengerWindowTimelineEntry =
  ProjectMessengerTimelineEntry & {
    /** DESIGN §3.1 window kind, server-derived (withProjectMessengerWindowFields). */
    readonly windowKind: ProjectMessageWindowKind;
    /** Live subject state for task / task_update rows; null otherwise. */
    readonly subjectState: ProjectMessengerSubjectState | null;
    /** approval_* rows only: agent_runs.id for run-approvals approve / decline. */
    readonly approvalId?: string;
  };
