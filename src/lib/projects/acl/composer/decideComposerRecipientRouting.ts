/**
 * Pure FSA for one-window composer recipient routing (server + shared).
 *
 * Locked rules:
 * 1) @name → that agent (that send); sticky unchanged
 * 2) No @ + sticky checked (bot|all) → use sticky, no popup
 * 3) No @ + unchecked / no sticky → ALWAYS popup; checking locks sticky
 * 4) Chip toggle lives outside the popup (chipUncheck → clear sticky)
 * 5) Exactly one assistant → hide ALL routing UI; messages go straight to that bot
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
      readonly kind: "use_sticky_all";
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

/**
 * Decide composer recipient for one send / chip interaction.
 * Pure: no I/O. Human UI + send adapter call this; server tests lock the contract.
 */
export const decideComposerRecipientRouting = (
  input: DecideComposerRecipientRoutingInput,
): DecideComposerRecipientRoutingResult => {
  // One assistant: hide ALL routing chrome; always that bot.
  if (input.assistants.length === 1) {
    return {
      kind: "force_single_assistant",
      membershipId: input.assistants[0].membershipId,
      showPopup: false,
      hideAllRoutingUi: true,
      stickyUntouched: true,
    };
  }

  // Chip uncheck (outside popup) clears sticky and requires a fresh pick.
  if (input.chipUncheck === true) {
    return {
      kind: "clear_sticky",
      showPopup: true,
      hideAllRoutingUi: false,
      stickyUntouched: false,
    };
  }

  // Explicit @ wins this send; sticky unchanged.
  if (input.mentionMembershipIds.length > 0) {
    return {
      kind: "use_mentions",
      membershipIds: input.mentionMembershipIds,
      showPopup: false,
      hideAllRoutingUi: false,
      stickyUntouched: true,
    };
  }

  // No @: checked sticky → use it, no popup.
  if (input.stickyChecked && input.sticky !== null) {
    if (input.sticky.mode === "all") {
      return {
        kind: "use_sticky_all",
        showPopup: false,
        hideAllRoutingUi: false,
        stickyUntouched: true,
      };
    }
    if (
      input.sticky.mode === "membership" &&
      typeof input.sticky.membershipId === "string" &&
      input.sticky.membershipId.length > 0
    ) {
      return {
        kind: "use_sticky_membership",
        membershipId: input.sticky.membershipId,
        showPopup: false,
        hideAllRoutingUi: false,
        stickyUntouched: true,
      };
    }
  }

  // No @ + unchecked / missing sticky → always popup.
  return {
    kind: "require_popup",
    showPopup: true,
    hideAllRoutingUi: false,
    stickyUntouched: true,
  };
};
