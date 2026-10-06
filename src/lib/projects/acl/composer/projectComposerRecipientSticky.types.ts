import type { ProjectComposerRecipientStickyMode } from "@/lib/projects/acl/composer/projectComposerRecipientSticky.constants";

export type ProjectComposerRecipientStickyRecord = {
  readonly mode: ProjectComposerRecipientStickyMode;
  /** Set iff mode === "membership". */
  readonly membershipId: string | null;
  readonly updatedAt: string;
};

export type ProjectComposerRecipientStickyGetResult =
  | {
      readonly ok: true;
      readonly sticky: ProjectComposerRecipientStickyRecord | null;
      /** True when GET auto-cleared an inactive membership sticky. */
      readonly cleared: boolean;
      readonly clearedReason: "membership_inactive" | "single_assistant" | null;
      /**
       * When the project has exactly one assistant, UI must hide ALL routing
       * chrome (popup, chip, checkbox, @ picker) and send straight to that bot.
       */
      readonly singleAssistant: {
        readonly membershipId: string;
        readonly displayName: string | null;
      } | null;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" | "viewer_read_only" };

export type ProjectComposerRecipientStickyPutResult =
  | {
      readonly ok: true;
      readonly sticky: ProjectComposerRecipientStickyRecord;
    }
  | {
      readonly ok: false;
      readonly code:
        | "not_found"
        | "forbidden"
        | "viewer_read_only"
        | "invalid_body"
        | "membership_inactive"
        | "single_assistant";
    };

export type ProjectComposerRecipientStickyDeleteResult =
  | { readonly ok: true; readonly cleared: boolean }
  | {
      readonly ok: false;
      readonly code: "not_found" | "forbidden" | "viewer_read_only";
    };
