export type RuleCompareUsageRow = {
  readonly ruleId: string;
  readonly title: string;
  readonly source: string;
  readonly active: boolean;
  readonly hitCount: number;
  readonly lastHitAt: string | null;
};

export type RuleCompareOverlapReason = "duplicate" | "overlap";

export type RuleCompareOverlap = {
  readonly ruleIdA: string;
  readonly ruleIdB: string;
  readonly reason: RuleCompareOverlapReason;
  readonly score: number;
};

export type RuleUsageResponse = {
  readonly ok: true;
  readonly projectId: string;
  readonly windowDays: null;
  readonly rules: readonly RuleCompareUsageRow[];
  readonly overlaps: readonly RuleCompareOverlap[];
};

export type RuleUsageFetchResult =
  | { readonly ok: true; readonly data: RuleUsageResponse }
  | {
      readonly ok: false;
      readonly reason:
        | "unauthorized"
        | "forbidden"
        | "unavailable"
        | "not_connected";
    };

export type RuleChangeResponse = {
  readonly ok: true;
  readonly projectId: string;
  readonly rule: RuleCompareUsageRow;
  readonly changed: boolean;
};

export type RuleChangeFetchResult =
  | { readonly ok: true; readonly data: RuleChangeResponse }
  | {
      readonly ok: false;
      readonly reason:
        | "unauthorized"
        | "forbidden"
        | "not_found"
        | "limit_exceeded"
        | "unavailable";
    };

export type RuleUsageFlag =
  | { readonly kind: "never_used" }
  | { readonly kind: "stale"; readonly days: number }
  | { readonly kind: "same_as"; readonly ruleTitle: string }
  | { readonly kind: "overlaps"; readonly ruleTitle: string };

export type RuleCompareTokenStats = {
  readonly promptTokens: number;
  readonly rulesTokens: number;
  readonly addedCostUsd: number;
};

export type RuleCompareMatchedRule = {
  readonly id: string;
  readonly title: string;
  readonly avoidance: string;
};
