import type { AwcProjectActivityAction } from "@/features/projects/access/awcProjectActivityActions.constant";

/** Safe detail keys only — never reason/body/token/paths. */
export type AwcProjectActivitySafeDetail = Readonly<
  Record<string, string | boolean | null>
>;

/** UI DTO aligned with API ProjectActivityEvent. */
export default interface AwcProjectActivityEvent {
  readonly id: string;
  readonly projectId: string;
  readonly action: AwcProjectActivityAction;
  readonly actorUserId: string;
  readonly targetUserId: string | null;
  readonly at: string;
  readonly detail: AwcProjectActivitySafeDetail;
}

export type AwcProjectActivityFirstConnectMeta = {
  readonly role: string;
  readonly scopes: readonly string[];
  readonly note: string;
};

export type FetchProjectActivityResult =
  | {
      readonly ok: true;
      readonly events: readonly AwcProjectActivityEvent[];
      readonly nextCursor: string | null;
      readonly firstConnect: AwcProjectActivityFirstConnectMeta | null;
    }
  | {
      readonly ok: false;
      /** API missing on this deploy, or project not visible. */
      readonly unavailable: boolean;
      readonly errorMessage: string;
    };
