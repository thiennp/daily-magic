import type { ProjectComputerHistoryReport } from "@/lib/projects/acl/messaging/projectComputerHistory.constants";
import type { ProjectComputerHistoryUnsavedOverdue } from "@/lib/projects/acl/messaging/readProjectComputerHistoryUnsavedOverdue";
import type { ProjectComputerHistoryState } from "@/lib/projects/acl/messaging/projectComputerHistoryStateMachine";
import type { ProjectMessageLogEntry } from "@/lib/projects/acl/messaging/projectMessageLog.types";

type OwnerActor = { readonly projectId: string; readonly actorUserId: string };

/** Authenticated AWL device (requireAgentWitchDeviceAuth). */
type ComputerActor = {
  readonly projectId: string;
  readonly deviceId: string;
  readonly deviceUserId: string;
};

export type ProjectComputerHistoryCommand =
  | ({ readonly kind: "owner_read" } & OwnerActor)
  | ({ readonly kind: "owner_toggle"; readonly enabled: boolean } & OwnerActor)
  | ({ readonly kind: "computer_read" } & ComputerActor)
  | ({
      readonly kind: "computer_report";
      readonly report: ProjectComputerHistoryReport;
    } & ComputerActor)
  | ({
      readonly kind: "computer_ack";
      readonly messageId: string;
    } & ComputerActor);

export type ProjectComputerHistoryErrorCode =
  | "not_found"
  | "forbidden"
  | "no_project_computer"
  | "illegal_transition"
  | "backlog_pending";

export type ProjectComputerHistoryCommandResult =
  | {
      readonly ok: true;
      readonly state: ProjectComputerHistoryState;
      readonly backlog?: readonly ProjectMessageLogEntry[];
      readonly unsavedOverdue?: ProjectComputerHistoryUnsavedOverdue | null;
      readonly ack?: {
        readonly messageId: string;
        readonly alreadyAcked: boolean;
        readonly deleted: boolean;
      };
    }
  | {
      readonly ok: false;
      readonly code: ProjectComputerHistoryErrorCode;
      readonly state?: ProjectComputerHistoryState;
    };
