/**
 * Owner "awaiting wake link" UI after a bot joins (Product EN, 2026-10-06).
 * Visible UI says "assistant" and "wake link" only. `{name}` = project nickname.
 */
export const AWC_GROK_WAKE_AWAITING_COPY = {
  pill: "Waiting for wake link",
  helper:
    "{name} joined. Add its Grok wake link so it can start work when the project needs it.",
  bannerTitle: "{name} is waiting for a wake link",
  bannerBody: "Without it, the project can't wake {name} when there's work.",
  cta: "Add wake link",
  path: "Access › People › Members › {name} › Grok wake link",
  formTitle: "Grok wake link",
  formHelp: "Paste the wake link and key from {name}'s routine in Grok Bot.",
  save: "Save wake link",
  saving: "Saving wake link…",
  toastSaved:
    "Wake link saved. {name} will now wake up when the project needs it.",
  error:
    "That link didn't work. Copy it again from Grok Bot and paste it here.",
  donePill: "Wake link set",
  rowAction: "Change wake link",
  /** `{name}` fallback when the bot has no project nickname yet. */
  nameFallback: "this assistant",
} as const;

/** Fill `{name}`; capitalises a sentence-initial fallback ("This assistant …"). */
export const formatAwcGrokWakeCopy = (
  template: string,
  name: string | null | undefined,
): string => {
  const trimmed = name?.trim() ?? "";
  const filled = template.replaceAll(
    "{name}",
    trimmed.length > 0 ? trimmed : AWC_GROK_WAKE_AWAITING_COPY.nameFallback,
  );
  return filled.charAt(0).toUpperCase() + filled.slice(1);
};
