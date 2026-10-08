import { COMPANIES_RULES_HUB_COPY as C } from "@/features/admin/companiesRulesHubCopy.constant";
import {
  AgentRunStatus,
  type AgentRunStatusValue,
} from "@/lib/dispatch/AgentRunStatus.constant";

interface CompanyRunStatus {
  readonly label: string;
  readonly className: string;
}

const NEUTRAL = "bg-awc-fill text-awc-fg-muted";

const STATUS: Record<AgentRunStatusValue, CompanyRunStatus> = {
  [AgentRunStatus.PENDING_APPROVAL]: {
    label: C.runsStatusWaiting,
    className: "bg-awc-warn-soft text-awc-warn",
  },
  [AgentRunStatus.RUNNING]: {
    label: C.runsStatusRunning,
    className: "bg-awc-info-soft text-awc-info",
  },
  [AgentRunStatus.COMPLETED]: {
    label: C.runsStatusDone,
    className: "bg-awc-ok-soft text-awc-ok",
  },
  [AgentRunStatus.FAILED]: {
    label: C.runsStatusFailed,
    className: "bg-awc-bad-soft text-awc-bad",
  },
  [AgentRunStatus.DENIED]: { label: C.runsStatusDeclined, className: NEUTRAL },
  [AgentRunStatus.EXPIRED]: { label: C.runsStatusExpired, className: NEUTRAL },
};

export default function formatCompanyRunStatus(
  status: AgentRunStatusValue,
): CompanyRunStatus {
  return STATUS[status];
}
