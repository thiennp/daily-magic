/**
 * 77e29f7a: "Codex isn't signed in … or pick another coding tool" had no way to
 * do that. The floater button asks the composer to end the session and open
 * "Choose an AI on your computer".
 */
export const AGENT_WITCH_PICK_ANOTHER_WRITER_EVENT =
  "agent-witch:pick-another-writer";

const OFFERS_ANOTHER_WRITER = /pick another coding tool/i;

export const shouldOfferPickAnotherWriter = (summary: string | null): boolean =>
  summary !== null && OFFERS_ANOTHER_WRITER.test(summary);

export const requestPickAnotherWriter = (): void => {
  window.dispatchEvent(new CustomEvent(AGENT_WITCH_PICK_ANOTHER_WRITER_EVENT));
};
