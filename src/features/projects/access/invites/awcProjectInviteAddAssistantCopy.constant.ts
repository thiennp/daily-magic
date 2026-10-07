/** Product EN — shared "Add assistant" invite control (one invite for every type). */
export const AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY = {
  button: "Add assistant",
  /** DF-036 D4: the picker only changes the setup steps written into the invite. */
  typeLabel: "Setup steps for",
  typeAny: "Another assistant (general steps)",
  typeHelp: "Only changes the setup steps in the invite. Any assistant can use it.",
  createdForAny: "Assistant invite — this Copy prompt works for any assistant.",
  createdForType: (label: string) =>
    `${label} invite — this Copy prompt is for ${label}.`,
} as const;
