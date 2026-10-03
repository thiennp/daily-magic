/** Reserved from-name for owner-console sends (same label the message log already uses). */
export const AWC_PROJECT_OWNER_MESSAGE_DISPLAY_NAME = "Owner";

/** In flight, before the dispatch POST is accepted. */
export const formatProjectMessageSending = (name: string): string =>
  `${name} is sending a message`;

/**
 * Fast signal once dispatch is accepted: a new message arrived.
 * Not received, and not started processing.
 */
export const formatProjectMessageNewFrom = (name: string): string =>
  `New message from ${name}.`;

/**
 * Peer has the message and has started work.
 * Show only when eng exposes a received/processing signal distinct from ack
 * and distinct from dispatch accept. Do not bind this to ackedAt or a successful POST.
 */
export const PROJECT_MESSAGE_RECEIVED_STARTED_PROCESSING =
  "Received. Started processing.";
