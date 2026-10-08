/**
 * Pure FSA types for one-window composer recipient routing (server + shared).
 */

export type ComposerRecipientStickySnapshot = {
  readonly mode: "all" | "membership";
  readonly membershipId: string | null;
};

export type ComposerRecipientAssistant = {
  readonly membershipId: string;
};

export type DecideComposerRecipientRoutingInput = {
  /** Resolved @mention membership ids for this send (empty = no @). */
  readonly mentionMembershipIds: readonly string[];
  /** Sticky chip checked + server/IDB sticky present. */
  readonly stickyChecked: boolean;
  readonly sticky: ComposerRecipientStickySnapshot | null;
  /** Active bot + computer assignees in the project. */
  readonly assistants: readonly ComposerRecipientAssistant[];
  /** Chip toggled off for this interaction (outside popup). */
  readonly chipUncheck?: boolean;
};

export type DecideComposerRecipientRoutingResult =
  | {
      readonly kind: "force_single_assistant";
      readonly membershipId: string;
      readonly showPopup: false;
      /** Hide popup, checkbox, chip, and @ picker. */
      readonly hideAllRoutingUi: true;
      readonly stickyUntouched: true;
    }
  | {
      readonly kind: "use_mentions";
      readonly membershipIds: readonly string[];
      readonly showPopup: false;
      readonly hideAllRoutingUi: false;
      readonly stickyUntouched: true;
    }
  | {
      readonly kind: "use_sticky_membership";
      readonly membershipId: string;
      readonly showPopup: false;
      readonly hideAllRoutingUi: false;
      readonly stickyUntouched: true;
    }
  | {
      readonly kind: "require_popup";
      readonly showPopup: true;
      readonly hideAllRoutingUi: false;
      readonly stickyUntouched: true;
    }
  | {
      readonly kind: "clear_sticky";
      readonly showPopup: true;
      readonly hideAllRoutingUi: false;
      /** Caller must DELETE server + IDB sticky. */
      readonly stickyUntouched: false;
    };
