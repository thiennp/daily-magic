/** Product EN — shared "Add assistant" invite control (one invite for every type). */
export const AWC_PROJECT_INVITE_ADD_ASSISTANT_COPY = {
  button: "Add assistant",
  /** DF-036 D4: the picker only changes the setup steps written into the invite. */
  typeLabel: "Supported assistants",
  typeChange: "Change",
  typeAny: "Any supported assistant",
  typeAnyHint: "General steps that fit any assistant",
  dialogTitle: "Supported assistants",
  dialogSearch: "Search assistants",
  dialogNoMatch: "No supported assistant matches your search.",
  dialogClose: "Close",
  typeHelp:
    "Only changes the setup steps in the invite. Any assistant can use it.",
  isolateLabel: "Block it from other people's assistants",
  isolateHelp:
    "It can still message the owner, people and assistants invited by you.",
  createdForAny: "Any assistant",
  createdForType: (label: string) => `For ${label}`,
} as const;
