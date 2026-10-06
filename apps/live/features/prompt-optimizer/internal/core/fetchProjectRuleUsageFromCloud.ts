import { parseRuleUsageResponse } from "./parseRuleUsageResponse";
import type { RuleUsageFetchResult } from "./ruleCompare.type";

const USAGE_TIMEOUT_MS = 10_000;

export const buildProjectRuleUsageUrl = (
  appOrigin: string,
  projectId: string,
  days: number = 30,
): string => {
  const url = new URL(
    `${appOrigin.replace(/\/$/, "")}/api/agent-witch/projects/${encodeURIComponent(projectId)}/rules/usage`,
  );
  url.searchParams.set("days", String(days));
  return url.toString();
};

/** GET …/rules/usage with this computer's pairing token. */
export const fetchProjectRuleUsageFromCloud = async (input: {
  readonly appOrigin: string;
  readonly pairingToken: string;
  readonly projectId: string;
  readonly days?: number;
  readonly pairingHeaderName: string;
  readonly fetchImpl?: typeof fetch;
}): Promise<RuleUsageFetchResult> => {
  const token = input.pairingToken.trim();
  if (token.length === 0) {
    return { ok: false, reason: "not_connected" };
  }
  const fetchImpl = input.fetchImpl ?? fetch;
  try {
    const response = await fetchImpl(
      buildProjectRuleUsageUrl(
        input.appOrigin,
        input.projectId,
        input.days ?? 30,
      ),
      {
        method: "GET",
        headers: { [input.pairingHeaderName]: token },
        signal: AbortSignal.timeout(USAGE_TIMEOUT_MS),
      },
    );
    if (response.status === 401) return { ok: false, reason: "unauthorized" };
    if (response.status === 403) return { ok: false, reason: "forbidden" };
    if (!response.ok) return { ok: false, reason: "unavailable" };
    const parsed = parseRuleUsageResponse(await response.json());
    return parsed === null
      ? { ok: false, reason: "unavailable" }
      : { ok: true, data: parsed };
  } catch {
    return { ok: false, reason: "unavailable" };
  }
};
