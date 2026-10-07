/** Stick the timeline viewport to the newest message (composer neighbor). */
export const scrollMessengerTimelineToBottom = (
  element: HTMLElement,
): void => {
  element.scrollTop = element.scrollHeight;
};
