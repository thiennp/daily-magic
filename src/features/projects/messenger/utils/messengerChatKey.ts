/** Chat key for the browser store. threadKey is "whole" or a bot membershipId today. */
export const messengerChatKey = (input: {
  readonly projectId: string;
  readonly threadKey: string;
}): string => `${input.projectId}:${input.threadKey}`;

/** Kept-recipient key: per project chat per member. */
export const messengerKeptRecipientKey = (input: {
  readonly projectId: string;
  readonly memberKey: string;
}): string => `${input.projectId}:${input.memberKey}`;
