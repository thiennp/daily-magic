export const scrollAgentLiveTerminalIntoView = (
  element: HTMLElement | null,
): void => {
  if (element === null) {
    return;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const focusAgentLiveTerminalSection = (
  element: HTMLElement | null,
): void => {
  scrollAgentLiveTerminalIntoView(element);
  element?.focus({ preventScroll: true });
};
