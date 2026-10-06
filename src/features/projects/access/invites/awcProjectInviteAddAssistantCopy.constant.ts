/** Product EN — shared "Add assistant" invite control (one invite for every type). */
export const AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY = {
  button: "Add assistant",
  typeLabel: "Assistant type (optional)",
  typeAny: "Any assistant",
  typeHelp:
    "One invite works for every assistant. The assistant finds its own type in the invite.",
  createdForAny: "Assistant invite — this Copy prompt works for any assistant.",
  createdForType: (label: string) =>
    `${label} invite — this Copy prompt is for ${label}.`,
} as const;
