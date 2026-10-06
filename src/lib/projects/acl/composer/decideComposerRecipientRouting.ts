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

import type {
  DecideComposerRecipientRoutingInput,
  DecideComposerRecipientRoutingResult,
} from "@/lib/projects/acl/composer/decideComposerRecipientRouting.types";

export type {
  ComposerRecipientAssistant,
  ComposerRecipientStickySnapshot,
  DecideComposerRecipientRoutingInput,
  DecideComposerRecipientRoutingResult,
} from "@/lib/projects/acl/composer/decideComposerRecipientRouting.types";

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
