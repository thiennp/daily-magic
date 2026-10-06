import { parseRuleChangeResponse } from "./parseRuleChangeResponse";
import type { RuleChangeFetchResult } from "./ruleCompare.type";

const CHANGE_TIMEOUT_MS = 15_000;

export const buildProjectRuleChangeUrl = (
  appOrigin: string,
  projectId: string,
  ruleId: string,
  action: "drop" | "restore",
): string =>
  `${appOrigin.replace(/\/$/, "")}/api/agent-witch/projects/${encodeURIComponent(projectId)}/rules/${encodeURIComponent(ruleId)}/${action}`;

/** POST …/rules/{id}/drop|restore with this computer's pairing token. */
export const postProjectRuleActiveChangeFromCloud = async (input: {
  readonly appOrigin: string;
  readonly pairingToken: string;
  readonly projectId: string;
  readonly ruleId: string;
  readonly action: "drop" | "restore";
  readonly pairingHeaderName: string;
  readonly fetchImpl?: typeof fetch;
}): Promise<RuleChangeFetchResult> => {
  const token = input.pairingToken.trim();
  if (token.length === 0) {
    return { ok: false, reason: "unauthorized" };
  }
  const fetchImpl = input.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl(
      buildProjectRuleChangeUrl(
        input.appOrigin,
        input.projectId,
        input.ruleId,
        input.action,
      ),
      {
        method: "POST",
        headers: { [input.pairingHeaderName]: token },
        signal: AbortSignal.timeout(CHANGE_TIMEOUT_MS),
      },
    );
    if (response.status === 401) return { ok: false, reason: "unauthorized" };
    if (response.status === 403) return { ok: false, reason: "forbidden" };
    if (response.status === 404) return { ok: false, reason: "not_found" };
    if (response.status === 409) return { ok: false, reason: "limit_exceeded" };
    if (!response.ok) return { ok: false, reason: "unavailable" };
    const parsed = parseRuleChangeResponse(await response.json());
    return parsed === null
      ? { ok: false, reason: "unavailable" }
      : { ok: true, data: parsed };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
};
